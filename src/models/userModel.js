import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    image : {
        type: String,
        default: "/profile.png"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models?.users || mongoose.model('users', userSchema);

export default User;