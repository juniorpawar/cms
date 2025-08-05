import AdminAllPosts from "@/components/admin/all-admin-posts";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";


export default async function AllPosts({ searchParams }) {
    const page = searchParams.page || 1; //from the url search parameters
    const category = searchParams.catagory || null; //from the url search parameters

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

    return <div>
        <AdminAllPosts page={page} category={category} />
        all posts here
    </div>
}