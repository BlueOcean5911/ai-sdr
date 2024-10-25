/** @type {import('next').NextConfig} */


// console.log(processs.env.NEXT_PUBLIC_API_URL)
const nextConfig = {
    output: 'export',
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/mailings',
                permanent: true, // Set to true for a permanent redirect (HTTP 308)
            },
            {
                source: '/account',
                destination: '/account/profile',
                permanent: true, // Set to true for a permanent redirect (HTTP 308)
            },
        ];
    },
};

export default nextConfig;
