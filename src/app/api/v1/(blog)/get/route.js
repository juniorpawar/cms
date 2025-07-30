import { authOptions } from "@/lib/auth";
import Post from "@/models/postModel";
import connectToDB from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    // const session = await getServerSession(authOptions);
    // if (!session || session.status === "unauthenticated") {
    //     return NextResponse.json({ message: "unauthorized user" }, { status: 401 })
    // }
    connectToDB();
    let allBlogs = [];
    try {
        allBlogs = await Post.find({status:"PUBLISHED"});
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

    return NextResponse.json({ message: "all blogs data sent", allBlogs: allBlogs }, { status: 200 })
}