import { getAllAdminBlogs } from "@/app/actions/getAllAdminBlogs";
import dateFormat from "@/utils/dateFormat";
import Link from "next/link";
import DeletePostButton from "./delete-post-btn";
import { config } from "@/static/postConfig"
import { Button } from "../ui/button";
import PostPagination from "@/components/admin/post-pagination";




export default async function AdminAllPosts({ page, category }) {

    const { posts, count } = await getAllAdminBlogs({ page, category });

    if (count == 0) {
        return <div className="w-full py-10 text-center text-gray-400 text-lg font-medium">
            No post found for this category
        </div>
    }

    const maxPage = Math.ceil(count / config.perPage)
    // console.log(maxPage)

    if (page > maxPage) {
        return <div className="w-full py-10 text-center text-gray-400 text-lg font-medium">
            Exceeded page limit, no more posts to show
        </div>
    }
    // console.log(posts,"Posts and count = ",count)

    return <section className="w-full flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-3 gap-3 w-[90%]">
            {posts.map((post) => {
                return <div className="bg-[#3a3a3a] rounded p-3 min-h-[150px] flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        {post.status === "DRAFT" ? <span className="text-yellow-500 px-1 rounded">DRAFT</span> : <span className="bg-green-500 px-1 h-fit rounded">PUBLISHED</span>}
                    </div>
                    <p className="text-gray-400">Created by : {post.authorId.username} </p>
                    <p className="text-gray-400">at {dateFormat(post.createdAt)}</p>
                    <div className="flex gap-3">
                        {post.status === "DRAFT" ? <Link href={`${process.env.NEXT_PUBLIC_URL}/draft/${post.slug}`}>
                            <Button variant={'secondary'}>publish draft</Button>
                        </Link> : <Link href={`${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`}>
                            <Button variant={'secondary'}>view</Button>
                        </Link>}
                        <Link href={`${process.env.NEXT_PUBLIC_URL}/draft/${post.slug}`}>
                            <Button variant={'default'}>edit</Button>
                        </Link>
                        <DeletePostButton postId={post._id.toString()} />
                    </div>
                </div>
            })}
        </div>
        <PostPagination maxPage={maxPage} />
    </section>
}