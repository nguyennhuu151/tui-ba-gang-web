import type { Property } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { mergeText, type DeepPartial } from "@/lib/content/merge-text";

/**
 * Dữ liệu 3 cơ sở — Phase 6.5 (mục 13-15) đã thay toàn bộ phần `story`, `amenities`,
 * `dining`, `roomsSection`, `moodTiles`, `moreThanStay`, `closingBanner` bằng nội dung
 * CONFIRMED nguyên văn từ File B trang 6 (Central) / trang 7 (Ember Style) / trang 8
 * (Little Bay) — đối chiếu qua ảnh embedded JPEG trích xuất trực tiếp từ PDF (xem
 * Phase 6.5 mục 13-15 trong report). Trước đó các mục này là MOCK do chưa có nguyên văn.
 *
 * Phần vẫn giữ nguyên từ Phase 5 (CONFIRMED, không đổi): `tagline`, `taglineEn`,
 * `cardDescription`, `contact.hotline`, `contact.email`.
 *
 * Ảnh (`cardImage`, `heroImage`, `story.images[]`, `dining.image`, `moodTiles[].image`,
 * `moreThanStay.image`) — `heroImage` của cả 3 cơ sở đã thay bằng ảnh cắt sạch (chỉ có
 * phần ảnh chụp, không dính chữ thiết kế) trực tiếp từ File B trang 6/7/8 ở Phase 6.5;
 * các ảnh còn lại giữ nguyên (đã xác nhận khớp tham chiếu ở Phase 6.5 mục 13-15).
 *
 * Phase 6.8: `story.image` (string đơn) đổi thành `story.images` (mảng) để hỗ trợ
 * layout 1 ảnh ngang (Central) hoặc collage 3 ảnh (Ember Style) — xem mục 5.2/6.2
 * trong report Phase 6.8.
 *
 * i18n: file này chỉ giữ phần KHÔNG phụ thuộc ngôn ngữ (ảnh, icon, liên hệ, text tiếng Anh
 * dùng chung). Text theo ngôn ngữ nằm ở `properties.<slug>` trong
 * lib/i18n/dictionaries/vi.ts | en.ts và được ghép vào khi gọi `getProperties(locale)`.
 * Mảng `amenities`/`moodTiles` ghép theo THỨ TỰ phần tử — thêm/bớt phần tử ở đây thì
 * phải sửa cùng vị trí trong cả 2 file dictionary.
 */
