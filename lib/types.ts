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
  /** Slug dùng cho URL, vd. /phong-nghi/central — xem docs/sitemap.md */
  slug: PropertySlug;
  /** Số thứ tự hiển thị (01/02/03) theo đúng thứ tự trong mockup File B */
  order: "01" | "02" | "03";
  /** Tên đầy đủ, vd. "Túi Ba Gang Central" */
  fullName: string;
  /** Tên rút gọn dùng trong card/nav, vd. "Central" */
  shortName: string;
  /** Tagline CONFIRMED từ File B */
  tagline: string;
  /** Tagline tiếng Anh CONFIRMED từ File B (dùng ở hero /thu-vien/:hotel) */
  taglineEn: string;
  /** Mô tả ngắn dùng ở PropertyCard trang chủ (CONFIRMED từ File B trang 1) */
  cardDescription: string;
  /** Ảnh minh hoạ tạm thời — xem ghi chú trong lib/content/properties.ts */
  cardImage: string;
  /**
   * CSS `object-position` cho `cardImage` khi tỉ lệ ảnh gốc không khớp khung
   * `aspect-[4/3]` của PropertyCard — tránh object-cover cắt mất chủ thể chính
   * (vd. ảnh ngang rộng của Little Bay cần lệch phải để giữ hồ bơi). Bỏ trống
   * thì mặc định "center" — xem components/hotel/PropertyCard.tsx.
   */
  cardImageFocus?: string;
  /** Ảnh hero riêng cho /thu-vien/:slug — CONFIRMED (ảnh cắt từ File B trang 6/7/8, xem Phase 6.5 mục 13-15) */
  heroImage: string;
  /**
   * Đoạn text nhỏ + dòng tiêu đề cỡ vừa hiển thị ngay dưới `headline` chính trong Hero
   * — CONFIRMED riêng cho trang `/thu-vien/:hotel` (vd. Central: "Sôi động giữa" /
   * "lòng phố." — File B trang 6). Không dùng ở Hero các trang khác.
   */
  /**
   * Headline chính của Hero ở trang `/thu-vien/:hotel` — mặc định dùng `[shortName]`
   * nếu bỏ trống. Little Bay CONFIRMED dùng 2 dòng riêng ("A little bay" / "by Túi Ba
   * Gang" — File B trang 8) thay vì chỉ tên cơ sở, nên cần ghi đè ở đây.
   */
  heroHeadline?: string[];
  heroSubheadline?: string[];
  /**
   * Tag nhỏ có gạch ngang phía trước, đặt cùng hàng nút CTA của Hero (CONFIRMED —
   * cùng mẫu với trang Về chúng tôi/Trải nghiệm). LƯU Ý: khác `closingBanner.tag` ở
   * Little Bay (2 nơi dùng text khác nhau — File B trang 8), trùng nhau ở Central/Ember
   * Style (File B trang 6/7).
   */
  heroDashTag: string[];
  /** Tag nhỏ góc trên-phải ảnh Hero (CONFIRMED File B trang 6/7/8 — khác vị trí `cornerBadge` hiện có, xem components/hero/Hero.tsx) */
  heroTopRightTag?: string[];
  /**
   * "Our Story" — CONFIRMED nguyên văn từ File B trang 6 (Central) / trang 7 (Ember
   * Style), xem Phase 6.5 mục 13-14. Little Bay KHÔNG có mục này (File B trang 8 dùng
   * 3 "mood tile" thay thế — xem `moodTiles` bên dưới), nên để `undefined` ở Little Bay
   * thay vì bịa nội dung không có căn cứ.
   */
  story?: {
    label: string;
    heading: string[];
    paragraphs: string[];
    /**
     * 1 hoặc nhiều ảnh — Phase 6.8 mục 5.2/6.2 (bug fix): CONFIRMED qua đối chiếu trực
     * tiếp File B trang 6 (Central) và trang 7 (Ember Style) — 2 cơ sở dùng SỐ LƯỢNG
     * ảnh khác nhau thật sự cho mục này (Central: 1 ảnh ngang; Ember Style: 3 ảnh dạng
     * collage — ảnh lớn + 2 ảnh nhỏ xếp chồng), không phải lỗi thiếu ảnh. Property nhận
     * mảng để giữ ĐÚNG số ảnh CONFIRMED riêng từng cơ sở, template dùng chung ở
     * `app/thu-vien/[hotel]/page.tsx` tự chọn bố cục theo `images.length` (1 → ảnh ngang
     * đơn; 3 → collage) thay vì tách file riêng cho từng cơ sở (tránh trùng lặp code
     * không cần thiết — CLAUDE.md mục 5).
     */
    images: string[];
    /**
     * Nhãn nút "Tìm hiểu thêm" dạng ghost-link có gạch ngang phía trước — CONFIRMED
     * File B trang 6 ("TÌM HIỂU CÂU CHUYỆN") / trang 7 ("MORE THAN A STAY"). Trước đó bị
     * thiếu hẳn (Phase 6.8 mục 5.2). Đích đến [CHƯA XÁC ĐỊNH] (mockup không có trang chi
     * tiết "story" riêng) — tạm dẫn sang trang phòng nghỉ của đúng cơ sở đó, cùng cách
     * xử lý an toàn đã áp dụng cho `moreThanStay.linkLabel` bên dưới.
     */
    ctaLabel: string;
  };
  /**
   * "Mood tiles" — CONFIRMED CHỈ Little Bay (File B trang 8, Phase 6.5 mục 15): 3 thẻ
   * Sunrise/Sunset/Midnight Bay thay cho mục "Our Story". Để `undefined` ở Central/Ember
   * Style vì không có căn cứ.
   */
  moodTiles?: {
    key: string;
    label: string;
    title: string;
    description: string;
    image: string;
  }[];
  /** Tiện nghi/đặc quyền — CONFIRMED nguyên văn từ File B trang 6/7/8 (Phase 6.5 mục 13-15) */
  amenities: AmenityItem[];
  /**
   * Heading + nhãn nhỏ (nếu có) cho mục tiện nghi — CONFIRMED. Little Bay không có
   * nhãn nhỏ riêng (heading chính LÀ nhãn, xem File B trang 8), Central/Ember Style có
   * nhãn nhỏ tách riêng phía trên heading.
   */
  amenitiesSection: {
    label?: string;
    heading: string[];
    /** true = nền tối, icon+nhãn (CONFIRMED chỉ Ember Style, File B trang 7) */
    dark?: boolean;
  };
  /**
   * Ẩm thực — CONFIRMED chỉ có ví dụ cụ thể ở Central ("Breakfast Time" — xem
   * docs/open-questions.md #8 và docs/sitemap.md). Ember Style/Little Bay CHƯA có căn cứ
   * để khẳng định có mục ẩm thực riêng, nên để `undefined` (không hiển thị section này)
   * thay vì tự bịa thêm — tránh thêm section không có căn cứ (đúng CLAUDE.md mục 5).
   */
  dining?: {
    label: string;
    title: string;
    description: string;
    image: string;
    /**
     * Ảnh vuông nhỏ thứ 2 (cận cảnh cà phê/bánh, có caption viết tay "Good Food Good
     * Mood" đè lên) + đoạn mô tả nhỏ bên dưới nó — CONFIRMED File B trang 6, trước đó
     * thiếu hoàn toàn (Phase 6.8 mục 5.5). `secondaryCaption` là chữ viết tay nhỏ đè lên
     * ẢNH (khác `note` — đoạn text thường nằm NGOÀI ảnh, bên dưới).
     */
    secondaryImage?: string;
    /** 2 dòng — CONFIRMED "Good Food" / "Good Mood" (File B trang 6). */
    secondaryCaption?: string[];
    note?: string;
    /** Nhãn nút "Khám phá ẩm thực" — CONFIRMED File B trang 6, trước đó thiếu (Phase 6.8 mục 5.5). */
    ctaLabel?: string;
  };
  /**
   * Nhãn/heading cho mục preview phòng — CONFIRMED (Central: "Cozy Rooms" / "Simple,
   * comfortable and inviting."; Ember Style: "Không gian của sự tinh tế." + mô tả).
   * Little Bay KHÔNG có mục preview phòng trên trang này (thay bằng `moreThanStay` —
   * xem bên dưới), nên để `undefined`.
   */
  roomsSection?: {
    label: string;
    heading: string;
    subheading: string;
    ctaLabel: string;
    /**
     * Số phòng preview hiển thị — mặc định 3 (Central: Superior/Deluxe/Executive).
     * Ember Style CONFIRMED File B trang 7 hiển thị 4 phòng (Cozy/Premier/Signature/
     * Trio), không phải 3 như bản cũ (Phase 6.8, phát hiện khi đối chiếu lại PDF cho
     * mục 6.3) — đặt riêng ở đây thay vì hard-code số 3/4 trong template dùng chung.
     */
    previewCount?: number;
  };
  /**
   * "More than a stay" — CONFIRMED CHỈ Little Bay (File B trang 8, Phase 6.5 mục 15),
   * thay thế mục preview phòng bằng 1 khối ảnh + đoạn giới thiệu + link. Để `undefined`
   * ở Central/Ember Style.
   */
  moreThanStay?: {
    label: string;
    heading: string[];
    paragraph: string;
    linkLabel: string;
    image: string;
  };
  /**
   * Banner CTA cuối trang — CONFIRMED CHỈ Ember Style (File B trang 7: "A WARMER STAY" /
   * "A DEEPER YOU" + tên cơ sở + "ĐẶT PHÒNG NGAY →") và Little Bay (File B trang 8:
   * "ĐÀ LẠT" / "A LITTLE BAY" / "A DEEPER YOU" + "Same mountains, a gentler you." +
   * "ĐẶT PHÒNG NGAY →"). Central KHÔNG có banner này — trang File B trang 6 kết thúc
   * ngay sau mục Ẩm thực (đã xác nhận trực tiếp qua ảnh trích xuất, Phase 6.5 mục 13),
   * nên để `undefined` thay vì tự thêm banner không có căn cứ. Thay cho banner cũ dùng
   * chung 1 câu "Sẵn sàng cho chuyến đi tiếp theo?" cho cả 3 cơ sở — không khớp tham chiếu.
   */
  closingBanner?: {
    tag: string[];
    /** Dòng chữ nghiêng nhỏ bên dưới tag — CONFIRMED chỉ Little Bay ("Same mountains, a gentler you.") */
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
