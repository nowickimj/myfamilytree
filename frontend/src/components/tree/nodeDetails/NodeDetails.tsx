import React, {memo, MouseEventHandler, useCallback, useState} from 'react';
import css from './NodeDetails.module.css';
import {useQuery} from "@tanstack/react-query";
import {getNodeDetailsProperties} from "../nodeUtils";
import ReactImageFallback from "react-image-fallback";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";
import PersonApi from "../../../PersonApi";
import {DeleteNodeModal} from "../deleteNode/DeleteNode";
import {AddChildModal} from "../addChild/AddChildModal";

const personApi = new PersonApi()

interface NodeDetailsProps {
    nodeId: string;
    className?: string;
    onSelect: (nodeId: string | undefined) => void;
    onHover?: (nodeId: string) => void;
    onClear?: () => void;
}

export const NodeDetails = memo(
    function NodeDetails({nodeId, className, ...props}: NodeDetailsProps) {
        const [show, setShow] = useState(nodeId !== null);
        const handleClose = useCallback(() => {
            setShow(false)
            props.onSelect(undefined)
        }, [props]);

        const {data} = useQuery(personApi.getPerson(nodeId))
        const properties = getNodeDetailsProperties(data)

        const [isDeleteModalShown, setShowDeleteModal] = useState(false)
        const [isAddChildModalShown, setShowAddChildModal] = useState(false)

        const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowDeleteModal(isDeleteModalShown => !isDeleteModalShown)
        }
        const handleAddChild: MouseEventHandler<HTMLButtonElement> = (event) => {
            setShowAddChildModal(isAddChildModalShown => !isAddChildModalShown)
        }

        return (
            <>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header>
                        <div>
                            <Offcanvas.Title>
                                #{nodeId}
                                <div className={css.headerButtons}>
                                    <button className="btn btn-secondary mr-1" onClick={(event) => {
                                        console.log("save button clicked")
                                    }}>
                                        &#9998; Zapisz
                                    </button>
                                    <button className="btn btn-secondary  mr-1"
                                            onClick={handleDelete}>&#10008; Usuń
                                    </button>
                                    <button className="btn btn-secondary mr-1" onClick={handleClose}>
                                        Zamknij
                                    </button>
                                    {/*<button className="btn btn-secondary headerButton" onClick={(event) => {*/}
                                    {/*    console.log("addParent button clicked")*/}
                                    {/*}}>*/}
                                    {/*   Dodaj rodzica*/}
                                    {/*</button>*/}
                                    <div className={css.headerButtons}>
                                        <button className="btn btn-secondary mr-1" onClick={handleAddChild}>
                                            Dodaj potomka
                                        </button>
                                        <button className="btn btn-secondary mr-1" onClick={(event) => {
                                            console.log("addParent button clicked")
                                        }}>
                                            Dodaj rodzica
                                        </button>
                                    </div>
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
                            <p>Opis: -</p>
                            <div>
                                <p>Załączniki: -</p>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>


                {isDeleteModalShown && (<DeleteNodeModal setShow={setShowDeleteModal} nodeId={nodeId} fullName={data?.firstName + " " + data?.lastName}/>)}
                {isAddChildModalShown && (<AddChildModal setShow={setShowAddChildModal} nodeId={nodeId}/>)}
            </>
        );
    },
);