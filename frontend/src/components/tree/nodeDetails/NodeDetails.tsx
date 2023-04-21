import React, {memo, useCallback} from 'react';
import classNames from 'classnames';
import css from './NodeDetails.module.css';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {getNodeDetailsProperties} from "../nodeUtils";
import ReactImageFallback from "react-image-fallback";
import defaultAvatar from "../../../assets/default-avatar.jpg";

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

        const closeHandler = useCallback(() => props.onSelect(undefined), [props]);

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
            <section className={classNames(css.root, className)}>
                <div>
                    <header className={css.header}>
                        <h3 className={css.title}>#{nodeId}</h3>
                        <div className={css.headerButtons}>
                            <button className={css.headerButton} onClick={closeHandler}>&#9998;</button>
                            {/*TODO: add data modify modal*/}
                            <button className={css.headerButton} onClick={closeHandler}>&#10008;</button>
                        </div>
                    </header>
                    <ReactImageFallback
                        // TODO: load node's avatar
                        src={defaultAvatar}
                        fallbackImage={defaultAvatar}
                        height={70}
                    />
                </div>
                <br/>
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
            </section>
        );
    },
);