import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';
// import rehypeHighlight from 'rehype-highlight';
// import remarkFrontmatter from 'remark-frontmatter'; // YAML and such.
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

import withPlugins from 'next-compose-plugins';

import createWithBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  // openAnalyzer: true,
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrettyCode],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  // experimental: {
  //   mdxRs: true,
  // },
  // reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl)$/,
      use: [
        {
          loader: 'raw-loader',
        },
      ],
    });

    return config;
  },
};

// Merge MDX config with Next.js config
export default withPlugins([withMDX, withBundleAnalyzer], nextConfig);
