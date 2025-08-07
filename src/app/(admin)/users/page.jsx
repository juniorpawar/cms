import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function AllUsers() {
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

    return <div>
        all users here
    </div>

}