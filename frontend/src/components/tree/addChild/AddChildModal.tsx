import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import PersonApi, {AddChildRequest} from "../../../PersonApi";
import {useQuery} from "@tanstack/react-query";

const personApi = new PersonApi()

export interface AddChildModal {
    setShow: (current: boolean) => void,
    nodeId: string
}

export function AddChildModal(props: AddChildModal) {
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

    const request = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        maidenName: maidenName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        dateOfDeath: dateOfDeath,
        description: description
    } as AddChildRequest

    const {refetch} = useQuery({...personApi.addChild(props.nodeId, request), enabled: false})

    const handleConfirm = () => {
        console.log(JSON.stringify(request))

        //handleClose()

    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj potomka</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Płeć</Form.Label>
                        <Form.Select onChange={(e) => setGender(e.target.value)}>
                            <option value="female">Kobieta</option>
                            <option value="male">Mężczyzna</option>
                        </Form.Select>

                        <Form.Label>Imię</Form.Label>
                        <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}/>

                        <Form.Label>Drugie imię</Form.Label>
                        <Form.Control type="text" onChange={(e) => setMiddleName(e.target.value)}/>

                        <Form.Label>Nazwisko</Form.Label>
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