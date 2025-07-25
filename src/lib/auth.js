import GoogleProvider from "next-auth/providers/google";
import connectToDB  from "@/utils/db";
import User from "@/models/userModel";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // callback to configure logic for storing data when user signs in
        // this function runs when the google provider returns a promise and the user object containing basic email, name and image
        async signIn({ user }) {
            console.log("firing the sign in callback");
            console.log("User : ",user);
            await connectToDB();

            // Check if the user already exists
            const existingUser = await User.findOne({ email: user.email });

            // If not, create a new user record
            if (!existingUser) {
                console.log("No existing user found")
                const newUser = await User.create({
                    username: user.name,
                    email: user.email,
                    password: "12345",
                    image: user.image,
                });
                console.log("New user created ", newUser);
            }

            console.log("Existing user found.");
            return true; // Allow sign-in
        },
        async session({ session }) {
            console.log("firing the session callback");
            await connectToDB(); // connect to db
            console.log("Session : ",session);
            const dbUser = await User.findOne({ email: session.user.email }); // find the user in database

            session.user._id = dbUser._id.toString(); // add dbuser fields to session.user
            session.user.usermame = dbUser.username;

            //return session continue sign in
            console.log("user details attached to session");
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}