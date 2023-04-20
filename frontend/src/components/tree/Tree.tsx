import React, {useState} from "react"
import ReactFamilyTree from 'react-family-tree'
import {FamilyNode} from "./node/FamilyNode"
import {NodeDto, NODE_HEIGHT, NODE_WIDTH} from "./const"
import data from './example-family.json'

const DEFAULT_ROOT = "2"

export default function Tree() {
    const [nodes] = useState(data as unknown as Readonly<NodeDto>[]); //TODO: replace with API call
    const [rootId, setRootId] = React.useState(DEFAULT_ROOT);

    return <div className="flex grid justify-items-center content-center mt-4 rounded-md px-8 py-4">
        <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            renderNode={(n) => {
                // workaround for non-generic node type, replaced with custom node representation
                const node = nodes.find(node => node.id === n.id)
                if (node == null) {
                    return null
                }

                // render
                return (
                    <FamilyNode
                        key={n.id}
                        node={node}
                        hasSubTree={n.hasSubTree}
                        style={{
                            width: NODE_WIDTH,
                            height: NODE_HEIGHT,
                            transform: `translate(${n.left * (NODE_WIDTH / 2)}px, ${n.top * (NODE_HEIGHT / 2)}px)`
                        }}
                        isRoot={n.id === rootId}
                        onClick={event => {
                        }} onSubClick={setRootId}/>
                )
            }}
        />
        onContextMenu
    </div>;
}