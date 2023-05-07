import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {ChangeEvent, useState} from "react";
import Modal from "react-bootstrap/Modal"
import {baseApi, SignInRequest} from "../../ApiQueries"
import {getAuthToken, setAuth} from "../../auth";
import axios from "axios";
import {reloadComponents} from "../../utlis";

export interface LoginPageProps {
}

export function LoginModal(props: LoginPageProps) {

    const [fetchedToken, setFetchedToken] = useState<string | null>(null)
    const [show, setShow] = useState(!(!!fetchedToken))
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(getAuthToken)

    const request: SignInRequest = {
        email: email,
        password: password
    }

    const handleConfirm = () => {
        const url = baseApi() + "/auth/signin"
        let callApi = axios.post(url, request);
        callApi.then((response) => {
            const token = response.data.token
            const username = response.data.username
            setFetchedToken(token)
            setAuth(token, username)
            setShow(false)
            reloadComponents()
        }).catch((e) => {
            console.log(e)
            setErrorMessage("Nieprawidłowy login lub hasło")
        })
    }

    return <>
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Zaloguj się</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(e)=> {
                        e.preventDefault()
                        handleConfirm()
                    }}>
                        Zaloguj
                    </Button>
                </Form>
            </Modal.Body>
            {errorMessage && (
                <Modal.Footer>
                    {errorMessage}
                </Modal.Footer>
            )}

        </Modal>
    </>
}