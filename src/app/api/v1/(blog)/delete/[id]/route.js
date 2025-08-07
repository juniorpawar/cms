import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const post = await Post.findOneAndDelete({ _id: id });
        console.log(id, " deleted confirm");
        return NextResponse.json({ message: "deleted post successfully" }, { status: 200 })
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: "cannot delete post internal server err" }, { status: 500 })
    }
}