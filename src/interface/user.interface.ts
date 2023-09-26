export interface regiterRequestBody {
    username: string,
    email: string,
    password: string
}
export interface loginRequestBody {
    email: string,
    password: string
}
export interface updateRequestBody {
    username: string,
    email: string,
    password: string
}