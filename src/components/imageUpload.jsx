import { storage } from "@/static/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useState } from "react";

export default function ImageUpload({ returnImage }) {

    const [imageAsFile, setImageAsFile] = useState();
    const [loading, setLoading] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    const handleImageAsFile = async (e) => {
        const image = e.target.files[0];
        setImageAsFile(image);
        if (image) {
            uploadToFirebase(image);
        }
    }

    const uploadToFirebase = async (image) => {
        setLoading(true);
        const storageRef = ref(storage, `images/${image.name}`);

        try {
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);
            console.log("Uploaded image successfully to firebase");
            setImageURL(url);
            returnImage(url); //sending to editor parent
        } catch (err) {
            console.log("there was an error in uploading image to firebase", err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center mt-4">
            <label className="cursor-pointer flex flex-col gap-2 w-64 border-2 border-dashed border-stone-500 rounded-lg p-4 bg-stone-800 hover:border-blue-400 transition-colors duration-200">
                <span className="font-bold mb-2 text-gray-100 text-center">Upload cover image</span>
                <input
                    type="file"
                    onChange={handleImageAsFile}
                    hidden
                />
                {loading ? (
                    <div className="flex justify-center items-center py-4">
                        <svg className="animate-spin h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <span className="ml-2 text-gray-300">Uploading...</span>
                    </div>
                ) : imageURL ? (
                    <div className="mt-2 flex flex-col items-center">
                        <img src={imageURL} alt="uploaded" className="max-h-40 rounded shadow-md border border-stone-700" />
                        <span className="text-xs text-green-400 mt-1">Image uploaded!</span>
                    </div>
                ) : (
                    <span className="text-xs text-gray-400 text-center">PNG, JPG, JPEG up to 5MB</span>
                )}
            </label>
        </div>
    )
}