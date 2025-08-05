import Category from "@/models/categoryModel";
import Post from "@/models/postModel";

import { config } from "@/static/postConfig";

export async function getAllAdminBlogs({ page, category }) {
    category = "lgbtq";
    const postsPerPage = config.perPage || 5;

    let filter = {}, cat, catId;
    if (category && typeof category === "string" && category.trim() !== '') {
        cat = await Category.findOne({ slug: category });
        catId = cat._id;
        filter = {
            categoryId: catId
        }
    }
    // console.log("filter from query : " , filter)

    const response = await Post.find(filter).populate("categoryId").limit(postsPerPage).skip(postsPerPage * (page - 1));
    // console.log(response)
    // console.log(response.length,"Length") 
    return (
        { posts: response, count: response.length }
    )
}