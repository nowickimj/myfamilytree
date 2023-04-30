import axios from "axios";

const BASE_API = "http://localhost:8080/api"

export interface SignInRequest {
    email: string,
    password: string
}

export interface SignInResponse {
    token: string,
    refreshToken: string
}

export interface PersonDto {
    id: number,
    firstName: string,
    lastName: string,
    middleName?: string,
    maidenName?: string,
    gender: string,
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

export interface PersonRequest {
    firstName: string | null,
    lastName: string | null,
    gender: string | null,
    middleName?: string | null,
    maidenName?: string | null,
    dateOfBirth?: string | null,
    dateOfDeath?: string | null,
    description?: string | null
}

export interface CreateChildRequest extends PersonRequest {
    familyId?: number | null
}

export interface CreateSpouseRequest extends PersonRequest {
    familyId?: number | null
}

export default class ApiQueries {

    public signIn(request: SignInRequest) {
        return {
            queryKey: ["signIn"],
            queryFn: async (): Promise<SignInResponse> => {
                const {data} = await axios.post(
                    BASE_API + "/auth/signin",
                    request
                );
                return data;
            },
            options: {
                manual: true
            }
        }
    }

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

    public updatePerson(nodeId: string, request: PersonRequest) {
        return {
            queryKey: ["updatePerson", nodeId],
            queryFn: async (): Promise<PersonDto> => {
                const {data} = await axios.patch(
                    BASE_API + "/persons/" + nodeId,
                    request
                );
                return data;
            },
            options: {
                manual: true
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
            queryKey: ["createChild", nodeId],
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

    public createParent(nodeId: string, request: PersonRequest) {
        return {
            queryKey: ["createParent", nodeId],
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

    public createSpouse(nodeId: string, request: PersonRequest) {
        return {
            queryKey: ["createSpouse", nodeId],
            queryFn: async (): Promise<FamilyDto> => {
                const {data} = await axios.post(
                    BASE_API + "/persons/" + nodeId + "/spouses",
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
