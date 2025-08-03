import { authOptions } from "@/lib/auth";
import Post from "@/models/postModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const adminPosts = await Post.find().populate("authorId" , "username _id");
        return NextResponse.json(adminPosts);
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}