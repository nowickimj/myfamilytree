import React, {useState} from "react"
import ReactFamilyTree from 'react-family-tree'
import {FamilyNode} from "./FamilyNode/FamilyNode"
import {NODE_HEIGHT, NODE_WIDTH} from "./const"
import averageTree from 'relatives-tree/samples/average-tree.json';
import couple from 'relatives-tree/samples/couple.json';
import diffParents from 'relatives-tree/samples/diff-parents.json';
import divorcedParents from 'relatives-tree/samples/divorced-parents.json';
import empty from 'relatives-tree/samples/empty.json';
import severalSpouses from 'relatives-tree/samples/several-spouses.json';
import simpleFamily from 'relatives-tree/samples/simple-family.json';
import testTreeN1 from 'relatives-tree/samples/test-tree-n1.json';
import testTreeN2 from 'relatives-tree/samples/test-tree-n2.json';
import type { Node } from 'relatives-tree/lib/types';


export default function Tree(){
    const SOURCES = {
        'average-tree.json': averageTree,
        'couple.json': couple,
        'diff-parents.json': diffParents,
        'divorced-parents.json': divorcedParents,
        'empty.json': empty,
        'several-spouses.json': severalSpouses,
        'simple-family.json': simpleFamily,
        'test-tree-n1.json': testTreeN1,
        'test-tree-n2.json': testTreeN2,
    } as Readonly<{ [key: string]: readonly Readonly<Node>[] }>;

    const [nodes, setNodes] = useState(SOURCES["average-tree.json"]);
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