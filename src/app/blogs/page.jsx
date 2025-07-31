import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// const blogConfig = [
//     { title: "AI in Tech", excerpt: "Exploring the impact of AI on technology and innovation.", imgURL: "/ai-in-tech.jpg", URL: "1" },
//     { title: "Web Development Trends", excerpt: "A look at the latest trends shaping web development in 2024.", imgURL: "/web-development-trends.jpg", URL: "2" },
//     { title: "Cloud Computing Basics", excerpt: "Understanding the fundamentals of cloud computing and its benefits.", imgURL: "/cloud-computing.jpg", URL: "3" },
//     { title: "Cybersecurity Essentials", excerpt: "Key practices to keep your digital life safe and secure.", imgURL: "/cyber-security.jpg", URL: "4" },
//     { title: "UI/UX Design Principles", excerpt: "Core principles for designing intuitive and engaging user interfaces.", imgURL: "/ui-ux.png", URL: "5" },
// ]

export async function fetchData() {
    const response = await fetch(`http://localhost:3000/api/v1/get`, { method: "GET" , cache: "no-store" });
    const data = await response.json();
    return data.allBlogs;
}
export const dynamic = "force-dynamic";


export default async function Blogs() {

    const allBlogsData = await fetchData();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-4">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {
                    allBlogsData.map((blog) => {
                        return <BlogCard blog={blog} />
                    })
                }
            </section>
        </main>
    )
}

export function BlogCard({ blog }) {
    return (
        <div className="flex flex-col bg-zinc-900 rounded-lg p-3 hover:scale-105 transition-all delay-100 duration-300">
            <Image
                src={blog.thumbnail}
                width={600}
                height={100}
                alt={blog.title}
                className="rounded-md w-full h-48 object-cover"
            />
            <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.excerpt}</p>
            <Link
                href={`/blog/${blog.slug}`}
                className="inline-block mt-4 text-blue-500 hover:underline"
            >
                <Button size={"sm"}>Read More</Button>
            </Link>
        </div>
    );
}