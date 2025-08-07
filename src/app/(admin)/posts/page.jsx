import AdminAllPosts from "@/components/admin/all-admin-posts";
import FilterPostBtn from "@/components/admin/filter-post-btn";
import { Input } from "@/components/ui/input";
import { authOptions } from "@/lib/auth"
import { Filter, Pen } from "lucide-react";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";



export default async function AllPosts({ searchParams }) {
    const page = searchParams.page || 1; //from the url search parameters
    const category = searchParams.category || null; //from the url search parameters
    // console.log(searchParams,"category from params")

    const session = await getServerSession(authOptions);
    // console.log(session)
    let adminCheck;
    try {
        adminCheck = session.user.role === "ADMIN"
    } catch (err) {
        console.log(err.message);
        redirect("/");
    }

    if (!adminCheck) {
        return <div>
            not an admin
        </div>
    }

    return <div className="mt-3">
        <div className="flex items-center gap-2"> 
            <Pen size={30}/>
            <h1 className="text-4xl font-bold mb-4">Manage all posts here </h1>
        </div>
        <FilterPostBtn/>
        <AdminAllPosts page={page} category={category} className=""/>
    </div>
}