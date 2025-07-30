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

const Category = mongoose.models.categories || mongoose.model("categories" , categorySchema);

export default Category;