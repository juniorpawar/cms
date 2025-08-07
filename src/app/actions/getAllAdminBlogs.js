import Category from "@/models/categoryModel";
import Post from "@/models/postModel";

import { config } from "@/static/postConfig";

export async function getAllAdminBlogs({ page, category }) {
    // category = "travel"
    const postsPerPage = config.perPage || 5;

    let filter = {}, cat, catId;
    if (category) {
        cat = await Category.findOne({ slug: category });
        if(!cat){
            return {posts: [] , count: 0}
        }
        catId = cat._id;
        filter = {
            categoryId: catId
        }
    }
    // console.log("filter from query : " , filter)

    const response = await Post.find(filter).populate("categoryId").populate("authorId" , "username").limit(postsPerPage).skip(postsPerPage * (page - 1));
    // console.log(response)
    const count = await Post.countDocuments(filter)
    // console.log(count)
    return (
        { posts: response, count: count }
    )
}