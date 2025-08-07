'use client'

import { Button } from "../ui/button";

export function handleDelete(e) {
    const postId = e.target.value;

    console.log("delte post ID: ", postId);

    alert("are you sure you want to delete this post : post ID ",postId);
    //api call to delete
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/delete/${postId}`, {
        method: "DELETE",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to delete post");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Post deleted successfully:", data);
            // Optionally refresh your post list here
        })
        .catch((err) => {
            console.log("Error deleting post:", err);
        });

}

export default async function DeletePostButton({ postId }) {
    return <Button
        variant={'secondary'}
        className="bg-red-700"
        onClick={handleDelete}
        value={postId}
    >
        delete
    </Button>

}