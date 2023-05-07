import axios, {AxiosRequestConfig} from "axios";
import {getAuthHeader} from "./auth";
import {NodeDto} from "./components/tree/const";

const DEFAULT_BASE_API = "http://localhost:8080/api"

export function baseApi(): string {
    let value = process.env.REACT_APP_API_URL;
    if(!value) {
        console.log(`API_URL not defined, using default: ${DEFAULT_BASE_API}`)
        return DEFAULT_BASE_API
    }
    return value
}

export interface SignInRequest {
    email: string,
    password: string
}

export interface SignInResponse {
    token: string,
    refreshToken: string,
    username: string
}

export interface GetTreeResponse {
    nodes: NodeDto[],
    rootId: string
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

    private defaultConfig(): AxiosRequestConfig {
        return {
            headers: {
                "Authorization": getAuthHeader()
            }
        }
    }

    public async signIn(request: SignInRequest) {
        return {
            queryKey: ["signIn"],
            queryFn: async (): Promise<SignInResponse> => {
                const url = baseApi() + "/auth/signin"
                const {data} = await axios.post(url, request)
                return data
            },
            options: {
                cacheTime: 0,
                manual: true,
                enabled: false
            }
        }
    }

    public getPerson(nodeId: string) {
        return {
            queryKey: ["getNodeDetails", nodeId],
            queryFn: async (): Promise<PersonDto> => {
                const url = baseApi() + "/persons/" + nodeId
                const {data} = await axios.get(url, this.defaultConfig())
                return data
            }
        }
    }

    public updatePerson(nodeId: string, request: PersonRequest) {
        return {
            queryKey: ["updatePerson", nodeId],
            queryFn: async (): Promise<PersonDto> => {
                const url = baseApi() + "/persons/" + nodeId
                const {data} = await axios.patch(url, request, this.defaultConfig())
                return data
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
                const url = baseApi() + "/persons/" + nodeId
                await axios.delete(url, this.defaultConfig())
                return true
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
                const url = baseApi() + "/persons/" + nodeId + "/children"
                const {data} = await axios.post(url, request, this.defaultConfig())
                return data
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
                let url = baseApi() + "/persons/" + nodeId + "/parents"
                const {data} = await axios.post(url, request, this.defaultConfig())
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
                const url = baseApi() + "/persons/" + nodeId + "/spouses";
                const {data} = await axios.post(url, request, this.defaultConfig());
                return data
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
                const url = baseApi() + "/persons/" + nodeId + "/families/descending";
                const {data} = await axios.get(url, this.defaultConfig());
                return data;
            },
            options: {
                manual: true
            }
        }
    }

    public getTree() {
        return {
            queryKey: ["getTree"],
            queryFn: async (): Promise<GetTreeResponse> => {
                let url = baseApi() + "/tree";
                const {data} = await axios.get(url, this.defaultConfig());
                return data;
            }
        }
    }

}
