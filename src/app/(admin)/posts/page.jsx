import AdminAllPosts from "@/components/admin/all-admin-posts";
import FilterPostBtn from "@/components/admin/filter-post-btn";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Pen } from "lucide-react";



export default async function AllPosts({ searchParams }) {
    const page = searchParams.page || 1; //from the url search parameters
    const category = searchParams.category || null; //from the url search parameters
    // console.log(searchParams,"category from params")

    const session = await getServerSession(authOptions);
    if (!session) {
        return <div className="mt-6 mx-auto max-w-md rounded-lg bg-[#1f1f1f] text-yellow-300 px-6 py-4 text-center shadow-md">
            <p className="text-lg font-semibold">Authentication Required</p>
            <p className="text-sm mt-1">Your session has expired. Please log in again.</p>
        </div>
    }

    const adminCheck = session.user.role === 'ADMIN';
    if (!adminCheck) {
        return <div className="mt-10 mx-auto max-w-md rounded-lg bg-[#1f1f1f] text-red-400 px-6 py-4 text-center shadow-md">
            <p className="text-lg font-semibold">Access Denied</p>
            <p className="text-sm mt-1">You are not authorized. Only admins can view this page.</p>
        </div>
    }

    return <div className="mt-3">
        <div className="flex items-center gap-2">
            <Pen size={30} />
            <h1 className="text-4xl font-bold mb-4">Manage all posts here </h1>
        </div>
        <FilterPostBtn />
        <AdminAllPosts page={page} category={category} className="" />
    </div>
}