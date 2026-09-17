import type { Property } from "@/lib/types";

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
 */
export const properties: Property[] = [
  {
    slug: "central",
    order: "01",
    fullName: "Túi Ba Gang Central",
    shortName: "Central",
    tagline: "Sôi động giữa lòng phố",
    taglineEn: "A city stay with a softer rhythm",
    cardDescription: "Ở giữa Đà Lạt, gần hơn với mọi cuộc hẹn.",
    cardImage: "/images/hotel/exterior/hotel-central-exterior-main.webp",
    heroImage: "/images/thuvien-hero-central.jpg",
    heroSubheadline: ["Sôi động giữa", "lòng phố."],
    heroDashTag: ["A CITY STAY", "WITH A SOFTER RHYTHM"],
    heroTopRightTag: ["PEOPLE", "PLACES", "MOMENTS", "A SLOWER WAY"],
    story: {
      label: "OUR STORY",
      heading: ["Một điểm dừng", "đầy cảm hứng."],
      paragraphs: [
        "Túi Ba Gang Central là nơi nhịp sống Đà Lạt hiện đại và sự riêng tư gặp nhau. Nằm ngay trung tâm thành phố, khách sạn mang đến một không gian lưu trú thoải mái, tinh tế và thuận tiện — để bạn dễ dàng khám phá những điều thú vị của Đà Lạt, theo cách riêng của mình.",
      ],
      // CONFIRMED File B trang 6: 1 ảnh NGANG (quán cà phê/sảnh nhỏ) — xem ghi chú
      // `story.images` ở lib/types.ts. Ảnh gốc đã đúng nội dung/tỉ lệ ngang sẵn (không
      // cần thay ảnh) — lỗi Phase 6.8 mục 5.2 ("hiện đang dọc") là do khung CSS ép ảnh
      // vào tỉ lệ dọc, đã sửa ở app/thu-vien/[hotel]/page.tsx, không phải do ảnh.
      images: ["/images/story-central.jpg"],
      ctaLabel: "TÌM HIỂU CÂU CHUYỆN",
    },
    amenities: [
      {
        icon: "pin",
        title: "VỊ TRÍ TRUNG TÂM",
        description: "Dễ dàng kết nối với những điểm đến và nhịp sống của Đà Lạt.",
      },
      {
        icon: "breakfast",
        title: "ẨM THỰC TINH TẾ",
        description: "Những lựa chọn ẩm thực được chăm chút cho từng khoảnh khắc lưu trú.",
      },
      {
        icon: "bed",
        title: "KHÔNG GIAN LƯU TRÚ TIỆN NGHI",
        description: "Phòng nghỉ thoải mái, chỉnh chu và phù hợp cho những ngày ở lại Đà Lạt.",
      },
    ],
    amenitiesSection: {
      label: "NHỮNG TIỆN NGHI",
      heading: ["Đủ đầy cho một kỳ nghỉ trọn vẹn."],
    },
    roomsSection: {
      label: "PHÒNG NGHỈ",
      heading: "Cozy Rooms",
      subheading: "Simple, comfortable and inviting.",
      ctaLabel: "XEM TẤT CẢ PHÒNG",
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
      note: "Đà Lạt, luôn có những điều dịu dàng để ta muốn quay lại.",
      ctaLabel: "KHÁM PHÁ ẨM THỰC",
    },
    // KHÔNG có banner CTA cuối trang — CONFIRMED File B trang 6 kết thúc ngay sau mục
    // Ẩm thực (xem ghi chú ở lib/types.ts `closingBanner`).
    contact: {
      hotline: "0263 383 7837",
      email: "central@tuibagangdalat.vn",
    },
  },
  {
    slug: "ember-style",
    order: "02",
    fullName: "Túi Ba Gang Ember Style",
    shortName: "Ember Style",
    tagline: "Ấm áp. Tinh tế. Năng lượng.",
    taglineEn: "A warmer stay, a deeper you",
    cardDescription: "Ấm áp. Tinh tế. Năng lượng.",
    cardImage: "/images/hotel/exterior/hotel-ember-style-exterior-main.webp",
    heroImage: "/images/thuvien-hero-ember-style.jpg",
    heroSubheadline: ["Ấm áp.", "Tinh tế.", "Năng lượng."],
    heroDashTag: ["A WARMER STAY", "A DEEPER YOU"],
    heroTopRightTag: ["PEOPLE", "PLACES", "MOMENTS", "A WARMER YOU"],
    story: {
      label: "OUR STORY",
      heading: ["Ngọn lửa của", "những hành trình đẹp hơn."],
      paragraphs: [
        "Túi Ba Gang Ember Style được tạo nên từ cảm hứng về một dải lụa đỏ – mềm mại, ấm áp và đầy sức sống. Hình ảnh dải cầu thang đỏ là biểu tượng cho những hành trình được nâng niu, nơi mỗi bước chân dẫn bạn đến những trải nghiệm tinh tế hơn, sâu sắc hơn.",
        "Tại Ember Style, chúng tôi mang đến một không gian hiện đại, sang trọng và tràn đầy năng lượng, cùng những dịch vụ và đặc quyền được thiết kế riêng cho những vị khách mong muốn nhiều hơn từ một kỳ nghỉ.",
      ],
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
      { icon: "crown", label: "Đặc quyền lưu trú" },
      { icon: "breakfast", label: "Ẩm thực tinh tế" },
      { icon: "lotus", label: "Chăm sóc cá nhân hoá" },
      { icon: "sparkle", label: "Không gian riêng tư" },
      { icon: "heart", label: "Trải nghiệm đặc biệt" },
    ],
    amenitiesSection: {
      label: "A HIGHER STANDARD",
      heading: ["Nhiều hơn một kỳ nghỉ."],
      dark: true,
    },
    roomsSection: {
      label: "ROOMS & SUITES",
      heading: "Không gian của sự tinh tế.",
      subheading: "Mỗi căn phòng là một khoảng lặng ấm áp, được chăm chút trong từng chi tiết, mang đến sự thoải mái và cảm giác riêng tư sang trọng.",
      ctaLabel: "XEM TẤT CẢ PHÒNG NGHỈ",
      // Phase 6.8 (phát hiện khi đối chiếu lại File B trang 7 cho mục 6.3): tham chiếu
      // hiển thị 4 phòng preview (Ember Style có đúng 4 hạng phòng trong rooms.ts), không
      // phải 3 như mặc định dùng chung cho Central.
      previewCount: 4,
    },
    // Không có mục "Ẩm thực" riêng — CONFIRMED chỉ có ví dụ cụ thể ở Central
    // (xem docs/open-questions.md #8), Ember Style chưa có căn cứ để thêm section này.
    closingBanner: {
      tag: ["A WARMER STAY", "A DEEPER YOU"],
      ctaLabel: "ĐẶT PHÒNG NGAY",
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
    fullName: "Túi Ba Gang Little Bay",
    shortName: "Little Bay",
    tagline: "A little bay by Túi Ba Gang",
    taglineEn: "Nature · People · A slower way",
    cardDescription: "Bình yên bên hồ, gần gũi thiên nhiên.",
    cardImage: "/images/hotel/interior/hotel-little-bay-living-pool.webp",
    // Ảnh ngang (2100x910) rộng hơn khung thẻ 4:3 — lệch object-position sang phải
    // để giữ hồ bơi + view rừng thông (chủ thể chính) thay vì bị cắt mất bởi object-cover mặc định.
    cardImageFocus: "80% center",
    heroImage: "/images/thuvien-hero-little-bay.jpg",
    // Không có "TÚI BA GANG" phía trên headline (CONFIRMED File B trang 8 — khác Central/
    // Ember Style) — xem `locationTag` bỏ trống ở app/thu-vien/[hotel]/page.tsx.
    heroHeadline: ["A little bay", "by Túi Ba Gang"],
    heroSubheadline: ["Một vịnh nhỏ ở Đà Lạt", "mang dấu ấn Túi Ba Gang."],
    heroDashTag: ["NATURE · PEOPLE", "A SLOWER WAY"],
    heroTopRightTag: ["SƯƠNG SỚM", "CÂY XANH", "NHỮNG ĐIỀU", "BÌNH YÊN"],
    // KHÔNG có mục "Our Story" (thay bằng `moodTiles` — CONFIRMED File B trang 8).
    moodTiles: [
      {
        key: "sunrise",
        label: "SUNRISE BAY",
        title: "Bình Minh",
        description: "Khởi đầu ngày mới với năng lượng an lành.",
        image: "/images/story-little-bay.jpg",
      },
      {
        key: "sunset",
        label: "SUNSET BAY",
        title: "Hoàng Hôn",
        description: "Lắng đọng cùng những chiều dịu nhẹ.",
        image: "/images/little-bay/mood-sunset-bay.webp",
      },
      {
        key: "midnight",
        label: "MIDNIGHT BAY",
        title: "Ánh Trăng",
        description: "Thư thái trong đêm yên bình.",
        image: "/images/little-bay/mood-midnight-bay.webp",
      },
    ],
    amenities: [
      {
        icon: "leaf",
        title: "KHÔNG GIAN BIỆT LẬP",
        description: "Ba villa riêng giữa thiên nhiên xanh mát.",
      },
      {
        icon: "pine",
        title: "THIÊN NHIÊN GẦN GŨI",
        description: "Bao quanh bởi cây xanh, không khí trong lành.",
      },
      {
        icon: "lotus",
        title: "TRẢI NGHIỆM THƯ THÁI",
        description: "Không gian lý tưởng để tái tạo năng lượng.",
      },
      {
        icon: "heart",
        title: "DẤU ẤN TÚI BA GANG",
        description: "Sự chỉn chu và tinh tế trong từng chi tiết.",
      },
    ],
    // CONFIRMED heading chính LÀ nhãn (không có dòng nhãn nhỏ tách riêng phía trên như
    // Central/Ember Style) — File B trang 8.
    amenitiesSection: {
      heading: ["THIÊN NHIÊN,", "RIÊNG TƯ VÀ CHẬM RÃI."],
    },
    // KHÔNG có mục preview phòng trên trang này (thay bằng `moreThanStay` — CONFIRMED
    // File B trang 8, không có phòng nào được nêu tên cụ thể ở đây).
    moreThanStay: {
      label: "MORE THAN A STAY",
      heading: ["Một không gian", "dành cho những ngày sống chậm lại."],
      paragraph:
        "Tại Little Bay, mỗi khoảnh khắc đều được thiết kế để bạn kết nối sâu hơn với thiên nhiên, với những người thân yêu và với chính mình.",
      linkLabel: "TÌM HIỂU THÊM",
      image: "/images/little-bay/more-than-a-stay.webp",
    },
    // Không có mục "Ẩm thực" riêng — tương tự Ember Style, chưa có căn cứ CONFIRMED.
    closingBanner: {
      tag: ["ĐÀ LẠT", "A LITTLE BAY", "A DEEPER YOU"],
      subtitle: "Same mountains, a gentler you.",
      ctaLabel: "ĐẶT PHÒNG NGAY",
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

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}
