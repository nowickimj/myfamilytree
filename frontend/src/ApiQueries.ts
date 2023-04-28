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

export interface CreatePersonRequest {
    familyId?: number | null,
    firstName: string | null,
    lastName: string | null,
    gender: string | null,
    middleName: string | null,
    maidenName: string | null,
    dateOfBirth: string | null,
    dateOfDeath: string | null,
    description: string | null
}

export interface CreateChildRequest extends CreatePersonRequest {
    familyId?: number | null
}

export default class ApiQueries {

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
                await axios.delete(
                    BASE_API + "/persons/" + nodeId
                );
                return true;
            },
            options: {
                manual: true
            }
        }
    }

    public createChild(nodeId: string, request: CreateChildRequest) {
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

    public createParent(nodeId: string, request: CreatePersonRequest) {
        return {
            queryKey: ["addChild", nodeId],
            queryFn: async (): Promise<FamilyDto> => {
                const {data} = await axios.post(
                    BASE_API + "/persons/" + nodeId + "/parents",
                    request
                );
                return data;
            },
            options: {
                manual: true
            }
        }
    }

    public getDescendingFamilies(nodeId: string) {
        return {
            queryKey: ["getDescendingFamilies", nodeId],
            queryFn: async (): Promise<FamilyDto[]> => {
                const {data} = await axios.get(
                    BASE_API + "/persons/" + nodeId + "/families/descending"
                );
                return data;
            },
            options: {
                manual: true
            }
        }
    }

}
