import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import ApiQueries, {PersonRequest, PersonDto} from "../../../../ApiQueries";
import {useQuery} from "@tanstack/react-query";

const personApi = new ApiQueries()

export interface CreateSpouseModalProps {
    setShow: (current: boolean) => void,
    nodeId: string,
    personDetails: PersonDto
}

export function CreateSpouseModal(props: CreateSpouseModalProps) {

    const DEFAULT_GENDER: string = props.personDetails.gender === "female" ? "male" : "female"

    const [firstName, setFirstName] = useState<string | null>(null)
    const [middleName, setMiddleName] = useState<string | null>(null)
    const [lastName, setLastName] = useState<string | null>(null)
    const [maidenName, setMaidenName] = useState<string | null>(null)
    const [gender, setGender] = useState(DEFAULT_GENDER)
    const [dateOfBirth, setDateOfBirth] = useState<string | null>(null)
    const [dateOfDeath, setDateOfDeath] = useState<string | null>(null)
    const [description, setDescription] = useState<string | null>(null)

    const createSpouseRequest: PersonRequest = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        maidenName: maidenName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        dateOfDeath: dateOfDeath,
        description: description
    }

    const callCreateSpouse = useQuery({...personApi.createSpouse(props.nodeId, createSpouseRequest), enabled: false}).refetch

    const handleConfirm = () => {
        console.log("Adding spouse to " + props.nodeId + ": " + JSON.stringify(createSpouseRequest))
        const result = callCreateSpouse()
        handleClose()
    }
    const handleClose = () => props.setShow(false);

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Utwórz partnera</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                    }}>
                        Zapisz
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}