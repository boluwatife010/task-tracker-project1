import { loginRequestBody, regiterRequestBody, updateRequestBody } from "../interface/user.interface";
import { userModel } from "../model/user.model";
import bcrypt from 'bcrypt';
import { generateAuthToken } from "src/middleware/auth";

export const userRegistration = async (body: regiterRequestBody): Promise<any> => {
    const {email, password, username} = body;
    const userExists = await userModel.findOne({username, email, password});
    if (!userExists) {
        throw new Error('One of the data above is already in use.');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await userModel.create({email, password:hashPassword, username});
    const token = generateAuthToken(createUser._id.toString());
    if (!createUser) {
        throw new Error ('Please validate your details above');
    }
    await createUser.save();
    return {createUser, token};
}
export const userLogin = async (body:loginRequestBody): Promise<any> => {
    const {email, password} = body;
    const login = await userModel.findOne({email});
    if (!login) {
        throw new Error ('Email is required.');
    }
    if (!login.password) {
        throw new Error ('Password is required.');
    }
    const comparing = await bcrypt.compare(password, login.password);
    if (!comparing) {
        throw new Error ('Invalid password.');
    } 
    const token = generateAuthToken(login._id.toString());
    return {login, token};
}
export const userUpdate = async (body:updateRequestBody, id: string) => {
    const {email, password, username} = body;
    const update = await userModel.findById(id);
    if (!update) {
        throw new Error ('User details not found.');
    }
    if (email) {
        update.email = email;
    }
    if (password) {
        update.password = password;
    }
    if (username) {
        update.username = username;
    }
     await update.save();
     return update;
}
export const getUser = async (id: string) => {
    const user = await userModel.findById(id);
    if (!user) {
        throw new Error ('User not found.')
    }
    return user;
}
export const getAllUsers = async () => {
    const all = await userModel.find();
    if (!all) {
        throw new Error ('Could not get all users.')
    }
    return all;
}
export const deleteUser = async (id: string) => {
    const deleting = await userModel.findByIdAndDelete(id);
    if (!deleting) {
        throw new Error ('The id provided above is not valid.')
    }
    return deleting;
}