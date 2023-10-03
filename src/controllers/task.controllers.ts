import express from 'express';
import { createTask, getATask, getAllTasks, updateATask, deleteATask, searchATask, filterTasks, categorizeTasks} from 'src/services/task.services';
// A function to handle the create task 
export const createTaskHandler = async (req: express.Request, res: express.Response) => {
    const {title, dueDate, description} = req.body;
   try {
        if (!title || !dueDate || ! description) {
            return res.status(400).send({message: 'Please peovide all the following details'});
        }
        const creating = await createTask({title, dueDate, description});
        if (!creating) {
            return res.status(400).send({message: 'Could not create the task'});
        }
        return res.status(200).send({message: 'Successfully created the task.', creating});
   }   catch (err) {
    console.log(err, 'Invalid err');
    return res.status(500).send({message: 'Internal server error.'});
   }
}
// A function to handle getting a task
export const getATaskHandler = async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    try {
        if (!id) {
            return res.status(400).send({message: 'Id not found.'})
        }
        const get = await getATask(id);
        if (!get) {
            return res.status(400).send({message: 'Could not get task with id.'})
        }
        return res.status(200).send({message: 'Successfully got the task', getting: get});
    }    catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
    }
    }
// A function to handle getting all tasks
export const getAllTasksHandler = async (req: express.Request, res: express.Response) => {
    try {
        const getting = await getAllTasks();
        if (!getting) {
            return res.status(400).send({message: 'Could not successfully get all tasks'});
        }
        return res.status(200).send({message: 'Successfully got all tasks', get: getting});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
    }
// A function to handle updating a task
export const updateATaskHandler = async (req: express.Request, res: express.Response) => {
    const {description, title} = req.body;
    const {id} = req.params;
    try {
        if (!id) {
            return res.status(400).send({message: 'Please provide a valid id.'});
        }
        if (!description || !title) {
            return res.status(400).send({message: 'Please complete the profile above.'});
        }
        const updating = await updateATask(id, {description, title});
        if (!updating) {
            return res.status(400).send({message: 'Could not find the above to update.'});
        }
        return res.status(200).send({message: 'Successfully updated the tasks', update: updating});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
}
// A function to handle searching for a task
export const searchATaskHandler = async (req: express.Request, res: express.Response) => {
    const keyword = req.query.keyword as string;
    const dueDate = req.query.dueDate as string;
    const {id} = req.params;
    try {
        if (!keyword || !dueDate) {
            return res.status(400).send({message: 'Could not find the above in the query'});
        }
        const search = await searchATask(id, {keyword, dueDate});
        if (search) {
            return res.status(200).send({ message: 'Task found', task: search });
        } else {
            return res.status(404).send({ message: 'Task not found' });
        }

    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
}
// A function to delete a task
export const deleteATaskHandler = async (req: express.Request, res: express.Response) => {
    const {id} = req.params;
    try {
            if (!id) {
                return res.status(400).send({message: 'Please provide a valid id.'});
            }
            const deleting = await deleteATask(id);
            if (!deleting) {
                return res.status(400).send({message: 'Could not delete with the specific id.'});
            }
            return res.status(200).send({message: 'Task was successfully deleted.'})
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
}
// A function to handle task filtering
export const filterTasksHandler = async (req: express.Request, res: express.Response) => {
    const status = req.query.status as string;
    const priority = req.query.priority as string;
    const assignee = req.query.assignee as string;
    try {
        if (!status || !priority || !assignee) {
            return res.status(400).send({message: 'Please provide the required query params.'})
        }
        const filtering = await filterTasks({status, priority, assignee});
        if (!filtering) {
            return res.status(400).send({message: 'Could not get the query details'});
        }
        return res.status(200).send({message: 'Successfully filtered the tasks', data: filtering});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
}
// A function to handle the task categorizing
export const categorizeTaskHandler = async (req: express.Request, res: express.Response) => {
    const {description, name} = req.body;
    try {
        if (!description || !name) {
            return res.status(400).send({message: 'Please provide the above details.'});
        }
        const category = await categorizeTasks({description, name});
        if (!category) {
            return res.status(400).send({message: 'Could not create category'});
        }
        return res.status(200).send({message: 'Successfully created category', data: category});
    }   catch (err) {
        console.log(err, 'Invalid err');
        return res.status(500).send({message: 'Internal server error.'});
       }
};
// A function to handle the task commenting
export const commentTaskHandler = async (req: express.Request, res: express.Response) => {
    const {comment} = req.body;
    const {id} = req.params;
}