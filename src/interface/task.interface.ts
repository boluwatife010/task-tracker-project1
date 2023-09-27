export interface createTaskRequestBody{
    dueDate: string,
    title: string,
    description: string
}
export interface updateTaskRequestBody{
    title: string,
    description: string
}
export interface searchTaskRequestQuery{
    keyword: string,
    dueDate: string
}