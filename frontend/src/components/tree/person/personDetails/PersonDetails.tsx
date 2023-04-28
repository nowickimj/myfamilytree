import React, {memo, MouseEventHandler, useCallback, useState} from 'react';
import css from './PersonDetails.module.css';
import {useQuery} from "@tanstack/react-query";
import {getPersonProperties} from "../../nodeUtils";
import ReactImageFallback from "react-image-fallback";
import defaultAvatar from "../../../../assets/default-avatar.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";
import ApiQueries from "../../../../ApiQueries";
import {DeletePersonModal} from "../modals/DeletePersonModal";
import {CreateChildModal} from "../modals/CreateChildModal";
import {CreateParentModal} from "../modals/CreateParentModal";
import {NodeDto} from "../../const";
import {UpdatePersonModal} from "../modals/UpdatePersonModal";
import {Spinner} from "react-bootstrap";
import {CreateSpouseModal} from "../modals/CreateSpouseModal";

const personApi = new ApiQueries()

interface PersonDetailsProps {
    node: NodeDto;
    className?: string;
    onSelect: (node: NodeDto | undefined) => void;
    onHover?: (nodeId: string) => void;
    onClear?: () => void;
}

export const PersonDetails = memo(
    function PersonDetails({node, className, ...props}: PersonDetailsProps) {
        const nodeId = node.id

        const [show, setShow] = useState(nodeId !== null);
        const handleClose = useCallback(() => {
            setShow(false)
            props.onSelect(undefined)
        }, [props]);


        const {data} = useQuery(personApi.getPerson(nodeId))
        const properties = getPersonProperties(data)

        //show modals
        const [isUpdatePersonModalShown, setShowUpdatePersonModal] = useState(false)
        const [isDeleteModalShown, setShowDeleteModal] = useState(false)
        const [isAddChildModalShown, setShowAddChildModal] = useState(false)
        const [isAddParentModalShown, setShowAddParentModal] = useState(false)
        const [isAddSpouseModalShown, setShowAddSpouseModal] = useState(false)


        const handleUpdatePerson: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowUpdatePersonModal(isUpdatePersonModalShown => !isUpdatePersonModalShown)
        }
        const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowDeleteModal(isDeleteModalShown => !isDeleteModalShown)
        }
        const handleAddChild: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowAddChildModal(isAddChildModalShown => !isAddChildModalShown)
        }
        const handleAddParent: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowAddParentModal(isAddParentModalShown => !isAddParentModalShown)
        }
        const handleAddSpouse: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowAddSpouseModal(isAddSpouseModalShown => !isAddSpouseModalShown)
        }


        if(!data) {
            return <Spinner animation="border" variant="light" />
        }
        return (
            <>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header>
                        <div>
                            <Offcanvas.Title>
                                #{nodeId}
                                <div className={css.headerButtons}>
                                    <button className="btn btn-secondary mr-1"
                                            onClick={handleUpdatePerson}>&#9998; Edytuj
                                    </button>
                                    <button className="btn btn-secondary  mr-1" onClick={handleDelete}
                                            disabled={node.parents.length > 0 && node.children.length > 0}>&#10008; Usuń
                                    </button>
                                    <button className="btn btn-secondary mr-1" onClick={handleClose}>Zamknij</button>
                                </div>

                            </Offcanvas.Title>
                            <div>
                                <ReactImageFallback
                                    // TODO: load node's avatar
                                    src={defaultAvatar}
                                    fallbackImage={defaultAvatar}
                                    height={70}/>
                            </div>
                        </div>

                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className={css.personOperationButtons}>
                            <button className="btn btn-secondary mr-1" onClick={handleAddChild}>
                                ✚ Dodaj potomka
                            </button>
                            <button className="btn btn-secondary mr-1" onClick={handleAddParent}
                                    disabled={node.parents.length > 1}>
                                ✚ Dodaj rodzica
                            </button>
                            <button className="btn btn-secondary mr-1" onClick={handleAddSpouse}>
                                ✚ Dodaj partnera
                            </button>
                        </div>
                        <div>
                            <table className="table-light">
                                <tbody>
                                {properties.map((property) => {
                                    return (
                                        <tr key={property.idx}>
                                            <td key={property.name}>{property.name}:</td>
                                            <td key={property.value}>{property.value}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <br/>
                            <p><b>Opis:</b></p>
                            <p>{data?.description ?? ""}</p>
                            <div>
                                <p><b>Załączniki:</b> -</p>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

                {isUpdatePersonModalShown && (
                    <UpdatePersonModal setShow={setShowUpdatePersonModal} nodeId={nodeId} current={data}/>)}
                {isDeleteModalShown && (<DeletePersonModal setShow={setShowDeleteModal} nodeId={nodeId}
                                                           fullName={data?.firstName + " " + data?.lastName}/>)}
                {isAddChildModalShown && (<CreateChildModal setShow={setShowAddChildModal} nodeId={nodeId}/>)}
                {isAddParentModalShown && (<CreateParentModal setShow={setShowAddParentModal} nodeId={nodeId}/>)}
                {isAddSpouseModalShown && (
                    <CreateSpouseModal setShow={setShowAddSpouseModal} nodeId={nodeId} personDetails={data}/>)}
            </>
        );
    },
);