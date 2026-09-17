/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Ảnh hiện tại là ảnh minh hoạ tạm thời trong /public/images.
    // Khi có ảnh thật từ nguồn ngoài (ví dụ ezCloud hoặc CDN của client),
    // domain phải được khai báo rõ ở đây trước khi dùng next/image — xem docs/security.md.
    remotePatterns: [],
  },
};

export default nextConfig;
