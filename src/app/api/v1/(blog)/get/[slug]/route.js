import Post from "@/models/postModel";
import Category from "@/models/categoryModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { slug } = params;
    try {
        const post = await Post.findOne({
            slug: slug,
            status: 'PUBLISHED'
        }).populate([
            { path: "categoryId", select: "name slug" },
            { path: "authorId", select: "username image" }
        ]);

        if (!post) {
            return NextResponse.json({ message: `Cannot find the post for slug ${slug}` }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}