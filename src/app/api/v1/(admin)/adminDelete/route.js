import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE() {
    const session = await getServerSession(authOptions);
    // console.log(session);
    if (!session.user) {
        return NextResponse.json({ message: "No session found" }, { status: 403 })
    }

    // const adminCheck = session.user.role === "ADMIN";
    // if(!adminCheck)
    return NextResponse.json({message:"all ok on delete"})
}