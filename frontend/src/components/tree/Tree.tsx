import React, {useState} from "react"
import ReactFamilyTree from 'react-family-tree'
import {FamilyNode} from "./FamilyNode/FamilyNode"
import {NODE_HEIGHT, NODE_WIDTH} from "./const"
import type { Node } from 'relatives-tree/lib/types';
import data from './example-family.json'


export default function Tree(){
    const [nodes] = useState(data as readonly Readonly<Node>[]);
    const rootId = nodes[0].id

    return <>
        <ReactFamilyTree
        nodes={nodes}
        rootId={rootId}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        renderNode={(node) => (
            <FamilyNode
                key={node.id}
                node={node}
                style={{
                    width: NODE_WIDTH,
                    height: NODE_HEIGHT,
                    transform: `translate(${node.left * (NODE_WIDTH / 2)}px, ${node.top * (NODE_HEIGHT / 2)}px)`,
                }}
            isRoot={node.id === rootId}
            onClick={event => {}} onSubClick={event => {}}/>
        )}
    /></>;
}