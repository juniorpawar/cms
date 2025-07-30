/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com', // for Google profile images
            'firebasestorage.googleapis.com',
            //add more domains if needed
        ],
    },
};

export default nextConfig;
