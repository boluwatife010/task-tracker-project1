import mongoose from "mongoose"
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
export interface filterTasksRequestQuery {
    priority: string,
    assignee: string,
    status: string
}
export interface categorizeTasksRequestBody {
    description: string,
    name: string
}
export interface commentTaskRequestBody {
    commentId: mongoose.Types.ObjectId,
    comment: string
}
export interface historyRequestBody {
    history : [string]
}
export interface priorityRequestBody {
    priority : string
}
enum TaskStatus {
    Todo = 'To do',
    Inprogress = 'In progress',
    Done = 'Done'
}
export interface newStatusRequestBody {
    status: TaskStatus;
}
export interface attachmentRequestBody {
    filename: string,
    contentType?: string,
    size: number,
    data: Buffer,
    taskId: mongoose.Types.ObjectId,
    mimetype?: string
}
export interface sharingRequestBody {
    userIdSharing : mongoose.Types.ObjectId
}