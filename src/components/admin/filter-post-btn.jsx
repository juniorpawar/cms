"use client"

import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"


export default function FilterPostBtn() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    async function handleFilterPosts(data) {
        console.log("filter btn clicked")
        if (data.category.length !== 0) {
            console.log(data, "data from form hook")
            router.push(`/posts?category=${data.category}`);
        }
    }


    return <form onSubmit={handleSubmit(async (data) => {
        handleFilterPosts(data);
    })} className="flex items-center gap-3 p-4">
        <Input
            {...register("category")}
            id="category"
            type="text"
            placeholder="Enter title"
            className="max-w-[50%]"
        />
        <Button>
            <Search /> filter
        </Button>
    </form>
}