import axios from "axios";

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

export interface AddChildRequest {
    coParentId?: string,
    firstName: string,
    lastName: string,
    gender: string,
    middleName?: string,
    maidenName?: string,
    dateOfBirth?: string,
    dateOfDeath?: string,
    description?: string
}

export default class PersonApi {

    public getPerson(nodeId: string) {
        return {
            queryKey: ["getNodeDetails", nodeId],
            queryFn: async (): Promise<GetNodeDetailsResponse> => {
                const {data} = await axios.get(
                    BASE_API + "/persons/" + nodeId
                );
                return data;
            }
        }
    }

    public deletePerson(nodeId: string) {
        return {
            queryKey: ["deletePerson", nodeId],
            queryFn: async (): Promise<boolean> => {
                const {data} = await axios.delete(
                    BASE_API + "/persons/" + nodeId
                );
                return true;
            },
            options: {
                manual: true
            }
        }
    }

    public addChild(nodeId: string, request: AddChildRequest) {
        return {
            queryKey: ["addChild", nodeId],
            queryFn: async (): Promise<boolean> => {
                const {data} = await axios.post(
                    BASE_API + "/persons/" + nodeId + "children",
                    request
                );
                return true;
            },
            options: {
                manual: true
            }
        }
    }

}