const propertyBase: DeepPartial<Property>[] = [
  {
    slug: "central",
    order: "01",
    status: "open",
    accent: "brown",
    contactImage: "/images/contact-central.jpg",
    heroLocationTag: "TÚI BA GANG",
    fullName: "Túi Ba Gang Central",
    shortName: "Central",
    taglineEn: "A city stay with a softer rhythm",
    cardImage: "/images/hotel/exterior/hotel-central-exterior-main.webp",
    heroImage: "/images/thuvien-hero-central.jpg",
    tags: ["CITY", "PEOPLE", "CONNECTIONS"],
    heroDashTag: ["A CITY STAY", "WITH A SOFTER RHYTHM"],
    heroTopRightTag: ["PEOPLE", "PLACES", "MOMENTS", "A SLOWER WAY"],
    story: {
      label: "OUR STORY",
      images: ["/images/story-central.jpg"],
    },
    amenities: [
      { icon: "pin" },
      { icon: "breakfast" },
      { icon: "bed" },
    ],
    amenitiesSection: {},
    roomsSection: {
      heading: "Cozy Rooms",
      subheading: "Simple, comfortable and inviting.",
      previewImages: ["/images/room-central-deluxe-plus-1.jpg", "/images/room-central-deluxe-plus-2.jpg"],
    },
    dining: {
      label: "GOOD FOOD BRIGHTER DAYS",
      title: "Breakfast Time",
      description: "Freshly prepared every morning.",
      image: "/images/dining-central.jpg",
      // Phase 6.8 mục 5.5 (bug fix, bổ sung phần thiếu): CONFIRMED File B trang 6 còn có
      // 1 ảnh vuông nhỏ (cận cảnh cà phê/bánh croissant) + caption viết tay đè lên ảnh +
      // 1 đoạn mô tả nhỏ bên dưới — cả 3 đều thiếu ở bản trước.
      // LƯU Ý: `secondaryImage` tạm dùng lại đúng ảnh `dining.image` (cắt vuông góc
      // khác) do chưa có ảnh cận cảnh cà phê/bánh riêng trong bộ asset hiện có — xem
      // "Vấn đề phát hiện" trong claude/phase6.8-report.md, cần ảnh thật thay thế sau.
      secondaryImage: "/images/dining-central-square.jpg",
      secondaryCaption: ["Good Food", "Good Mood"],
    },
    // KHÔNG có banner CTA cuối trang — CONFIRMED File B trang 6 kết thúc ngay sau mục
    // Ẩm thực (xem ghi chú ở lib/types.ts `closingBanner`).
    closingBanner: {
      subtitle: "Same mountains, a gentler you.",
    },
    contact: {
      hotline: "0263 383 7837",
      email: "central@tuibagangdalat.vn",
    },
  },
  {
    slug: "ember-style",
    order: "02",
    status: "coming-soon",
    accent: "ember",
    contactImage: "/images/contact-ember-style.jpg",
    heroLocationTag: "TÚI BA GANG",
    fullName: "Túi Ba Gang Ember Style",
    shortName: "Ember Style",
    taglineEn: "A warmer stay, a deeper you",
    cardImage: "/images/hotel/exterior/hotel-ember-style-exterior-main.webp",
    heroImage: "/images/thuvien-hero-ember-style.jpg",
    heroDashTag: ["A WARMER STAY", "A DEEPER YOU"],
    heroTopRightTag: ["PEOPLE", "PLACES", "MOMENTS", "A WARMER YOU"],
    tags: ["PEOPLE", "MOMENTS", "A WARMER YOU"],
    story: {
      label: "OUR STORY",
      // Phase 6.8 mục 6.2 (bug fix): CONFIRMED File B trang 7 dùng 3 ảnh dạng collage
      // (1 ảnh lớn cầu thang đỏ + 2 ảnh nhỏ xếp chồng: thiệp "Good Places Brighter
      // People" và ảnh núi đồi sương mù "Same place, a different you") — trước đó chỉ
      // có 1/3 ảnh. Đã cắt trực tiếp từ ảnh nhúng gốc File B trang 7 (độ phân giải cao
      // hơn bản cũ) cho cả 3 — xem claude/phase6.8-report.md mục "Images changed".
      images: ["/images/story-ember-style-1.jpg", "/images/story-ember-style-2.jpg", "/images/story-ember-style-3.jpg"],
      ctaLabel: "MORE THAN A STAY",
    },
    // CONFIRMED nền tối, icon + nhãn ngắn (không có mô tả) — File B trang 7.
    amenities: [
      { icon: "crown" },
      { icon: "breakfast" },
      { icon: "lotus" },
      { icon: "sparkle" },
      { icon: "heart" },
    ],
    amenitiesSection: {
      label: "A HIGHER STANDARD",
      dark: true,
    },
    roomsSection: {
      label: "ROOMS & SUITES",
      // Phase 6.8 (phát hiện khi đối chiếu lại File B trang 7 cho mục 6.3): tham chiếu
      // hiển thị 4 phòng preview (Ember Style có đúng 4 hạng phòng trong rooms.ts), không
      // phải 3 như mặc định dùng chung cho Central.
      previewCount: 4,
    },
    // Không có mục "Ẩm thực" riêng — CONFIRMED chỉ có ví dụ cụ thể ở Central
    // (xem docs/open-questions.md #8), Ember Style chưa có căn cứ để thêm section này.
    closingBanner: {
      tag: ["A WARMER STAY", "A DEEPER YOU"],
    },
    contact: {
      // Lưu ý: số này trùng với Central trong File B — nghi ngờ lỗi copy-paste,
      // xem docs/open-questions.md M4. Chưa có số xác nhận riêng nên tạm giữ nguyên
      // như nguồn, không tự sửa/đoán số khác.
      hotline: "0263 383 7837",
      email: "emberstyle@tuibagangdalat.vn",
    },
  },
  {
    slug: "little-bay",
    order: "03",
    status: "coming-soon",
    accent: "littlebay",
    contactImage: "/images/contact-little-bay.jpg",
    listingLine: "A little bay by Túi Ba Gang.",
    fullName: "Túi Ba Gang Little Bay",
    shortName: "Little Bay",
    tagline: "A little bay by Túi Ba Gang",
    taglineEn: "Nature · People · A slower way",
    cardImage: "/images/hotel/interior/hotel-little-bay-living-pool.webp",
    cardImageFocus: "80% center",
    heroImage: "/images/thuvien-hero-little-bay.jpg",
    heroHeadline: ["A little bay", "by Túi Ba Gang"],
    heroDashTag: ["NATURE · PEOPLE", "A SLOWER WAY"],
    tags: ["NATURE", "RELAXATION", "A DIFFERENT YOU"],
    moodTiles: [
      {
        key: "sunrise",
        label: "SUNRISE BAY",
        image: "/images/story-little-bay.jpg",
      },
      {
        key: "sunset",
        label: "SUNSET BAY",
        image: "/images/little-bay/mood-sunset-bay.webp",
      },
      {
        key: "midnight",
        label: "MIDNIGHT BAY",
        image: "/images/little-bay/mood-midnight-bay.webp",
      },
    ],
    amenities: [
      { icon: "leaf" },
      { icon: "pine" },
      { icon: "lotus" },
      { icon: "heart" },
    ],
    // CONFIRMED heading chính LÀ nhãn (không có dòng nhãn nhỏ tách riêng phía trên như
    // Central/Ember Style) — File B trang 8.
    amenitiesSection: {},
    // KHÔNG có mục preview phòng trên trang này (thay bằng `moreThanStay` — CONFIRMED
    // File B trang 8, không có phòng nào được nêu tên cụ thể ở đây).
    moreThanStay: {
      label: "MORE THAN A STAY",
      image: "/images/little-bay/more-than-a-stay.webp",
    },
    // Không có mục "Ẩm thực" riêng — tương tự Ember Style, chưa có căn cứ CONFIRMED.
    closingBanner: {
      subtitle: "Same mountains, a gentler you.",
    },
    contact: {
      // Phase 6.6 (bug fix bổ sung, ngoài danh sách chính nhưng phát hiện khi đối chiếu
      // trực tiếp ảnh nhúng File B trang 10 cho mục 4.3): số cũ "0263 361 9977" bị đảo
      // 2 số cuối so với tham chiếu gốc "0263 361 9777" — CONFIRMED qua ảnh JPEG nhúng
      // trong PDF (không phải suy đoán). Sửa lại cho đúng.
      hotline: "0263 361 9777",
      email: "littlebay@tuibagangdalat.vn",
    },
  },
];

const cache = new Map<Locale, Property[]>();

export function getProperties(locale: Locale): Property[] {
  let list = cache.get(locale);
  if (!list) {
    const text = getDictionary(locale).properties;
    list = propertyBase.map((base) => mergeText<Property>(base, text[base.slug as keyof typeof text]));
    cache.set(locale, list);
  }
  return list;
}

export function getPropertyBySlug(slug: string, locale: Locale) {
  return getProperties(locale).find((p) => p.slug === slug);
}

/**
 * Liên hệ chung của thương hiệu (nút gọi/Zalo nổi) — dùng hotline CONFIRMED của Central,
 * xem docs/requirements-analysis.md. Đổi cơ sở đại diện thì đổi slug ở đây.
 */
export const brandContact = getPropertyBySlug("central", "vi")!.contact;

/** Slug các cơ sở — không phụ thuộc ngôn ngữ, dùng cho generateStaticParams/sitemap. */
export const propertySlugs = getProperties("vi").map((p) => p.slug);
