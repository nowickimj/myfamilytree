import React, {useState} from "react"
import ReactFamilyTree from 'react-family-tree'
import {FamilyNode} from "./node/FamilyNode"
import {NODE_HEIGHT, NODE_WIDTH, NodeDto} from "./const"
import {PersonDetails} from "./person/personDetails/PersonDetails"
import css from "./Tree.module.css"
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
import {ExtNode} from "relatives-tree/lib/types";
import {Spinner} from "react-bootstrap";


const DEFAULT_ROOT_ID = "0"
const BASE_API = "http://localhost:8080/api"

interface GetTreeResponse {
    nodes: NodeDto[],
    rootId: string
}

export default function Tree() {
    const {data} = useQuery({
        queryKey: ["getTree", null],
        queryFn: async (): Promise<GetTreeResponse> => {
            const {data} = await axios.get(BASE_API + "/tree");
            return data;
        }
    })

    const nodes: NodeDto[] = data?.nodes ?? []
    const [rootId, setRootId] = React.useState(data?.rootId ?? DEFAULT_ROOT_ID)
    const [selectedNode, setSelectedNode] = useState<NodeDto>()

    if (nodes.length == 0) {
        return <Spinner animation="border" variant="light" />
    }
    return <div className="flex grid justify-items-center content-center mt-4 rounded-md px-8 py-4">
        <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            //placeholders={true}
            renderNode={(n: ExtNode) => {
                // workaround for non-generic type 'ExtNode', replaced with custom node representation
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
                        onClick={(e) => {setSelectedNode(node)}}
                        onSubClick={setRootId}/>
                )
            }}
        />
        {selectedNode && (
            <PersonDetails
                node={selectedNode}
                className={css.details}
                onSelect={setSelectedNode}
            />
        )}
    </div>;
}