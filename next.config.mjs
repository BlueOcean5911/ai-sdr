/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/emails',
                permanent: true, // Set to true for a permanent redirect (HTTP 308)
            },
            {
                source: '/integration/hubspot',
                destination: '/integration/hubspot/companies',
                permanent: true, // Set to true for a permanent redirect (HTTP 308)
            },
        ];
    },
};

export default nextConfig;
