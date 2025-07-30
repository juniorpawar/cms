import Image from "next/image";
import { Calendar1 } from "lucide-react";
import dateFormat from "@/utils/dateFormat";
import "@/styles/quillContent.css"

const fetchSingleBlog = async (slug) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/get/${slug}`, { method: "GET" });
    const data = response.json();
    return data;
}

export default async function BlogPage({ params }) {

    const { slug } = params;
    const post = await fetchSingleBlog(slug);
    const date = post.createdAt
    const tags = post.keywords.split(",");

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col text-center mt-4 gap-1 text-sm">
                <h1 className="text-3xl text-left font-bold mt-4">{post.title}</h1>

                <Image className=" w-[90vw] md:w-[50vw] rounded-xl" src={post.thumbnail} height={500} width={500}></Image>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar1 />
                    <p>{dateFormat(new Date(date))}</p>
                </div>
                <div className="text-gray-200 flex items-center gap-2">
                    <p>Catagory:</p><div className="badge bg-gray-700 border border-white/30 rounded px-2 py-[2px]">{post.categoryId.name}</div>
                </div>
                <div className="text-gray-200 flex items-center gap-2">
                    <p>Tags:</p>
                    {tags.map(tag => {
                        return <div className="badge bg-gray-700 border border-white/30 rounded px-2 py-[2px]">{tag}</div>
                    })}
                </div>
            </div>
            <div className="max-w-5xl w-full text-gray-200 mt-8">
                <div className="quill-content text-white" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
        </section>
    )
}