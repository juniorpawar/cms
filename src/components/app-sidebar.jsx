import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { UserLock, Settings, House, Shapes, BookText, Pen } from "lucide-react";
import Link from "next/link";

const SidebarItems = [
    { title: 'Home', path: '/', icon: House },
    { title: 'Dashboard', path: '/dashboard', icon: Shapes },
    { title: 'Login', path: '/sign-in', icon: UserLock },
    { title: 'Blogs', path: '/blogs', icon: BookText },
    { title: "Drafts", path: '/draft', icon: Pen },
    { title: 'settings', path: '/settings', icon: Settings },
]


export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                {SidebarItems.map((item) => {
                    return (
                        <Link href={item.path} className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800" key={item.title}>
                            <item.icon />
                            {item.title}
                        </Link>
                    )
                })}
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}