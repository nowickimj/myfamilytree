import React, {useCallback} from 'react';
import classNames from 'classnames';
import css from './FamilyNode.module.css';
import {NodeDto} from "../const";


interface FamilyNodeProps {
    node: NodeDto;
    isRoot: boolean;
    isHover?: boolean;
    onClick: (id: string) => void;
    onSubClick: (id: string) => void;
    style?: React.CSSProperties;
}

export const FamilyNode = React.memo(
    function FamilyNode({node, isRoot, isHover, onClick, onSubClick, style}: FamilyNodeProps) {
        const clickHandler = useCallback(() => onClick(node.id), [node.id, onClick]);
        const clickSubHandler = useCallback(() => onSubClick(node.id), [node.id, onSubClick]);

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

                    <div className={css.nodeText}>
                        {formatName(node)}
                        <br/>
                        {formatDates(node)}

                    </div>
                </div>
                {/*{node.hasSubTree && (*/}
                {/*  <div*/}
                {/*    className={classNames(css.sub, css[node.gender])}*/}
                {/*    onClick={clickSubHandler}*/}
                {/*  />*/}
                {/*)}*/}
            </div>
        );
    },
);

function formatName(node: NodeDto) {
    return (node.firstName ?? "... ") + (node.middleName ?? "") + (node.lastName ?? "...")
}

function formatDates(node: NodeDto) {
    return (node.dateOfBirth ?? "?") + (node.dateOfDeath ? " - " + node.dateOfDeath : "")
}