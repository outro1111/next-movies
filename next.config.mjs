/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { // .env.local에 정의된 변수를 여기서 가져와서 설정에 사용함
    API_URL: process.env.API_URL,
  },
  images: { // 외부 서버 이미지 도메인 허용
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
