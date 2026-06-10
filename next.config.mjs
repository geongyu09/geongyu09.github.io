/** @type {import('next').NextConfig} */
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';

const nextConfig = {
  trailingSlash: true,

  // 상위 디렉토리의 lockfile로 인한 workspace root 오인 방지 (Next 16 Turbopack)
  turbopack: {
    root: import.meta.dirname,
  },

  ...(isProd
    ? {
        // 프로덕션 환경 설정
        output: 'export',
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
