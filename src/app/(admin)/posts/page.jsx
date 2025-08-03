import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";




export async function fetchPosts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/adminGet`);
    const data = await response.json();
    return (data);
};

export default async function AdminPostsPage() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="flex flex-col h-screen items-center justify-center">
                <div className="bg-zinc-900 rounded-lg p-8 ">
                    <h1 className="text-2xl font-bold text-red-500 mb-2">You are not logged in</h1>
                    <p className="text-gray-300">Please log in to view this page.</p>
                </div>
            </div>
        );
    }
    if (session.user.role !== 'ADMIN') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-zinc-900 rounded-lg p-8 shadow-md">
                <h1 className="text-2xl font-bold text-red-500 mb-2">You are not an admin</h1>
                <p className="text-gray-300">You need to be authorized to view this page.</p>
            </div>
        );
    }
    const adminPosts = await fetchPosts();
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 text-white">All Posts (Admin)</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {adminPosts.map(post => (
                    <BlogCard key={post._id || post.id || post.slug} blog={post} />
                ))}
            </div>
        </div>
    );
}

export function BlogCard({ blog }) {
    return (
        <div className="flex flex-col bg-zinc-900 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-white">{blog.title}</h2>
            <div className="text-sm text-gray-400">
                <span>Author: {blog.authorId.username || "Unknown"}</span>
                <span className="ml-4">Created: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex gap-2 mt-4">
                <Link href={`/blog/${blog.slug}`}>
                    <Button size="sm" variant="outline">View</Button>
                </Link>
                <Link href={`/draft/${blog.slug}`}>
                    <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <Button size="sm" variant="destructive">Delete</Button>
            </div>
        </div>
    );
}