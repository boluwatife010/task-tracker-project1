// Importing all necessary modules.
import { FilterQuery } from 'mongoose';
import { categorizeTasksRequestBody, commentTaskRequestBody, createTaskRequestBody, filterTasksRequestQuery, historyRequestBody, newStatusRequestBody, priorityRequestBody, searchTaskRequestQuery, updateTaskRequestBody } from 'src/interface/task.interface';
import { taskModel } from 'src/model/task.model';
// Service function to create a new task
export const createTask = async (body: createTaskRequestBody): Promise<any> => {
    const {title, dueDate, description} = body;
    if (!title || !dueDate || ! description) {
        throw new Error ('Please provide the appropriate information.');
    }
    const task = await taskModel.create({title, dueDate, description});
    if (!task) {
        throw new Error ('Could not create task.');
    }
    await task.save();
    return task;
} 
// Service function to get all tasks
export const getAllTasks = async () => {
    const tasks = await taskModel.find();
    if (!tasks) {
        throw new Error ("Could not get all tasks");
    }
    return tasks;
}
// Service function to get a specific task.
export const getATask = async (id: string) => {
    const aTask = await taskModel.findOne({id});
    if (!aTask) {
        throw new Error  ('Could not find task with the given id above');
    }
    return aTask;
}
// Service function to update a specific task
export const updateATask = async (id: string, body:updateTaskRequestBody): Promise<any> => {
    const {description, title} = body;
    if (!description || !title) {
        throw new Error ('Please provide the above details.')
    }
    const updates = await taskModel.findOne({id});
    if (!updates) {
        throw new Error ('Could not update the following fields.');
    }
    return updates;
}
// Service function to search for a specific task with a given id
export const searchATask = async (id: string, body: searchTaskRequestQuery): Promise<any> => {
    const {dueDate, keyword} = body;
    if (!dueDate || !keyword) {
        throw new Error ('Please provide the above details.')
    }
    const taskSearch = await taskModel.findOne({
        id,
        dueDate: { $gte: new Date(dueDate) }, // Filtering by due date
        title: { $regex: keyword, $options: 'i' }, // Case-insensitive keyword search
    });
    if (!taskSearch) {
        throw new Error ('Could not get the specific task.');
    }
    return taskSearch;
}
// Service function to delete a task with a given id
export const deleteATask = async (id: string) => {
    const deleting = await taskModel.findOneAndDelete({id});
    if (!deleting) {
        throw new Error ('Could not delete task');
    }
    return deleting;
}
// Service function to filter tasks
export const filterTasks = async ( body: filterTasksRequestQuery): Promise<any> => {
    const {status, priority, assignee} =body;
    const query: FilterQuery<any> = {};
    if (!status || !priority || !assignee) {
        throw new Error ('Please provide the following queries');
    }
    if (status) {
        query.status = status;
    }
    if (priority) {
        query.priority = priority;
    }
    if (assignee) {
        query.assignee = assignee;
    }
    const result = await taskModel.find(query);
    return result;

}
// Service function to categorize tasks
export const categorizeTasks = async (body: categorizeTasksRequestBody): Promise<any> => {
    const {name, description} = body;
    if (!name || !description) {
        throw new Error ("Provide the following fields");
    }
    const categories = await taskModel.create({description, name});
    if (!categories) {
        throw new Error ('Could not create category');
    }
    await categories.save();
    return categories;
};
// A function to comment on a task.
export const commentTask = async (body: commentTaskRequestBody, id: string): Promise<any> => {
    const {comment, commentId} = body;
    if (!comment || !commentId) {
        throw new Error ('Could not create comment');
    }
    const finding = await taskModel.findById({id});
    if (!finding) {
        throw new Error ('Could not find user with this id.')
    }
    const commenting = await taskModel.create({comment, commentId});
    if (!commenting) {
        throw new Error ('Could not add comment');
    }
    return await commenting.save();
}
// A function to get a comment by it's id 
export const getCommentById = async (id: string) => {
    const getting = await taskModel.findById({id})
    if (!getting) {
        throw new Error ('Could not find comment.');
    }
    return getting;
}
// A function to get tasks history
export const historyTask = async (id: string, body: historyRequestBody): Promise<any> => {
    const {history} = body;
    if (!history) {
        throw new Error ('Please provide a valid keyword.');
    }
    const histories = await taskModel.findById({id});
    if (!histories) {
        throw new Error ('Could not find the history in db.');
    }
    return histories;
}
// A function to prioritize tasks
export const priorityTask = async (body: priorityRequestBody, id: string) => {
    const {priority} = body;
    if (!priority) {
        throw new Error ('Please provide a string to prioritize tasks.');
    }
    const scaling = await taskModel.findById({id});
    if (!scaling) {
        throw new Error ('Could not get the model.');
    } 
    scaling.priority = priority;
    await scaling.save();
    return scaling;
}
// A function to change the status of tasks
export const createStatus = async (body: newStatusRequestBody, id: string) => {
    const {status} = body;
    if (!status) {
        throw new Error ('Please provide the state of your status.');
    }
    const getstatus = await taskModel.findById({id});
    if (!getstatus) {
        throw new Error ('Could not get the status of task');
     }
     getstatus.status = status;
     await getstatus.save();
     return getstatus;
}