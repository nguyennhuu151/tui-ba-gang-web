import type { Config } from "tailwindcss";

/**
 * Design tokens lấy từ docs/design-system.md (Phase 4).
 * Lưu ý: các mã màu là màu LẤY MẪU từ file mockup (File B), không phải bảng màu
 * thương hiệu chính thức — xem cảnh báo ở đầu docs/design-system.md.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF8F6",
          100: "#F5F3EE",
          200: "#E7E3D8",
        },
        brown: {
          600: "#6B5B4D",
          800: "#3D2B1F",
          900: "#2B1C12",
        },
        ember: {
          accent: "#7A3B22",
          dark: "#160D08",
        },
        littlebay: {
          accent: "#4B5D45",
          bg: "#DCDAD4",
        },
        ink: "#241A12",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        // "accent": giữ token cho phase sau (nếu 1 trang khác thật sự cần 1 câu tagline
        // tiếng Anh ngắn kiểu chữ ký) — hiện KHÔNG có font nào được nạp cho biến này ở
        // app/layout.tsx (xem ghi chú ở đó), nên class font-accent sẽ tạm rơi về "cursive"
        // mặc định của trình duyệt nếu lỡ dùng. Không dùng class này cho đến khi nạp lại font.
        accent: ["var(--font-accent)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      spacing: {
        18: "4.5rem",
        30: "7.5rem",
      },
      letterSpacing: {
        label: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
