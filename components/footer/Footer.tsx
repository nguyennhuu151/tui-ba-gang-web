import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/layout/Container";
import { SocialIcons } from "@/components/footer/SocialIcons";

/**
 * Footer — CONFIRMED File B trang 1 (mọi trang): logo, social icons, địa điểm.
 * Chính sách/FAQ/Liên hệ chỉ CONFIRMED xuất hiện ở footer trang Trải nghiệm (File B trang 4)
 * — Homepage (trang 1) không có nhóm link này, nên KHÔNG thêm ở đây để tránh tự ý thêm nội dung.
 *
 * Phase 6.5 mục 4.2 (bug fix): Footer bản cũ quá cao/nhiều khoảng trắng so với tham
 * chiếu — giảm padding dọc và bỏ dòng "Same places, a different you." (không có căn cứ
 * trong tham chiếu Footer của File B, xem thêm docs/open-questions.md), logo cũng thu
 * nhỏ lại (chỉ ở Footer) cho cân đối với chiều cao mới. Giữ nguyên Logo/SocialIcons/địa
 * điểm — không đổi chức năng, chỉ đổi kích thước/khoảng cách hiển thị.
 */
export function Footer() {
  return (
    <footer className="bg-brown-900 py-6 text-cream-50">
      <Container className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <Logo inverse className="h-8 w-auto md:h-10" />
        <div className="flex items-center gap-4">
          <SocialIcons />
          <span className="hidden text-cream-50/40 md:inline">|</span>
          <span className="flex items-center gap-1 text-sm text-cream-50/80">
            <PinIcon /> ĐÀ LẠT, VIỆT NAM
          </span>
        </div>
      </Container>
    </footer>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 12.5S11 8.6 11 5.6A4 4 0 0 0 3 5.6C3 8.6 7 12.5 7 12.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="5.6" r="1.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
