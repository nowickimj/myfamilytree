import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal"
import ApiQueries, {SignInRequest, SignInResponse} from "../../ApiQueries"
import {setAuth} from "../auth";
import {useQuery} from "@tanstack/react-query";

const api = new ApiQueries()

export interface LoginPageProps {
}

export function LoginPage(props: LoginPageProps) {

    const [show, setShow] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const request: SignInRequest = {
        email: email,
        password: password
    }

    const confirmQuery = useQuery({...api.signIn(request), enabled: false})
    const handleConfirm = () => {
        confirmQuery.refetch()
        if (confirmQuery.isSuccess) {
            const response = confirmQuery.data as SignInResponse ?? null
            if(response) {
                setAuth(response.token)
                setShow(false)
            }
        } else {
            setErrorMessage("Nieprawidłowy login lub hasło")
        }
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
                    <Button variant="primary" type="submit" onClick={handleConfirm}>
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