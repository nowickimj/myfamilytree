import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import ApiQueries, {AddChildRequest, FamilyDto} from "../../../../ApiQueries";
import {useQuery} from "@tanstack/react-query";
import {formatFamilyName} from "../../nodeUtils";

const personApi = new ApiQueries()
const DEFAULT_GENDER = "female"

export interface CreateChildModal {
    setShow: (current: boolean) => void,
    nodeId: string
}

export function CreateChildModal(props: CreateChildModal) {
    const handleClose = () => props.setShow(false);

    function handleSubmit() {
        console.log("submit clicked!")
    }

    const [firstName, setFirstName] = useState<string | null>(null)
    const [middleName, setMiddleName] = useState<string | null>(null)
    const [lastName, setLastName] = useState<string | null>(null)
    const [maidenName, setMaidenName] = useState<string | null>(null)
    const [gender, setGender] = useState(DEFAULT_GENDER)
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null)
    const [dateOfDeath, setDateOfDeath] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)

    // add child to existing family
    const descendingFamilies: FamilyDto[] = useQuery({...personApi.getDescendingFamilies(props.nodeId)}).data ?? []
    const [addToExistingFamilySelected, setAddToExistingFamilySelected] = useState(descendingFamilies.length > 0)
    const DEFAULT_SELECTED_EXISTING_FAMILY: number = descendingFamilies[0]?.id ?? null
    const [selectedFamily, setSelectedFamily] = useState<number | null>(DEFAULT_SELECTED_EXISTING_FAMILY)

    const addChildRequest: AddChildRequest = {
        familyId: selectedFamily,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        maidenName: maidenName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        dateOfDeath: dateOfDeath,
        description: description
    }

    const callCreateChild = useQuery({...personApi.createChild(props.nodeId, addChildRequest), enabled: false}).refetch

    const handleConfirm = () => {
        console.log("Adding new child to " + props.nodeId + ": " + JSON.stringify(addChildRequest))
        const result = callCreateChild()
        result.then((result) => {
            if (result == null) {
                console.log("error caught")
            } else {
                handleClose()
            }
        })
    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Utwórz potomka</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Check
                            id="existingFamilySelected"
                            label="Dodaj do istniejącej rodziny"
                            onClick={(e) => {
                                let newValue = !addToExistingFamilySelected
                                setAddToExistingFamilySelected(newValue)
                                if (newValue) {
                                    setSelectedFamily(DEFAULT_SELECTED_EXISTING_FAMILY)
                                } else {
                                    setSelectedFamily(null)
                                    console.log("changing selected value to " + newValue)
                                }
                            }}
                            checked={addToExistingFamilySelected}
                            disabled={descendingFamilies.length === 0}
                        />

                        {addToExistingFamilySelected && (
                            <Form.Select onChange={(e) => {
                                const selectedFamily = descendingFamilies.find((family) => family.id.toString() !== e.target.value)
                                setSelectedFamily(selectedFamily?.id || null)
                            }}>
                                {
                                    descendingFamilies.map((family) => <option
                                        value={family.id}>{formatFamilyName(family)}</option>)
                                }
                            </Form.Select>
                        )}

                        <Form.Label>Płeć*</Form.Label>
                        <Form.Select onChange={(e) => setGender(e.target.value)} defaultValue={DEFAULT_GENDER}>
                            <option value="female">Kobieta</option>
                            <option value="male">Mężczyzna</option>
                        </Form.Select>

                        <Form.Label>Imię*</Form.Label>
                        <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}/>

                        <Form.Label>Drugie imię</Form.Label>
                        <Form.Control type="text" onChange={(e) => setMiddleName(e.target.value)}/>

                        <Form.Label>Nazwisko*</Form.Label>
                        <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}/>

                        <Form.Label>Nazwisko panieńskie</Form.Label>
                        <Form.Control type="text" onChange={(e) => setMaidenName(e.target.value)}/>

                        <Form.Label>Data urodzenia</Form.Label>
                        <Form.Control type="date" onChange={(e) => setDateOfBirth(e.target.value)}></Form.Control>

                        <Form.Label>Data śmierci</Form.Label>
                        <Form.Control type="date" onChange={(e) => setDateOfDeath(e.target.value)}></Form.Control>

                        <Form.Label>Opis</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    Pola wymagane oznaczone gwiazdką (*).
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="primary" disabled={!(firstName && lastName && gender)} onClick={(e) => {
                        handleConfirm()
                        //console.log(JSON.stringify(addChildRequest))
                    }}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}