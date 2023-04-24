import React, {memo, MouseEventHandler, useCallback, useState} from 'react';
import css from './PersonDetails.module.css';
import {useQuery} from "@tanstack/react-query";
import {getPersonProperties} from "../../nodeUtils";
import ReactImageFallback from "react-image-fallback";
import defaultAvatar from "../../../../assets/default-avatar.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";
import ApiQueries from "../../../../ApiQueries";
import {DeletePersonModal} from "../deletePerson/DeletePerson";
import {CreateChildModal} from "../addChild/CreateChildModal";

const personApi = new ApiQueries()

interface PersonDetailsProps {
    nodeId: string;
    className?: string;
    onSelect: (nodeId: string | undefined) => void;
    onHover?: (nodeId: string) => void;
    onClear?: () => void;
}

export const PersonDetails = memo(
    function PersonDetails({nodeId, className, ...props}: PersonDetailsProps) {
        const [show, setShow] = useState(nodeId !== null);
        const handleClose = useCallback(() => {
            setShow(false)
            props.onSelect(undefined)
        }, [props]);

        const {data} = useQuery(personApi.getPerson(nodeId))
        const properties = getPersonProperties(data)

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
                                    <button className="btn btn-secondary  mr-1" onClick={handleDelete}>&#10008; Usuń
                                    </button>
                                    <button className="btn btn-secondary mr-1" onClick={handleClose}>Zamknij</button>
                                    {/*<button className="btn btn-secondary headerButton" onClick={(event) => {*/}
                                    {/*    console.log("addParent button clicked")*/}
                                    {/*}}>*/}
                                    {/*   Dodaj rodzica*/}
                                    {/*</button>*/}
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
                        <div className={css.headerButtons}>
                            <button className="btn btn-secondary mr-1" onClick={handleAddChild}>✚
                                Dodaj potomka
                            </button>
                            {/*<button className="btn btn-secondary mr-1" onClick={(event) => {*/}
                            {/*    console.log("addParent button clicked")*/}
                            {/*}}>*/}
                            {/*    Dodaj rodzica*/}
                            {/*</button>*/}
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
                            <p>Opis: -</p>
                            <div>
                                <p>Załączniki: -</p>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>


                {isDeleteModalShown && (<DeletePersonModal setShow={setShowDeleteModal} nodeId={nodeId}
                                                           fullName={data?.firstName + " " + data?.lastName}/>)}
                {isAddChildModalShown && (<CreateChildModal setShow={setShowAddChildModal} nodeId={nodeId}/>)}
            </>
        );
    },
);