import { authOptions } from "@/lib/auth";
import Category from "@/models/categoryModel";
import Post from "@/models/postModel";
import { getServerSession } from "next-auth/next";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";



export async function PUT(request, { params }) {
    const { slug } = params;
    const body = await request.json();
    const { title, keywords, ogImage, content, excerpt, metaDescription, category, status } = body;

    const session = await getServerSession(authOptions)
    const adminCheck = session.user.role === "ADMIN"
    console.log("session by the server : ", session?.user)

    const post = await Post.findOne({ slug: slug, authorId: session.user._id })

    if (!post) {
        return NextResponse.json({ message: `post not found` }, { status: 404 });
    }

    const authorCheck = session.user._id === post.authorId.toString();
    if (!authorCheck) {
        return NextResponse.json({ message: `you are not the author` }, { status: 403 });
    }

    try {
        const updatedPost = await Post.findOneAndUpdate(
            { slug },
            {
                $set: {
                    title,
                    content,
                    thumbnail: ogImage || null,
                    desc: metaDescription || null,
                    keywords: keywords || null,
                    excerpt: excerpt || null,
                    status
                }
            },
            { new: true }
        )

        revalidateTag(slug);
        console.log("UPDATED POST : ", updatedPost);
        return NextResponse.json(updatedPost, { status: 200 });

    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}


export async function GET(request , { params }) {
    try {
        const { slug } = params;
        // const body = await request.json();
        // const { title, keywords, ogImage, content, excerpt, metaDescription, category, postStatus } = body;

        const session = await getServerSession(authOptions);
        const adminCheck = session.user.role === "ADMIN"

        const post = await Post.findOne({ slug }).populate("categoryId" , "name");
        if (!post) {
            return NextResponse.json({ message: `post not found` }, { status: 404 });
        }

        const authorCheck = session.user._id === post.authorId.toString();
        // console.log(session.user._id , post.authorId.toString())
        // console.log("admin check : ",adminCheck,"Author check : " , authorCheck)

        if (!authorCheck && !adminCheck) {
            return NextResponse.json({ message: "You are not allowed to edit this post" }, { status: 403 })
        }
        // console.log(post , "sent post")
        return NextResponse.json(post, { status: 200 });
    } catch (err) {
        console.error(err.message);
        return NextResponse.json({message: err.message} , {status :500})
    }

}