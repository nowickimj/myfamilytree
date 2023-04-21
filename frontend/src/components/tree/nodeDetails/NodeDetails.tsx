import React, {memo, useCallback, useState} from 'react';
import css from './NodeDetails.module.css';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {getNodeDetailsProperties} from "../nodeUtils";
import ReactImageFallback from "react-image-fallback";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";

const BASE_API = "http://localhost:8080/api"

export interface GetNodeDetailsResponse {
    firstName?: string,
    lastName?: string,
    middleName?: string,
    maidenName?: string,
    dateOfBirth?: number[],
    dateOfDeath?: number[],
    description: string,
    attachments: string[]
}

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

        const {data} = useQuery({
            queryKey: ["getNodeDetails", nodeId],
            queryFn: async (): Promise<GetNodeDetailsResponse> => {
                const {data} = await axios.get(
                    BASE_API + "/persons/" + nodeId
                );
                return data;
            },
        })
        const properties = getNodeDetailsProperties(data)

        return (
            <>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                    <Offcanvas.Header>
                        <div>
                            <Offcanvas.Title>
                                #{nodeId}
                                <div className={css.headerButtons}>
                                    <button className="btn btn-secondary" onClick={(event) => {
                                        console.log("save button clicked")
                                    }}>&#9998; Zapisz</button>
                                    {/*TODO: add data modify modal*/}
                                    <button className="btn btn-secondary" onClick={(event) => {
                                        console.log("delete button clicked")
                                    }}>&#10008; Usuń</button>
                                    <button className="btn btn-secondary" onClick={handleClose}>Zamknij</button>
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
            </>
        );
    },
);