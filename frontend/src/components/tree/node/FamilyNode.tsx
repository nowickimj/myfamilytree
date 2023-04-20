import React, {useCallback, useState} from 'react';
import ReactImageFallback from "react-image-fallback";
import classNames from 'classnames';
import css from './FamilyNode.module.css';
import {NodeDto} from "../const";
import defaultAvatar from "../../../assets/default-avatar.jpg"


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

        return (
            <div className={css.root} style={style}>
                <div
                    className={classNames(
                        css.inner,
                        css[node.gender],
                        isRoot && css.isRoot,
                        isHover && css.isHover,
                    )}
                    onClick={clickHandler}>

                    <div className={css.nodeFullName}>
                        {(node.dateOfDeath && "✝")}
                        {formatName(node)}
                    </div>
                    <div className={css.nodeDates}>
                        <ReactImageFallback
                            src={defaultAvatar}
                            fallbackImage={defaultAvatar}
                            //src={`http://digisoft.co.il/ftree/${node.img}.jpg`}
                            height={70}
                         />
                        {formatDates(node)}
                    </div>
                </div>
                {hasSubTree && (
                  <div className={classNames(css.sub, css[node.gender])} onClick={clickSubHandler}>
                      <p>...</p>
                  </div>
                )}
            </div>
        );
    },
);

function formatName(node: NodeDto) {
    return `${node.firstName ?? "?"} ${node.middleName ?? ""} ${node.lastName ?? "?"}`
}

function formatDates(node: NodeDto) {
    return (node.dateOfBirth ?? "?") + (node.dateOfDeath ? " - " + node.dateOfDeath : "")
}