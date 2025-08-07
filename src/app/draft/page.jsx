"use client"
import Editor from "@/components/editor";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Draft() {

    const session = useSession();
    console.log(session?.data);

    if (session.status === "loading") {
        console.log(session.status)
        return <div>Loading...</div>;
    }

    if (session.status === "unauthenticated") {
        toast({
            title: "Access Denied",
            description: "You must be signed in to view this page.",
            variant: "destructive",
        });
        redirect("/sign-in");
    } else {
        toast({
            title: "Welcome back 🔥",
            description: "Successfully logged in to Project CMS",
            variant: "success",
        });

    }


    const savePost = async ({ title, keywords, ogImage, content, excerpt, metaDescription, category, status, slug }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/create`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    keywords,
                    ogImage,
                    content,
                    excerpt,
                    metaDescription,
                    category,
                    status,
                    slug
                })
            }
        )
        console.log(response);
        const resData = await response.json();
        if (!response.ok) {
            console.log(resData);
            toast({
                title: "Draft Not saved",
                description: resData.message,
                variant: "destructive",
            });
            // throw new Error("Not able to save the post successfully backent response bad!")
        }
        else {
            toast({
                title: "Draft Saved",
                description: "Your draft has been successfully saved.\nYou can edit it any time 👍",
                variant: "success",
            });
            // redirect("/sign-in")

            console.log(resData);
        }
        //api call to our backend  
    }

    return (
        <div>
            <Editor onSave={savePost} />
        </div>
    )
}