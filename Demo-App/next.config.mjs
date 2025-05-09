import bundleAnalyzer from '@next/bundle-analyzer';

// initializing the analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['redis'],
};

export default withBundleAnalyzer(nextConfig);
