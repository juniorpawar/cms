"use client"
import { redirect } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { Bell, Film, ClockFading, DraftingCompass } from 'lucide-react'
import ChartDashboard from "@/components/chart-dashboard";


export default function Dashboard() {
    const session = useSession();
    console.log(session?.data);

    if (session.status === "loading") {
        console.log(session.status)
        return <div>Loading...</div>;
    }

    if (session.status === "unauthenticated") {
        toast({
            title: "Access Denied",
            description: "You must be signed in to view this page.",
            variant: "destructive",
        });
        redirect("/sign-in");
    }

    return (
        <main className="flex-1 p-6 space-y-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">Welcome back {session.data.user.name.split(" ")[0]} 👋</div>
                <div className="flex items-center gap-4">
                    <button className="relative">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <Image
                        src="/avatar.jpg"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                </div>
            </div>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Posts" value="128" />
            </section>
            <ChartDashboard />

            {/* Recent Posts Section */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
                <div className="space-y-4">
                    {['How AI is Transforming SEO', 'Top 10 Web Dev Tools', 'Understanding Next.js App Router'].map((title, i) => (
                        <div key={i} className="p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-gray-700 transition">
                            <div className="font-medium">{title}</div>
                            <div className="text-gray-400 text-sm">Edited 2 hours ago</div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

const cardConfig = [
    {
        title: "Total Posts",
        value: "128",
        icon: <Film size={30} />
    },
    {
        title: "Drafts",
        value: "15",
        icon: <DraftingCompass size={30} />
    },
    {
        title: "Scheduled",
        value: "6",
        icon: <ClockFading  size={30} />
    }
]
function StatCard({ title, value }) {
    return (
        cardConfig.map((card, index) => (
            <div
                key={index}
                className="border font-semibold text-white border-gray-800 rounded-xl p-6 space-y-2"
                style={{ backgroundImage: 'linear-gradient(130deg, #16222A, #274046 70%, #3A6073 100%)' }}
            >
                {card.icon}
                <div className="text-sm">{card.title}</div>
                <div className="text-2xl font-bold">{card.value}</div>
            </div>
        ))
    )
}