'use client'

import Editor from "@/components/editor";
import { toast } from "@/hooks/use-toast";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateSingleDraft({ params }) {
    const { slug } = params;

    const [post, setPost] = useState();
    // const router = useRouter()

    useEffect(() => {
        const fetchExistingPost = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/update/${slug}` , {cache: 'no-store'});
            const data = await response.json();
            if (!response.ok) {
                console.log(resData);
                toast({
                    title: "Fetching existing data did not work",
                    description: data.message,
                    variant: "destructive",
                });
            }
            setPost(data);
        }
        fetchExistingPost();
    }, [slug])

    const savePost = async ({ title, keywords, ogImage, content, excerpt, metaDescription, category, status }) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/update/${slug}`,
            {
                method: "PUT",
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
                })
            }
        )
        const resData = await response.json();
        if (!response.ok) {
            console.log(resData);
            toast({
                title: "Draft Not updated",
                description: resData.message,
                variant: "destructive",
            });
            // throw new Error("Not able to save the post successfully backent response bad!")
        }
        else {
            toast({
                title: "Draft Updated",
                description: "Your draft has been successfully Updated.\nYou can edit it any time 👍",
                variant: "success",
            });
            // router.push(`/blog/${slug}`)
        }
        //api call to our backend  
    }

    if (!post) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
            <span className="text-lg text-gray-400">No post fetched or found</span>
            </div>
        );
    }

    return (
        <div>
            <Editor onSave={savePost} existingPost={post} />
        </div>
    )
}