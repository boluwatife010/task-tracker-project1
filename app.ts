import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routes/user.routes';
import taskRouter from './src/routes/task.routes';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.listen(8084, async () => {
    console.log('Server is running at port 8084.')
    await mongoose.connect('mongodb://127.0.0.1/taskTracker');
    console.log('Connected to mongodb.')
})