import { ref } from 'firebase/storage';
import { Type } from 'lucide-react';
import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
        default: "/blog-default-cover.jpg"
    },
    desc: {
        type: String,
    },
    keywords:{
        type: String
    },
    excerpt: {
        type:String
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED', 'DELETED', 'ARCHIVED']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Post = mongoose.models.post || mongoose.model("post" , postSchema);

export default Post; 