import { getAllAdminBlogs } from "@/app/actions/getAllAdminBlogs";
import { connectStorageEmulator } from "firebase/storage";


export default async function AdminAllPosts({ page, category }) {

    const { posts, count } = await getAllAdminBlogs({ page, category });
    // console.log(posts,"Posts and count = ",count)

    return <section>
        <h1>manage all the blogs</h1>
    </section>
}