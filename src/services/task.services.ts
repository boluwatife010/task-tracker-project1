// Importing all necessary modules.
import { createTaskRequestBody, searchTaskRequestQuery, updateTaskRequestBody } from 'src/interface/task.interface';
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
export const deleteATask = async (id: string) => {
    const deleting = await taskModel.findOneAndDelete({id});
    if (!deleting) {
        throw new Error ('Could not delete task');
    }
    return deleting;
}