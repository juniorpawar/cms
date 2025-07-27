import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        unique: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' //refrencing the post id of the specific posts
    }]
});

const Category = mongoose.models.category || mongoose.model("category" , categorySchema);

export default Category;