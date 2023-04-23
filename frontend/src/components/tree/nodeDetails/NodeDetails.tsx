import React, {memo, MouseEventHandler, useCallback, useState} from 'react';
import css from './NodeDetails.module.css';
import {useQuery} from "@tanstack/react-query";
import {getNodeDetailsProperties} from "../nodeUtils";
import ReactImageFallback from "react-image-fallback";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";
import PersonApi from "../../../PersonApi";
import {DeleteNodeModal} from "../deleteNode/DeleteNode";

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
        const handleDelete: MouseEventHandler<HTMLButtonElement> = (event ) => {
            setShowDeleteModal(isDeleteModalShown => !isDeleteModalShown)
        }

        return (
            <>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header>
                        <div>
                            <Offcanvas.Title>
                                #{nodeId}
                                <div className={css.headerButtons}>
                                    <button className="btn btn-secondary headerButton" onClick={(event) => {
                                        console.log("save button clicked")
                                    }}>
                                        &#9998; Zapisz
                                    </button>
                                    <button className="btn btn-secondary headerButton" onClick={handleDelete}>&#10008; Usuń</button>
                                    <button className="btn btn-secondary headerButton" onClick={handleClose}>
                                        Zamknij
                                    </button>
                                    <br/>
                                    {/*<button className="btn btn-secondary headerButton" onClick={(event) => {*/}
                                    {/*    console.log("addParent button clicked")*/}
                                    {/*}}>*/}
                                    {/*   Dodaj rodzica*/}
                                    {/*</button>*/}
                                    {/*<button className="btn btn-secondary headerButton" onClick={(event) => {*/}
                                    {/*    console.log("addChild button clicked")*/}
                                    {/*}}>*/}
                                    {/*    Dodaj dziecko*/}
                                    {/*</button>*/}
                                </div>

                            </Offcanvas.Title>
                            <ReactImageFallback
                                // TODO: load node's avatar
                                src={defaultAvatar}
                                fallbackImage={defaultAvatar}
                                height={70}/>
                        </div>

                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div>
                            <table className="table-light">
                                <tbody>
                                {properties.map((property) => {
                                    return (
                                        <tr>
                                            <td>{property.name}:</td>
                                            <td>{property.value}</td>
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

                {isDeleteModalShown && (<DeleteNodeModal setShow={setShowDeleteModal} nodeId={nodeId} fullName={data?.firstName + " " + data?.lastName}/>) }
            </>
        );
    },
);