import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import ApiQueries, {PersonRequest, FamilyDto, PersonDto} from "../../../../ApiQueries";
import {useQuery} from "@tanstack/react-query";
import {convertNullableLocalDate, formatFamilyName, formatNullableNodeDateProperty} from "../../nodeUtils";
import {reloadComponents} from "../../../../utlis";

const personApi = new ApiQueries()

export interface UpdatePersonModalProps {
    setShow: (current: boolean) => void,
    nodeId: string,
    current: PersonDto
}

export function UpdatePersonModal(props: UpdatePersonModalProps) {
    const handleClose = () => props.setShow(false);

    const [firstName, setFirstName] = useState<string>(props.current.firstName)
    const [middleName, setMiddleName] = useState<string | null>(props.current.middleName ?? null)
    const [lastName, setLastName] = useState<string>(props.current.lastName)
    const [maidenName, setMaidenName] = useState<string | null>(props.current.maidenName ?? null)
    const [gender, setGender] = useState(props.current.gender)
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(convertNullableLocalDate(props.current.dateOfBirth) ?? null)
    const [dateOfDeath, setDateOfDeath] = useState<string | null>(convertNullableLocalDate(props.current.dateOfDeath) ?? null)
    const [description, setDescription] = useState<string | null>(props.current.description ?? null)

    const updatePersonRequest: PersonRequest = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        maidenName: maidenName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        dateOfDeath: dateOfDeath,
        description: description
    }

    const callCreateParent = useQuery({...personApi.updatePerson(props.nodeId, updatePersonRequest), enabled: false}).refetch

    const handleConfirm = () => {
        console.log("Updating " + props.nodeId + ": " + JSON.stringify(updatePersonRequest))
        const result = callCreateParent()
        result.then((result) => {
            if (result == null) {
                console.log("error caught")
            } else {
                handleClose()
                reloadComponents()
            }
        })
    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Zaktualizuj dane</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Płeć*</Form.Label>
                        <Form.Select onChange={(e) => setGender(e.target.value)} defaultValue={gender}>
                            <option value="female">Kobieta</option>
                            <option value="male">Mężczyzna</option>
                        </Form.Select>

                        <Form.Label>Imię*</Form.Label>
                        <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} defaultValue={firstName}/>
                        <Form.Label>Drugie imię</Form.Label>
                        <Form.Control type="text" onChange={(e) => setMiddleName(e.target.value)} defaultValue={middleName ?? undefined}/>

                        <Form.Label>Nazwisko*</Form.Label>
                        <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} defaultValue={lastName}/>

                        <Form.Label>Nazwisko rodowe</Form.Label>
                        <Form.Control type="text" onChange={(e) => setMaidenName(e.target.value)} defaultValue={maidenName ?? undefined}/>

                        <Form.Label>Data urodzenia</Form.Label>
                        <Form.Control type="date" onChange={(e) => setDateOfBirth(e.target.value)} defaultValue={dateOfBirth ?? undefined}></Form.Control>

                        <Form.Label>Data śmierci</Form.Label>
                        <Form.Control type="date" onChange={(e) => setDateOfDeath(e.target.value)} defaultValue={dateOfDeath ?? undefined}></Form.Control>

                        <Form.Label>Opis</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} defaultValue={description ?? undefined}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    Pola wymagane oznaczone gwiazdką (*).
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="primary" disabled={!(firstName && gender)} onClick={(e) => {
                        handleConfirm()
                    }}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}