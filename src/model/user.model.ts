import mongoose from 'mongoose';
import validator from 'validator';
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'Your username is required.'],
        min: 3,
        max: 20
    },
    password: {
        required: [true, 'Your password is required.'],
        type: String,
        bcrypt: true,
        minlength: [6, 'Your minimum length of character is 6.'],
        rounds: 10
    },
    email: {
        type: String,
        required: [true, 'Your email is required.'],
         validate: [validator.isEmail, 'This is not a valid email.'],
        lowercase: true,
        unique: true
    }
},
{timestamps: true}
)
export const userModel = mongoose.model("User", userSchema);
