import React, {useCallback, useState} from 'react';
import ReactImageFallback from "react-image-fallback";
import classNames from 'classnames';
import css from './FamilyNode.module.css';
import {NodeDto} from "../const";
import defaultAvatar from "../../../assets/default-avatar.jpg"
import {formatNullableNodeDateProperty} from "../nodeUtils";


interface FamilyNodeProps {
    node: NodeDto;
    hasSubTree: boolean;
    isRoot: boolean;
    isHover?: boolean;
    onClick: (id: string) => void;
    onSubClick: (id: string) => void;
    style?: React.CSSProperties;
}

export const FamilyNode = React.memo(
    function FamilyNode({node, hasSubTree, isRoot, isHover, onClick, onSubClick, style}: FamilyNodeProps) {
        const clickHandler = useCallback(() => onClick(node.id), [node.id, onClick])
        const clickSubHandler = useCallback(() => onSubClick(node.id), [node.id, onSubClick])
        const genderSpecificNodeClassName = node.gender
        let nodeClassNames = classNames(
            css.node,
            css[genderSpecificNodeClassName],
            css[node.dateOfDeath ? "deceased" : ""],
            isRoot && css.isRoot,
            isHover && css.isHover,
        )

        return (
            <div className={css.root} style={style}>
                <div className={nodeClassNames} onClick={clickHandler}>
                    <div className={classNames(css.nodeElement, css.nodeFullName)}>
                        {formatName(node)}
                    </div>
                    <div className={classNames(css.nodeElement, css.nodeDates)}>
                        <ReactImageFallback
                            // TODO: load node's avatar
                            src={defaultAvatar}
                            fallbackImage={defaultAvatar}
                            height={70}
                         />
                        {formatDates(node)}
                    </div>
                </div>
                <div className={css.nodeIcons}>
                    {hasSubTree && (
                        <div className={css.nodeIcon} onClick={clickSubHandler}>
                            <p>...</p>
                        </div>
                    )}

                </div>
            </div>
        );
    },
);

function formatName(node: NodeDto) {
    return `${node.firstName ?? "?"} ${node.middleName ?? ""} ${node.lastName ?? "?"}`
}

function formatDates(node: NodeDto) {
    let dateOfBirth = formatNullableNodeDateProperty(node.dateOfBirth);
    let dateOfDeathSuffix = node.dateOfDeath ? (" - " + formatNullableNodeDateProperty(node.dateOfDeath)) : "";
    return dateOfBirth + dateOfDeathSuffix
}