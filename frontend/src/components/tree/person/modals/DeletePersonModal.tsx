import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApiQueries from "../../../../ApiQueries";
import {useQuery} from "@tanstack/react-query";
import {reloadComponents} from "../../../../utlis";

const personApi = new ApiQueries()

export interface DeletePersonProps {
    setShow: (current: boolean) => void,
    nodeId: string,
    fullName: string
}

export function DeletePersonModal(props: DeletePersonProps) {
    const handleClose = () => props.setShow(false);

    const {refetch} = useQuery({...personApi.deletePerson(props.nodeId), enabled: false})
    const handleConfirm = () => {
        refetch()
        handleClose()
        reloadComponents()
    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Potwierdź operację</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy na pewno chcesz usunąć "{props.fullName}" z drzewa?
                    Operacji nie da się cofnąć.
                </Modal.Body>
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