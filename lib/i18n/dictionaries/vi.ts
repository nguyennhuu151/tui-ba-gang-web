/**
 * TOÀN BỘ text tiếng Việt của website — file gốc (source of truth) của dictionary.
 * `en.ts` phải có đúng cấu trúc này (TypeScript báo lỗi nếu thiếu/thừa key).
 *
 * Quy ước:
 * - Chỉ chứa text KHÁC NHAU giữa 2 ngôn ngữ. Text vốn là tiếng Anh dùng chung cho cả 2
 *   locale (tagline thương hiệu, tên hạng phòng, tên ưu đãi, "OUR STORY"...) để nguyên ở
 *   lib/content hoặc trong component — xem docs/technical-decisions.md #8.
 * - Text có chèn giá trị động viết dạng hàm, vd. `guests: (n) => \`${n} khách\``.
 * - Dùng: Server Component `const { dict } = await getI18n()`, Client Component `useI18n()`.
 */
export const vi = {
  meta: {
    site: {
      title: "Túi Ba Gang | Ba không gian, một tinh thần",
      description:
        "Túi Ba Gang – thương hiệu lưu trú tại Đà Lạt với 3 không gian riêng biệt: Central, Ember Style và Little Bay.",
    },
    about: {
      title: "Về chúng tôi | Túi Ba Gang",
      description:
        "Câu chuyện thương hiệu Túi Ba Gang — 3 không gian lưu trú riêng biệt tại Đà Lạt: Central, Ember Style, Little Bay.",
    },
    experiences: {
      title: "Trải nghiệm | Túi Ba Gang",
      description: "Trải nghiệm Đà Lạt theo phong cách Túi Ba Gang.",
    },
    offers: {
      title: "Ưu đãi | Túi Ba Gang",
      description: "Các chương trình ưu đãi hiện có tại Central, Ember Style và Little Bay.",
    },
    contact: {
      title: "Liên hệ | Túi Ba Gang",
      description: "Thông tin liên hệ (hotline, email) của Central, Ember Style và Little Bay.",
    },
    booking: {
      title: "Đặt phòng | Túi Ba Gang",
      description: "Tìm và đặt phòng tại Central, Ember Style, Little Bay.",
    },
    rooms: {
      title: "Phòng nghỉ | Túi Ba Gang",
      description:
        "Chọn 1 trong 3 cơ sở Túi Ba Gang để xem danh sách hạng phòng: Central, Ember Style, Little Bay.",
    },
    library: {
      title: "Thư viện | Túi Ba Gang",
      description: "Khám phá landing page đầy đủ của từng cơ sở Túi Ba Gang: Central, Ember Style, Little Bay.",
    },
    propertyRoomsTitle: (shortName: string) => `Phòng nghỉ ${shortName} | Túi Ba Gang`,
    propertyRoomsDescription: (fullName: string) => `Danh sách hạng phòng tại ${fullName}.`,
  },

  common: {
    home: "Trang chủ",
    dalatVietnam: "ĐÀ LẠT, VIỆT NAM",
    threeSpaces: "Ba không gian, một tinh thần.",
    mistyDalat: "Đà Lạt sương mù",
    bookNow: "ĐẶT PHÒNG",
    viewRooms: "XEM PHÒNG",
    explore: "KHÁM PHÁ",
    backToHome: "Về trang chủ",
    tryAgain: "Thử lại",
    loading: "Đang tải...",
    imageComingSoon: "Hình ảnh sẽ được cập nhật",
    logoLabel: "Về trang chủ Túi Ba Gang",
    guests: (count: number) => `${count} khách`,
    exploreProperty: (shortName: string) => `Khám phá ${shortName}`,
  },

  nav: {
    about: "Về chúng tôi",
    rooms: "Phòng nghỉ",
    experiences: "Trải nghiệm",
    library: "Thư viện",
    offers: "Ưu đãi",
    contact: "Liên hệ",
    booking: "Đặt phòng",
    mainMenu: "Menu chính",
    mainMenuMobile: "Menu chính (mobile)",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    backToLibrary: "Về trang Thư viện",
  },

  language: {
    label: "Ngôn ngữ",
    choose: "Chọn ngôn ngữ",
  },

  footer: {
    location: "ĐÀ LẠT, VIỆT NAM",
    instagram: "Instagram Túi Ba Gang",
    facebook: "Facebook Túi Ba Gang",
  },

  contactWidget: {
    zalo: "Chat Zalo với Túi Ba Gang",
    callHotline: (hotline: string) => `Gọi hotline ${hotline}`,
  },

  home: {
    heroImageAlt: "Túi Ba Gang tại Đà Lạt, Việt Nam",
    hero: {
      locationTag: "ĐÀ LẠT, VIỆT NAM",
      headline: ["Ba không gian,", "một tinh thần."],
      description: "Khám phá những cách khác nhau để trải nghiệm Đà Lạt cùng Túi Ba Gang.",
      ctaLabel: "KHÁM PHÁ NGAY",
    },
    brandIntro: {
      headline: ["Giữa lòng Đà Lạt,", "một trải nghiệm rất riêng."],
      description:
        "Túi Ba Gang là nơi giao thoa giữa nét đẹp bản địa và hơi thở hiện đại, mang đến cho bạn những khoảng khắc an yên giữa lòng thành phố sương mù.",
      ctaLabel: "CÂU CHUYỆN CỦA CHÚNG TÔI",
    },
    bannerQuote: "Có những chuyến đi không chỉ để đến, mà để trở về với chính mình.",
  },

  about: {
    heroTag: "CÂU CHUYỆN",
    heroDescription: ["Mang theo những điều thân quen.", "Lưu lại những điều đáng nhớ."],
    heroImageAlt: "Không gian Túi Ba Gang nhìn ra Đà Lạt",
    storyHeading: ["Một chiếc túi,", "một hành trình,", "và những điều ở lại."],
    storyParagraphs: [
      "Túi Ba Gang bắt đầu từ một hình ảnh rất quen thuộc trong đời sống người Việt xưa — chiếc túi nhỏ theo người trên những hành trình xa, chứa đựng những gì cần thiết và thân thuộc.",
      "Từ hình ảnh ấy, chúng tôi tìm thấy một cách để nói về nơi lưu trú: một không gian vừa đủ, được chăm chút vừa đủ, để mỗi hành trình trở nên trọn vẹn hơn.",
      "Túi Ba Gang được tạo nên tại Đà Lạt với sự trân trọng dành cho kiến trúc, chất liệu, thiên nhiên và những khoảng thời gian riêng tư của mỗi vị khách.",
      "Mỗi nơi có một cá tính khác nhau. Nhưng tất cả cùng chia sẻ một tinh thần — sự tinh tế không phô trương, sự chăm sóc được thể hiện trong từng chi tiết, và một cảm giác dễ chịu khi ở lại.",
      "Bởi đôi khi, những điều đáng nhớ nhất của một chuyến đi lại là những điều rất nhỏ.",
    ],
    storyImageAlt: 'Túi vải Túi Ba Gang và cuốn sổ "The Journey Stays With You"',
    pineImageAlt: "Lá thông đọng sương ở Đà Lạt",
    valleyImageAlt: "Thung lũng sương mù Đà Lạt nhìn từ xa",
    dalatNote: ["Đà Lạt,", "Luôn có những điều dịu dàng", "Để ta muốn quay lại."],
    spiritDescription:
      "Mỗi nơi là một sắc thái khác nhau của Đà Lạt, nhưng đều hướng đến cùng một điều: để bạn cảm nhận nhiều hơn từ hành trình của mình.",
    closingLines: ["Mang theo những điều thân quen.", "Lưu lại những điều đáng nhớ."],
  },

  experiencesPage: {
    heroHeadline: ["Đà Lạt,", "theo cách của", "Túi Ba Gang."],
    heroDescription: ["Những khoảnh khắc chậm rãi,", "những điều vừa đủ để nhớ."],
    heroImageAlt: "Trải nghiệm Đà Lạt cùng Túi Ba Gang",
    listLabel: "NHỮNG TRẢI NGHIỆM ĐÁNG NHỚ",
    listDescription: "Những điều làm nên một Đà Lạt rất riêng tại Túi Ba Gang.",
    discoverImageAlt: "Đà Lạt sương mù nhìn từ hồ",
    discoverHeading: ["Đà Lạt", "còn rất nhiều điều", "để khám phá."],
    discoverCta: "KHÁM PHÁ ĐÀ LẠT",
    staysHeading: ["Hẹn gặp bạn", "ở Đà Lạt."],
    video: {
      label: "Xem video",
      title: "Một ngày ở Túi Ba Gang",
      unavailable: (title: string) =>
        `Video “${title}” chưa có sẵn — sẽ được cập nhật sau khi có file chính thức.`,
    },
  },

  offersPage: {
    heroTag: "ƯU ĐÃI",
    heroHeadline: ["Những điều đặc biệt,", "dành cho kỳ nghỉ của bạn."],
    heroDescription: "Khám phá những đặc quyền và trải nghiệm đang diễn ra tại Túi Ba Gang.",
    heroImageAlt: "Góc nhìn sương sớm từ ban công Túi Ba Gang",
    comingImageAlt: "Núi rừng Đà Lạt trong sương",
    comingHeading: ["Một điều đặc biệt", "đang được chuẩn bị."],
    comingDescription: "Những trải nghiệm và đặc quyền mới từ Túi Ba Gang sẽ sớm được cập nhật.",
    allOffers: "Tất cả ưu đãi",
    count: (count: number) => `${count} ưu đãi hiện có`,
    emptyTitle: "Chưa có ưu đãi phù hợp",
    emptyDescription: "Vui lòng quay lại sau hoặc chọn cơ sở khác.",
    exploreOffer: "KHÁM PHÁ ƯU ĐÃI",
  },

  contactPage: {
    label: "LIÊN HỆ",
    headline: ["Mỗi hành trình,", "một điểm chạm."],
    description:
      "Chọn nơi bạn muốn dừng chân. Chúng tôi luôn sẵn sàng đồng hành cùng kỳ nghỉ của bạn tại Đà Lạt.",
    bannerImageAlt: "Góc nghỉ ngơi tại Túi Ba Gang, cửa sổ nhìn ra núi đồi Đà Lạt trong sương",
    finalImageAlt: "Núi đồi Đà Lạt trong sương, nhìn từ Túi Ba Gang",
    finalHeadlineCity: "ĐÀ LẠT",
    offerNotice: {
      before: "Bạn quan tâm ưu đãi",
      middle: "— vui lòng liên hệ trực tiếp cơ sở",
      after: "bên dưới.",
    },
    contactProperty: (name: string) => `LIÊN HỆ ${name}`,
  },

  bookingPage: {
    heroTag: "ĐẶT PHÒNG",
    heroHeadline: ["Tìm phòng trống", "tại 3 cơ sở."],
    heroImageAlt: "Đặt phòng Túi Ba Gang",
    search: {
      location: "Địa điểm",
      allHotels: "Tất cả khách sạn",
      checkIn: "Nhận phòng",
      checkOut: "Trả phòng",
      guests: "Số khách",
      submit: "TÌM PHÒNG",
      mockNotice:
        "Đây là bản mô phỏng giao diện tìm phòng. Tính năng kiểm tra phòng trống thật sẽ được tích hợp với ezCloud ở phase sau.",
    },
    guests: {
      adults: "Người lớn",
      children: "Trẻ em",
      summary: (adults: number, children: number) => `${adults} Người lớn, ${children} Trẻ em`,
      decrease: (label: string) => `Giảm ${label}`,
      increase: (label: string) => `Tăng ${label}`,
    },
    results: {
      checking: "Đang kiểm tra phòng trống...",
      emptyTitle: "Không tìm thấy phòng trống phù hợp",
      emptyDescription: "Vui lòng thử lại với ngày khác hoặc chọn cơ sở khác.",
      label: "KẾT QUẢ TÌM KIẾM (MOCK)",
      apiNote:
        "[CHƯA XÁC NHẬN API] Kết quả thật (giá, tình trạng phòng) sẽ lấy từ ezCloud khi tích hợp — xem docs/api-integration-design.md.",
    },
  },

  roomsPage: {
    label: "PHÒNG NGHỈ",
    headline: ["Ba nơi dừng chân,", "ba sắc thái Đà Lạt."],
    description:
      "Dù là một kỳ nghỉ giữa lòng thành phố, một góc yên bình bên hồ, hay một không gian ấm áp mang dấu ấn riêng, Túi Ba Gang luôn có một nơi phù hợp dành cho bạn.",
    loading: "Đang tải danh sách phòng...",
    heroHeadline: "Phòng nghỉ",
    heroImageAlt: (fullName: string) => `Phòng nghỉ tại ${fullName}`,
    all: "Tất cả",
    filterLabel: "Lọc theo hạng phòng",
    emptyTitle: "Không có hạng phòng phù hợp",
    emptyDescription: "Vui lòng thử bộ lọc khác.",
    viewDetails: "Xem chi tiết",
    viewPhoto: (index: number) => `Xem ảnh ${index}`,
    amenities: "TIỆN NGHI",
    priceNote: "Giá phòng sẽ được hiển thị khi kiểm tra phòng trống thực tế qua ezCloud.",
    bookThisRoom: "ĐẶT PHÒNG NÀY",
  },

  libraryPage: {
    label: "THƯ VIỆN",
    headline: "Ba không gian, một tinh thần.",
    description: "Khám phá những cách khác nhau để trải nghiệm Đà Lạt cùng Túi Ba Gang.",
    viewLibrary: (name: string) => `XEM THƯ VIỆN ${name}`,
    loading: "Đang tải trang cơ sở...",
    exploreProperty: (name: string) => `KHÁM PHÁ ${name}`,
    closeUp: (title: string) => `${title} — cận cảnh`,
  },

  comingSoon: {
    heading: ["Một góc Đà Lạt khác,", "đang được chăm chút", "từng chi tiết."],
    openingBefore: "dự kiến mở cửa quý IV năm 2026. Hãy theo dõi",
    openingAfter:
      "để cập nhật những tin tức đầu tiên về không gian mới, các chương trình ưu đãi đặc biệt và cơ hội trải nghiệm đầu tay.",
    backToHome: "QUAY VỀ TRANG CHỦ",
    visitCentral: "XEM NGAY CƠ SỞ CENTRAL",
    imageAlt: (fullName: string) => `${fullName} — sẵn sàng chào đón quý IV 2026`,
  },

  notFound: {
    title: "Không tìm thấy trang này",
    description:
      "Trang bạn tìm không tồn tại hoặc đã được di chuyển. Hãy quay lại trang chủ để tiếp tục khám phá Túi Ba Gang.",
  },

  error: {
    label: "ĐÃ CÓ LỖI XẢY RA",
    title: "Rất tiếc, có lỗi ngoài ý muốn",
    description: "Vui lòng thử lại. Nếu lỗi vẫn tiếp diễn, hãy liên hệ với chúng tôi qua trang Liên hệ.",
    globalDescription: "Vui lòng tải lại trang hoặc quay lại sau ít phút.",
  },

  chat: {
    title: "Trợ lý Túi Ba Gang",
    subtitle: "Thường trả lời trong vài giây",
    panelLabel: "Chat với trợ lý Túi Ba Gang",
    open: "Chat với trợ lý ảo",
    close: "Đóng chat",
    closeShort: "Đóng",
    newConversation: "Cuộc trò chuyện mới",
    placeholder: "Nhập câu hỏi của bạn…",
    messageLabel: "Tin nhắn",
    send: "Gửi",
    welcome:
      "Xin chào! Mình là trợ lý ảo của **Túi Ba Gang**. Mình có thể giúp bạn tra cứu phòng, giá và chính sách lưu trú.",
    // Câu gợi ý gửi đi đúng ngôn ngữ đang xem — backend trả lời theo ngôn ngữ của câu hỏi.
    suggestions: [
      "Khách sạn có những loại phòng nào?",
      "Cuối tuần này còn phòng cho 2 người không?",
      "Giờ nhận và trả phòng là mấy giờ?",
      "Chính sách huỷ phòng thế nào?",
    ],
    status: {
      writing: "Đang soạn trả lời…",
      lookingUp: "Đang tra cứu…",
      tools: {
        list_room_types: "Đang xem danh sách phòng…",
        check_availability: "Đang kiểm tra phòng trống…",
      } as Record<string, string>,
    },
    errors: {
      unreachable: "Không kết nối được trợ lý ảo. Vui lòng thử lại sau hoặc liên hệ hotline/Zalo.",
      server: (status: number) => `Lỗi máy chủ (${status})`,
      connection: "Không kết nối được máy chủ.",
    },
  },

  // ---- Nội dung dữ liệu (ghép với phần không phụ thuộc ngôn ngữ trong lib/content) ----

  /** Text theo từng cơ sở — ghép vào lib/content/properties.ts theo đúng cấu trúc `Property`. */
  properties: {
    central: {
      tagline: "Sôi động giữa lòng phố",
      cardDescription: "Ở giữa Đà Lạt, gần hơn với mọi cuộc hẹn.",
      listingLine: "Ở giữa Đà Lạt, gần hơn với mọi cuộc hẹn.",
      heroSubheadline: ["Sôi động giữa", "lòng phố."],
      story: {
        heading: ["Một điểm dừng", "đầy cảm hứng."],
        paragraphs: [
          "Túi Ba Gang Central là nơi nhịp sống Đà Lạt hiện đại và sự riêng tư gặp nhau. Nằm ngay trung tâm thành phố, khách sạn mang đến một không gian lưu trú thoải mái, tinh tế và thuận tiện — để bạn dễ dàng khám phá những điều thú vị của Đà Lạt, theo cách riêng của mình.",
        ],
        ctaLabel: "TÌM HIỂU CÂU CHUYỆN",
      },
      // Cùng thứ tự với `amenities` trong lib/content/properties.ts.
      amenities: [
        {
          title: "VỊ TRÍ TRUNG TÂM",
          description: "Dễ dàng kết nối với những điểm đến và nhịp sống của Đà Lạt.",
        },
        {
          title: "ẨM THỰC TINH TẾ",
          description: "Những lựa chọn ẩm thực được chăm chút cho từng khoảnh khắc lưu trú.",
        },
        {
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
        ctaLabel: "XEM TẤT CẢ PHÒNG",
      },
      dining: {
        note: "Đà Lạt, luôn có những điều dịu dàng để ta muốn quay lại.",
        ctaLabel: "KHÁM PHÁ ẨM THỰC",
      },
      closingBanner: {
        tag: ["ĐÀ LẠT", "CENTRAL", "A DEEPER YOU"],
        ctaLabel: "ĐẶT PHÒNG NGAY",
      },
    },
    "ember-style": {
      tagline: "Ấm áp. Tinh tế. Năng lượng.",
      cardDescription: "Ấm áp. Tinh tế. Năng lượng.",
      listingLine: "Ấm áp. Tinh tế. Năng lượng.",
      heroSubheadline: ["Ấm áp.", "Tinh tế.", "Năng lượng."],
      story: {
        heading: ["Ngọn lửa của", "những hành trình đẹp hơn."],
        paragraphs: [
          "Túi Ba Gang Ember Style được tạo nên từ cảm hứng về một dải lụa đỏ – mềm mại, ấm áp và đầy sức sống. Hình ảnh dải cầu thang đỏ là biểu tượng cho những hành trình được nâng niu, nơi mỗi bước chân dẫn bạn đến những trải nghiệm tinh tế hơn, sâu sắc hơn.",
          "Tại Ember Style, chúng tôi mang đến một không gian hiện đại, sang trọng và tràn đầy năng lượng, cùng những dịch vụ và đặc quyền được thiết kế riêng cho những vị khách mong muốn nhiều hơn từ một kỳ nghỉ.",
        ],
      },
      amenities: [
        { label: "Đặc quyền lưu trú" },
        { label: "Ẩm thực tinh tế" },
        { label: "Chăm sóc cá nhân hoá" },
        { label: "Không gian riêng tư" },
        { label: "Trải nghiệm đặc biệt" },
      ],
      amenitiesSection: {
        heading: ["Nhiều hơn một kỳ nghỉ."],
      },
      roomsSection: {
        heading: "Không gian của sự tinh tế.",
        subheading:
          "Mỗi căn phòng là một khoảng lặng ấm áp, được chăm chút trong từng chi tiết, mang đến sự thoải mái và cảm giác riêng tư sang trọng.",
        ctaLabel: "XEM TẤT CẢ PHÒNG NGHỈ",
      },
      closingBanner: {
        ctaLabel: "ĐẶT PHÒNG NGAY",
      },
    },
    "little-bay": {
      cardDescription: "Bình yên bên hồ, gần gũi thiên nhiên.",
      heroSubheadline: ["Một vịnh nhỏ ở Đà Lạt", "mang dấu ấn Túi Ba Gang."],
      heroTopRightTag: ["SƯƠNG SỚM", "CÂY XANH", "NHỮNG ĐIỀU", "BÌNH YÊN"],
      moodTiles: [
        { title: "Bình Minh", description: "Khởi đầu ngày mới với năng lượng an lành." },
        { title: "Hoàng Hôn", description: "Lắng đọng cùng những chiều dịu nhẹ." },
        { title: "Ánh Trăng", description: "Thư thái trong đêm yên bình." },
      ],
      amenities: [
        { title: "KHÔNG GIAN BIỆT LẬP", description: "Ba villa riêng giữa thiên nhiên xanh mát." },
        { title: "THIÊN NHIÊN GẦN GŨI", description: "Bao quanh bởi cây xanh, không khí trong lành." },
        { title: "TRẢI NGHIỆM THƯ THÁI", description: "Không gian lý tưởng để tái tạo năng lượng." },
        { title: "DẤU ẤN TÚI BA GANG", description: "Sự chỉn chu và tinh tế trong từng chi tiết." },
      ],
      amenitiesSection: {
        heading: ["THIÊN NHIÊN,", "RIÊNG TƯ VÀ CHẬM RÃI."],
      },
      moreThanStay: {
        heading: ["Một không gian", "dành cho những ngày sống chậm lại."],
        paragraph:
          "Tại Little Bay, mỗi khoảnh khắc đều được thiết kế để bạn kết nối sâu hơn với thiên nhiên, với những người thân yêu và với chính mình.",
        linkLabel: "TÌM HIỂU THÊM",
      },
      closingBanner: {
        tag: ["ĐÀ LẠT", "A LITTLE BAY", "A DEEPER YOU"],
        ctaLabel: "ĐẶT PHÒNG NGAY",
      },
    },
  },

  /** Mô tả hạng phòng, key = `${hotel}/${slug}` (tên hạng phòng tiếng Anh dùng chung, ở lib/content/rooms.ts). */
  roomDescriptions: {
    "central/superior-room": "Phòng gọn gàng, ấm cúng, phù hợp cho chuyến đi ngắn ngày.",
    "central/deluxe-window": "Có cửa sổ lớn đón sáng, không gian thoáng đãng hơn.",
    "central/deluxe-plus": "Không gian rộng rãi hơn, tiện nghi đầy đủ.",
    "central/premier-plus": "Hạng phòng cao cấp, view thành phố.",
    "central/premier-family": "Phù hợp gia đình, không gian rộng nhất tại Central.",
    "ember-style/deluxe-room": "Ấm áp, đúng tinh thần Ember Style.",
    "ember-style/premier-room": "Không gian tinh tế hơn với góc thư giãn riêng.",
    "ember-style/family-room": "Phù hợp gia đình hoặc nhóm bạn.",
    "ember-style/suite-room": "Hạng phòng cao cấp nhất tại Ember Style.",
    "little-bay/bay-view-room": "Nhìn ra hồ nước, gần gũi thiên nhiên.",
    "little-bay/lake-view-room": "View hồ trọn vẹn, không gian yên tĩnh.",
    "little-bay/suite-room": "Hạng phòng rộng nhất tại Little Bay.",
  } as Record<string, string>,
  roomAmenities: ["Wifi tốc độ cao", "Điều hoà", "Nước uống miễn phí"],

  /** Text ưu đãi theo `slug` (tên ưu đãi tiếng Anh dùng chung, ở lib/content/offers.ts). */
  offers: {
    "stay-a-little-longer": {
      description: "Thêm một đêm để Đà Lạt chậm lại một chút.",
      benefits: ["Giảm 15% khi đặt từ 2 đêm", "Tặng bữa sáng cho 2 khách", "Miễn phí nâng hạng phòng (tùy tình trạng phòng)"],
    },
    "a-warmer-you": {
      description: "Kỳ nghỉ ấm áp hơn với những đặc quyền riêng.",
      benefits: [
        "Tặng 01 set trà chiều cho 2 khách",
        "Ưu đãi 10% dịch vụ F&B",
        "Nhận phòng sớm / Trả phòng muộn (tùy tình trạng phòng)",
      ],
    },
    "a-little-getaway": {
      description: "Tách mình khỏi phố, chạm vào thiên nhiên.",
      benefits: ["Giảm 10% khi đặt từ 2 đêm", "Tặng trải nghiệm trà & thiền sáng", "Miễn phí hoạt động ngoài trời (tùy lịch trình)"],
    },
  } as Record<string, { description: string; benefits: string[] }>,

  /** Text trải nghiệm theo `slug`. */
  experiences: {
    "mot-buoi-sang-cham": { title: "Một buổi sáng chậm", description: "Cà phê và ánh nắng đầu ngày." },
    "huong-vi-da-lat": { title: "Hương vị Đà Lạt", description: "Những nơi ngon mà chúng tôi yêu thích." },
    "nhung-goc-da-lat": { title: "Những góc Đà Lạt", description: "Một vài nơi đáng để ghé qua." },
    "o-lai-tan-huong": { title: "Ở lại tận hưởng", description: "Đôi khi kỳ nghỉ đẹp nhất là không cần đi đâu." },
  } as Record<string, { title: string; description: string }>,
};
