/**
 * Kiểu dữ liệu dùng chung — dựa theo docs/data-model.md (Phase 2), mở rộng ở Phase 6
 * để phục vụ các trang còn lại. Đây là kiểu dữ liệu Ở MỨC FRONTEND, KHÔNG PHẢI schema
 * chính thức của hệ thống (schema thật vẫn phụ thuộc ezCloud — xem docs/api-integration-design.md).
 */

export type PropertySlug = "central" | "ember-style" | "little-bay";

export interface AmenityItem {
  /** Tên icon dùng nội bộ (xem components/hotel/AmenityIconList.tsx) */
  icon:
    | "wifi"
    | "pool"
    | "breakfast"
    | "parking"
    | "spa"
    | "bar"
    | "pet"
    | "view"
    | "pin"
    | "bed"
    | "crown"
    | "lotus"
    | "sparkle"
    | "heart"
    | "leaf"
    | "pine";
  /**
   * Nhãn ngắn — dùng cho kiểu hiển thị icon+nhãn đơn giản (CONFIRMED trang
   * `/thu-vien/ember-style`, File B trang 7 — nền tối, 5 icon chỉ có nhãn, không có
   * mô tả). Dùng field này (không phải `title`) khi trang tham chiếu không có dòng
   * mô tả phụ.
   */
  label?: string;
  /**
   * Tiêu đề — dùng cho kiểu hiển thị icon+tiêu đề+mô tả (CONFIRMED trang
   * `/thu-vien/central` File B trang 6, `/thu-vien/little-bay` File B trang 8).
   */
  title?: string;
  /** Mô tả ngắn đi kèm `title` — chỉ dùng khi có `title`. */
  description?: string;
}

export interface Property {
  slug: PropertySlug;
  /** Số thứ tự hiển thị trên card/Hero ("01", "02"...). */
  order: string;
  /**
   * "open" — có landing page và danh sách phòng đầy đủ. "coming-soon" — các trang
   * `/thu-vien/:hotel`, `/phong-nghi/:hotel(/:room)` hiển thị ComingSoonScreen thay vì nội dung.
   * Mở cửa 1 cơ sở chỉ cần đổi field này (không phải sửa trang/component nào).
   */
  status: "open" | "coming-soon";
  /** Màu nhấn của cơ sở — khớp token `accent` của components/ui/Button.tsx. */
  accent: "brown" | "ember" | "littlebay";
  /** Ảnh dùng ở card Liên hệ và màn hình Coming Soon. */
  contactImage: string;
  /**
   * Dòng mô tả ngắn trên card ở trang Thư viện và Liên hệ — CONFIRMED File B trang 5, 10:
   * khác `cardDescription` với Little Bay ("A little bay by Túi Ba Gang.").
   */
  listingLine: string;
  /** Nhãn nhỏ phía trên tiêu đề Hero ở `/thu-vien/:hotel` — bỏ trống thì không hiển thị. */
  heroLocationTag?: string;
  fullName: string;
  shortName: string;
  tagline: string;
  taglineEn: string;
  cardDescription: string;
  cardImage: string;
  cardImageFocus?: string;
  heroImage: string;
  heroHeadline?: string[];
  heroSubheadline?: string[];
  heroDashTag: string[];
  heroTopRightTag?: string[];
  tags?: string[];
  story?: {
    label: string;
    heading: string[];
    paragraphs: string[];
    images: string[];
    ctaLabel: string;
  };
  moodTiles?: {
    key: string;
    label: string;
    title: string;
    description: string;
    image: string;
  }[];
  amenities: AmenityItem[];
  amenitiesSection: {
    label?: string;
    heading: string[];
    dark?: boolean;
  };
  dining?: {
    label: string;
    title: string;
    description: string;
    image: string;
    secondaryImage?: string;
    secondaryCaption?: string[];
    note?: string;
    ctaLabel?: string;
  };
  roomsSection?: {
    label: string;
    heading: string;
    subheading: string;
    ctaLabel: string;
    previewCount?: number;
    /**
     * Ảnh dùng cho card phòng ở phần preview (lặp vòng nếu ít hơn số phòng) — thay cho ảnh
     * riêng từng phòng khi ảnh phòng chưa đạt chất lượng hiển thị (Central, Phase 6.8 mục 5.4).
     */
    previewImages?: string[];
  };
  moreThanStay?: {
    label: string;
    heading: string[];
    paragraph: string;
    linkLabel: string;
    image: string;
  };
  closingBanner?: {
    tag: string[];
    subtitle?: string;
    ctaLabel: string;
  };
  contact: {
    hotline: string;
    email: string;
  };
}

export interface RoomType {
  hotel: PropertySlug;
  /** Slug dùng cho URL /phong-nghi/:hotel/:roomSlug */
  slug: string;
  /**
   * Tên hạng phòng — [CHƯA XÁC ĐỊNH CHÍNH THỨC]: File B có 3 phiên bản mâu thuẫn
   * (xem docs/open-questions.md M1-M3, docs/data-model.md). Đang dùng tạm "Phiên bản C"
   * (tên ở trang chi tiết từng cơ sở trong File B) làm MOCK DATA cho demo — KHÔNG được
   * xem là tên chính thức, cần chủ đầu tư xác nhận trước khi lên production.
   */
  name: string;
  maxGuests: number;
  sizeSqm: number;
  /** [CHƯA XÁC ĐỊNH] — File B không hiển thị giá, xem docs/functional-requirements.md 5.3 */
  priceFrom: number | null;
  description: string;
  amenities: string[];
  images: string[];
}

/** Icon nhỏ đi kèm từng quyền lợi trong `Offer.benefits` — CONFIRMED File B trang 9 (mỗi dòng quyền lợi có icon riêng, không dùng chung 1 icon check như bản cũ). */
export interface OfferBenefit {
  icon: "bed" | "cup" | "gift" | "swirl" | "star" | "clock" | "leaf" | "lotus" | "tent";
  text: string;
}

export interface Offer {
  property: PropertySlug;
  slug: string;
  name: string;
  description: string;
  dateRangeLabel: string;
  benefits: OfferBenefit[];
  /** Tag nhỏ chữ hoa, đặt góc dưới-phải ảnh — CONFIRMED File B trang 9 (vd. "CITY / PEOPLE / CONNECTIONS") */
  tag: string[];
  image: string;
}

export interface ExperienceItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  /**
   * Đích của link "KHÁM PHÁ" — CONFIRMED riêng cho "Ở lại tận hưởng" phải dẫn sang
   * Thư viện (File B trang 4, Phase 6.5 mục 10.4). 3 card còn lại KHÔNG có trang đích
   * cụ thể trong mockup (nội dung chi tiết [CHƯA XÁC ĐỊNH] — xem docs/open-questions.md
   * F2), nên để trống thì `ExperienceCard` tự dùng neo (anchor) cuộn tới đúng card,
   * không tự bịa 1 trang chi tiết chưa có căn cứ.
   */
  ctaHref?: string;
}
