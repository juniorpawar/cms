import Category from "@/models/categoryModel";
import Post from "@/models/postModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { slugify } from "slugmaster";
import { htmlToText } from "html-to-text";
import User from "@/models/userModel";


export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized user , No session found." }, { status: 401 })
    }
    const body = await request.json();
    const { title, keywords, ogImage, content, excerpt, metaDescription, category, status, slug } = body;

    if (!title || !content || !category || !slug) {
        return NextResponse.json({ message: "Required Data missing" }, { status: 400 });
    }

    const postStatus = status || 'DRAFT';

    try {
        const existingCategory = await Category.findOne({
            slug: category,
        });

        let newCategory = null;
        if (!existingCategory) {
            newCategory = await Category.create({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                slug: slugify(category)
            })
        }

        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return NextResponse.json({ message: "Post with this slug already exists" }, { status: 409 });
        }

        const newPost = await Post.create({
            title,
            slug,
            content,
            thumbnail: ogImage || null,
            desc: metaDescription || null,
            keywords: keywords || null,
            excerpt: excerpt || null,
            categoryId: existingCategory ? existingCategory._id : newCategory._id,
            status: postStatus,
            authorId: session.user._id
        });

        await User.findByIdAndUpdate(session.user._id, { $push: { posts: newPost._id } });

        console.log("Post data saved successfully 👍")
        return NextResponse.json({ message: "data saved successfully 👍" }, { status: 201 });
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}

/*
Example POST body for Postman (raw JSON):

{
    "title": "Demo Blog Post",
    "keywords": ["demo", "blog", "post"],
    "ogImage": "https://example.com/demo-image.jpg",
    "content": "<p>This is a demo blog post content.</p>",
    "excerpt": "This is a short excerpt of the demo post.",
    "metaDescription": "A demo blog post for testing the API.",
    "category": "Demo",
    "status": "published",
    "slug": "demo-blog-post"
}
*/