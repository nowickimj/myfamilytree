import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PersonApi from "../../../PersonApi";
import {useQuery} from "@tanstack/react-query";

const personApi = new PersonApi()

export interface DeleteNodeProps {
    setShow: (current: boolean) => void,
    nodeId: string,
    fullName: string
}

export function DeleteNodeModal(props: DeleteNodeProps) {
    const handleClose = () => props.setShow(false);

    const {refetch} = useQuery({...personApi.deletePerson(props.nodeId), enabled: false})
    const handleConfirm = () => {
        refetch()
        handleClose()
        window.location.reload() //TODO: reload tree component instead of whole page
    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdź operację</Modal.Title>
                </Modal.Header>
                <Modal.Body>Czy na pewno chcesz usunąć "{props.fullName}" z drzewa?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Potwierdź
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}