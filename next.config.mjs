/** @type {import('next').NextConfig} */


// console.log(processs.env.NEXT_PUBLIC_API_URL)
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/tasks',
                permanent: true, // Set to true for a permanent redirect (HTTP 308)
            },
        ];
    },
};

export default nextConfig;
