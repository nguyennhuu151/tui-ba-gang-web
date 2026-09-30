import { getI18n } from "@/lib/i18n/server";

/**
 * SocialIcons — Instagram/Facebook CONFIRMED ở hầu hết footer (File B trang 2,3,5).
 * YouTube chỉ xuất hiện ở footer trang Trải nghiệm — KHÔNG thêm ở đây (Homepage không có YouTube).
 * Link thật chưa được cung cấp — dùng href="#" tạm thời, xem docs/open-questions.md (Nhóm 4, câu 20).
 */
export async function SocialIcons() {
  const { dict } = await getI18n();

  return (
    <div className="flex items-center gap-4">
      <a href="#" aria-label={dict.footer.instagram} className="text-cream-50/80 hover:text-cream-50">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="1.5" y="1.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="13.2" cy="4.8" r="0.8" fill="currentColor" />
        </svg>
      </a>
      <a href="#" aria-label={dict.footer.facebook} className="text-cream-50/80 hover:text-cream-50">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M11.5 6H10a1 1 0 0 0-1 1v2h2.5l-.4 2H9v5H7v-5H5.5V9H7V7.3C7 5.5 8 4.5 9.6 4.5H11.5V6Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
