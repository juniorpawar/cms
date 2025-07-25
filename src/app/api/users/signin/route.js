import {connectToDB} from "@/utils/db";
import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connectToDB();

export async function POST(NextRequest){
    try{
        const {username, email, password} = await NextRequest.json();
        console.log(username, email, password);

        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exists."},{status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hasedPassword = await bcryptjs.hash(password,salt);

        const newUser = await new User({
            username,
            email,
            password: hasedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verification mail
        sendEmail({
            email,
            emailType: "VERIFY",
            userId: "savedUser._id"
        })

        return NextResponse.json({
            message: "User registered and verified successfully",
            success: true,
            savedUser
        })

    } catch(err) {
        return NextResponse.json({
            error: err.message,
            status: 500
        })
    }
}