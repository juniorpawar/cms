import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { authOptions } from "@/lib/auth";
import { UserLock, Settings, House, Shapes, BookText, Pen, Layers, UserRoundPen } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const SidebarItems = [
    { title: 'Home', path: '/', icon: House },
    { title: 'Dashboard', path: '/dashboard', icon: Shapes },
    { title: 'Login', path: '/sign-in', icon: UserLock },
    { title: 'Blogs', path: '/blogs', icon: BookText },
    { title: "Drafts", path: '/draft', icon: Pen },
    { title: 'settings', path: '/settings', icon: Settings },
]
const AdminItems = [
    { title: 'All Posts', path: '/posts', icon: Layers },
    { title: 'All Users', path: '/users', icon: UserRoundPen }
]


export function AppSidebar() {

    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {SidebarItems.map((item) => {
                            return (
                                <Link href={item.path} className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" key={item.title}>
                                    <item.icon />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </SidebarGroupContent>
                </SidebarGroup>
                { true && <SidebarGroup>
                    <SidebarGroupLabel>Admin Options</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {AdminItems.map((item) => {
                            return (
                                <Link href={item.path} className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" key={item.title}>
                                    <item.icon />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </SidebarGroupContent>
                </SidebarGroup>}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}