"use client"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import "@/styles/quillContent.css"
import { useEffect, useState } from "react";
import { slugify } from "slugmaster";
import ImageUpload from "./imageUpload";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

export const editorSchema = z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string()
        .refine(val => (val ? val.trim().split(/\s+/).length <= 10 : true), {
            message: "Excerpt must be at most 10 words"
        })
        .optional(),
    category: z.string().min(1, "Category is required"),
    keywords: z.string()
        .refine(val => (val ? val.split(",").map(k => k.trim()).filter(Boolean).length >= 1 : false), {
            message: "At least one keyword is required for SEO benifits"
        }),
    metaDescription: z.string().min(1, "Meta description is required"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
});

export default function Editor({ onSave, existingPost }) {

    const { register, handleSubmit, setValue } = useForm();
    const [content, setContent] = useState("");
    const [ogImage, setOgImage] = useState("");

    useEffect(() => {
        if (existingPost) {
            setValue("title", existingPost.title)
            setValue("excerpt", existingPost.excerpt || "")
            setValue("category", existingPost.categoryId.name || "")
            setValue("keywords", existingPost.keywords || "")
            setValue("metaDescription", existingPost.desc || "")
            setValue("status", existingPost.status)
            setContent(existingPost.content)
            setOgImage(existingPost.thumbnail)
        }
    }, [existingPost])


    const handleForm = (data) => {
        console.log("Data from hook form : ", data);

        const generatedSlug = slugify(data.title);

        onSave({ ...data, slug: generatedSlug, ogImage, content });
    }


    return (
        <section className="flex justify-center items-center min-h-screen px-4">
            <form
                action=""
                className="rounded shadow-md w-full md:max-w-[60vw] flex flex-col gap-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await editorSchema.parseAsync(data);
                        handleForm(data);
                    } catch (error) {
                        console.log(error.message)
                        if (error instanceof z.ZodError) {
                            error.errors.forEach(error => {
                                toast({ 
                                    title: "Form Criteria not fulfilled", 
                                    description: error.message, 
                                    variant: "destructive" 
                                })
                            })
                        }
                    }
                })}
            >
                <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
                <input
                    {...register("title")}
                    id="title"
                    type="text"
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter title"
                />
                <ReactQuill value={content} onChange={setContent} />

                <label htmlFor="excerpt" className="block text-gray-700 font-semibold">Excerpt</label>
                <input
                    {...register("excerpt")}
                    id="excerpt"
                    type="text"
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter excerpt"
                />

                <label htmlFor="category" className="block text-gray-700 font-semibold">Category</label>
                <input
                    {...register("category")}
                    id="category"
                    type="text"
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter category"
                    disabled={existingPost && true}
                />

                <ImageUpload returnImage={setOgImage} existingPostImage={ogImage} />

                <label htmlFor="keywords" className="block text-gray-700 font-semibold">Keywords</label>
                <input
                    {...register("keywords")}
                    id="keywords"
                    type="text"
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter keywords"
                />

                <label htmlFor="metaDescription" className="block text-gray-700 font-semibold">description</label>
                <input
                    {...register("metaDescription")}
                    id="metaDescription"
                    type="text"
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter description"
                />
                <div className="flex gap-2">
                    <select
                        {...register("status")}
                        className="bg-stone-600 rounded-lg font-semibold"
                        defaultValue={"DRAFT"}
                    >
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Publish</option>
                    </select>
                    <Button variant={"secondary"} className="w-fit">Save</Button>
                </div>
            </form>
        </section>
    )
}