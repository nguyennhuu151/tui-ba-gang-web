/**
 * CornerTagList — khối tag chữ hoa nhỏ, nhiều dòng, dùng CHUNG cho mọi nơi hiển thị mẫu
 * "People / Places / Moments / A warmer you." (và các biến thể theo cơ sở, vd. "NATURE /
 * RELAXATION / A DIFFERENT YOU") trên toàn site.
 *
 * Phase 6.8 mục 1.2 (bug fix): trước đó mỗi nơi (Hero góc trên-phải, banner Liên hệ,
 * PropertyOverlayCard góc dưới-phải, OfferCard/ContactCard cạnh nút CTA) tự viết riêng 1
 * class string cho cùng 1 kiểu chữ này, nên bị lệch nhau (cỡ chữ 10px/11px/12px khác
 * nhau, 1 chỗ dùng italic — banner Liên hệ — trong khi mọi chỗ khác không), không đồng
 * bộ như yêu cầu "standardize font family/size/weight/letter-spacing/line-height/
 * capitalization across all pages". Gom về 1 component duy nhất để CHỮ luôn giống nhau
 * tuyệt đối (không thể lệch nữa vì chỉ còn 1 chỗ định nghĩa) — đúng CLAUDE.md mục 5
 * (component tái sử dụng, không duplicate code).
 *
 * CHỈ gom phần TYPOGRAPHY (font/size/weight/case/tracking/leading) — phần VỊ TRÍ (góc
 * trên-phải ảnh Hero, góc dưới-phải card, hay cạnh nút CTA) vẫn do nơi gọi tự quyết định
 * qua `className` (`absolute ...`, `text-right`, v.v.), vì đó là bố cục cấu trúc khác
 * nhau thật sự giữa các loại UI (Hero ảnh lớn / card nhỏ / hàng nút CTA) — CONFIRMED qua
 * đối chiếu trực tiếp File B, không phải khác biệt tuỳ tiện.
 */
export function CornerTagList({
  lines,
  inverse = true,
  className = "",
}: {
  lines?: readonly string[];
  /** true (mặc định) = chữ sáng, dùng khi đè lên ảnh/nền tối. false = chữ tối, dùng trên nền sáng (vd. ContactCard). */
  inverse?: boolean;
  className?: string;
}) {
  if (!lines || lines.length === 0) return null;

  return (
    <div
      className={`text-[11px] uppercase leading-relaxed tracking-label ${
        inverse ? "text-cream-50/80" : "text-brown-500"
      } ${className}`.trim()}
    >
      {lines.map((line) => (
        <p key={line} className="whitespace-nowrap">
          {line}
        </p>
      ))}
    </div>
  );
}
