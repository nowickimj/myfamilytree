import React, {memo, useCallback} from 'react';
import classNames from 'classnames';
import css from './NodeDetails.module.css';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const BASE_API = "http://localhost:8080/api"

interface GetNodeDetailsResponse {
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
            queryFn: async (): Promise<GetNodeDetailsResponse> => {
                const {data} = await axios.get(
                    BASE_API + "/persons/" + nodeId
                );
                return data;
            },
        })

        return (
            <section className={classNames(css.root, className)}>

                <header className={css.header}>
                    <h3 className={css.title}>id: {nodeId}</h3>
                    <div className={css.headerButtons}>
                        <button className={css.headerButton} onClick={closeHandler}>&#9998;</button>
                        {/*TODO: add data modify modal*/}
                        <button className={css.headerButton} onClick={closeHandler}>&#10008;</button>
                    </div>
                </header>
                <div>
                    <p>Imię: {formatOptionalStringProperty(data?.firstName)}</p>
                    <p>Drugie imię: {formatOptionalStringProperty(data?.middleName)}</p>
                    <p>Nazwisko: {formatOptionalStringProperty(data?.lastName)}</p>
                    {data?.maidenName && (<p>Nazwisko rodowe: {formatOptionalStringProperty(data?.maidenName)}</p>)}
                    <p>Data urodzenia: {formatOptionalDateProperty(data?.dateOfBirth)}</p>
                    {data?.dateOfDeath && (<p>Data śmierci: {formatOptionalDateProperty(data?.dateOfDeath)}</p>)}
                    <p>Opis: -</p>
                    <div>
                        <p>Załączniki: -</p>
                    </div>

                </div>
            </section>
        );
    },
);

function formatOptionalStringProperty(property: string | undefined): string {
    return property ?? "-"
}

function formatOptionalDateProperty(property: number[] | undefined): string {
    return property ? property[0] + "-" + property[1] + "-" + property[2] : "-";
}