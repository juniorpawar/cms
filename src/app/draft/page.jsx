"use client"
import Editor from "@/components/editor";

export default function Draft() {
    const savePost = async ({ title, keywords, ogImage, content, excerpt, metaDescription, category, status, slug }) => {
        const responce = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/create`,
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
        if (!responce.ok) {
            console.log(responce.message);
            throw new Error("Not able to save the post successfully backent response bad!")
        }
        const resData = await responce.json();
        console.log(resData);
        //api call to our backend  
    }
    return (
        <div>
            <Editor onSave={savePost} />
        </div>
    )
}