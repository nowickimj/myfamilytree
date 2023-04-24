import axios from "axios";

const BASE_API = "http://localhost:8080/api"

export interface PersonDto {
    id: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    maidenName?: string,
    dateOfBirth?: number[],
    dateOfDeath?: number[],
    description?: string
    attachments: string[]
}

export interface FamilyDto {
    id: number,
    parents: PersonDto[],
    children: PersonDto[]
}

export interface AddChildRequest {
    coParentId?: string | null,
    firstName: string | null,
    lastName: string | null,
    gender: string | null,
    middleName: string | null,
    maidenName: string | null,
    dateOfBirth: string | null,
    dateOfDeath: string | null,
    description: string | null
}

export default class PersonApi {

    public getPerson(nodeId: string) {
        return {
            queryKey: ["getNodeDetails", nodeId],
            queryFn: async (): Promise<PersonDto> => {
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

    public createChild(nodeId: string, request: AddChildRequest) {
        return {
            queryKey: ["addChild", nodeId],
            queryFn: async (): Promise<FamilyDto> => {
                const {data} = await axios.post(
                    BASE_API + "/persons/" + nodeId + "/children",
                    request
                );
                return data;
            },
            options: {
                manual: true
            }
        }
    }

}
