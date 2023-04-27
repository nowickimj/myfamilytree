import React, {ChangeEvent, useCallback, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form, FormCheck} from "react-bootstrap";
import ApiQueries, {AddChildRequest, PersonDto} from "../../../../ApiQueries";
import {useQuery} from "@tanstack/react-query";
import {formatPersonName} from "../../nodeUtils";

const personApi = new ApiQueries()

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
    const [gender, setGender] = useState<string | null>(null)
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null)
    const [dateOfDeath, setDateOfDeath] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)

    const [coParentSelected, setCoParentSelected] = useState(false)
    const [selectedCoParentId, setSelectedCoParentId] = useState<number | null>(null)
    const handleCoParentSelected = () => setCoParentSelected(!coParentSelected)

    const addChildRequest: AddChildRequest = {
        coParentId: selectedCoParentId,
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
    const getParentsResult = useQuery({...personApi.getParents(props.nodeId)}).data

    function getSelectableCoParents(): PersonDto[] {
        let result = getParentsResult ?? []
        return result.filter(parent => parent.id.toString() !== props.nodeId)
    }


    const handleConfirm = () => {
        console.log("Adding new child to " + props.nodeId + ": " + JSON.stringify(addChildRequest))
        const result = callCreateChild()
        result.then((result) => {
            if(result == null) {
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
                            id="coParentSelected"
                            label="Uwzględnij drugiego rodzica"
                            onClick={handleCoParentSelected}
                            checked={coParentSelected}
                            disabled={getSelectableCoParents.length == 0}
                        />

                        {coParentSelected && (
                            <Form.Select onChange={(e) => {
                                const selectedCoParentId = getSelectableCoParents().find((parent) => parent.id.toString() !== e.target.value)
                                setSelectedCoParentId(selectedCoParentId?.id || null)
                            }}>
                                {
                                    getSelectableCoParents().map((parent) => <option value={parent.id}>{formatPersonName(parent)}</option>)
                                }
                            </Form.Select>
                        )}

                        <Form.Label>Płeć*</Form.Label>
                        <Form.Select onChange={(e) => setGender(e.target.value)} defaultValue="female">
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
                    <Button variant="primary" disabled={!(firstName && lastName && gender)}  onClick={(e) => {
                        handleConfirm()
                    }}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}