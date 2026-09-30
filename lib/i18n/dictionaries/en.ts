import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * TOÀN BỘ text tiếng Anh của website — cùng cấu trúc với `vi.ts` (kiểu `Dictionary`
 * bắt buộc đủ key). Bản dịch do dev soạn, cần chủ đầu tư/bên nội dung duyệt.
 */
export const en: Dictionary = {
  meta: {
    site: {
      title: "Túi Ba Gang | Three spaces, one spirit",
      description:
        "Túi Ba Gang – a Da Lat hospitality brand with 3 distinct spaces: Central, Ember Style and Little Bay.",
    },
    about: {
      title: "About us | Túi Ba Gang",
      description:
        "The Túi Ba Gang story — 3 distinct places to stay in Da Lat: Central, Ember Style, Little Bay.",
    },
    experiences: {
      title: "Experiences | Túi Ba Gang",
      description: "Experience Da Lat the Túi Ba Gang way.",
    },
    offers: {
      title: "Offers | Túi Ba Gang",
      description: "Current offers at Central, Ember Style and Little Bay.",
    },
    contact: {
      title: "Contact | Túi Ba Gang",
      description: "Contact details (hotline, email) for Central, Ember Style and Little Bay.",
    },
    booking: {
      title: "Book a room | Túi Ba Gang",
      description: "Find and book a room at Central, Ember Style, Little Bay.",
    },
    rooms: {
      title: "Rooms | Túi Ba Gang",
      description:
        "Choose one of the 3 Túi Ba Gang properties to see its room types: Central, Ember Style, Little Bay.",
    },
    library: {
      title: "Library | Túi Ba Gang",
      description: "Explore each Túi Ba Gang property in full: Central, Ember Style, Little Bay.",
    },
    propertyRoomsTitle: (shortName) => `Rooms at ${shortName} | Túi Ba Gang`,
    propertyRoomsDescription: (fullName) => `Room types at ${fullName}.`,
  },

  common: {
    home: "Home",
    dalatVietnam: "DA LAT, VIETNAM",
    threeSpaces: "Three spaces, one spirit.",
    mistyDalat: "Misty Da Lat",
    bookNow: "BOOK NOW",
    viewRooms: "VIEW ROOMS",
    explore: "EXPLORE",
    backToHome: "Back to homepage",
    tryAgain: "Try again",
    loading: "Loading...",
    imageComingSoon: "Image coming soon",
    logoLabel: "Túi Ba Gang homepage",
    guests: (count) => `${count} ${count === 1 ? "guest" : "guests"}`,
    exploreProperty: (shortName) => `Explore ${shortName}`,
  },

  nav: {
    about: "About us",
    rooms: "Rooms",
    experiences: "Experiences",
    library: "Library",
    offers: "Offers",
    contact: "Contact",
    booking: "Booking",
    mainMenu: "Main menu",
    mainMenuMobile: "Main menu (mobile)",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToLibrary: "Back to the Library",
  },

  language: {
    label: "Language",
    choose: "Choose language",
  },

  footer: {
    location: "DA LAT, VIETNAM",
    instagram: "Túi Ba Gang on Instagram",
    facebook: "Túi Ba Gang on Facebook",
  },

  contactWidget: {
    zalo: "Chat with Túi Ba Gang on Zalo",
    callHotline: (hotline) => `Call hotline ${hotline}`,
  },

  home: {
    heroImageAlt: "Túi Ba Gang in Da Lat, Vietnam",
    hero: {
      locationTag: "DA LAT, VIETNAM",
      headline: ["Three spaces,", "one spirit."],
      description: "Discover different ways to experience Da Lat with Túi Ba Gang.",
      ctaLabel: "EXPLORE NOW",
    },
    brandIntro: {
      headline: ["In the heart of Da Lat,", "an experience of its own."],
      description:
        "Túi Ba Gang is where local charm meets a modern spirit, bringing you moments of calm in the heart of the misty city.",
      ctaLabel: "OUR STORY",
    },
    bannerQuote: "Some journeys are not just about arriving, but about coming back to yourself.",
  },

  about: {
    heroTag: "OUR STORY",
    heroDescription: ["Carry what feels familiar.", "Keep what is worth remembering."],
    heroImageAlt: "A Túi Ba Gang space overlooking Da Lat",
    storyHeading: ["One bag,", "one journey,", "and the things that stay."],
    storyParagraphs: [
      "Túi Ba Gang began with a familiar image from traditional Vietnamese life — a small bag that travelled with people on long journeys, holding what was essential and dear to them.",
      "From that image, we found a way to talk about a place to stay: a space that is just enough, cared for just enough, so every journey feels more complete.",
      "Túi Ba Gang was created in Da Lat with deep respect for architecture, materials, nature and each guest's private time.",
      "Each place has its own character. Yet all share one spirit — understated refinement, care shown in every detail, and a feeling of ease when you stay.",
      "Because sometimes, the most memorable parts of a journey are the smallest things.",
    ],
    storyImageAlt: 'A Túi Ba Gang fabric bag and a "The Journey Stays With You" notebook',
    pineImageAlt: "Dew on pine needles in Da Lat",
    valleyImageAlt: "A misty Da Lat valley seen from afar",
    dalatNote: ["Da Lat,", "Always something gentle", "That brings us back."],
    spiritDescription:
      "Each place captures a different side of Da Lat, yet all aim for the same thing: to let you feel more from your journey.",
    closingLines: ["Carry what feels familiar.", "Keep what is worth remembering."],
  },

  experiencesPage: {
    heroHeadline: ["Da Lat,", "the Túi Ba Gang", "way."],
    heroDescription: ["Slow moments,", "just enough to remember."],
    heroImageAlt: "Experiencing Da Lat with Túi Ba Gang",
    listLabel: "MEMORABLE EXPERIENCES",
    listDescription: "The little things that make Da Lat truly special at Túi Ba Gang.",
    discoverImageAlt: "Misty Da Lat seen from the lake",
    discoverHeading: ["Da Lat", "has so much more", "to discover."],
    discoverCta: "EXPLORE DA LAT",
    staysHeading: ["See you", "in Da Lat."],
    video: {
      label: "Watch video",
      title: "A day at Túi Ba Gang",
      unavailable: (title) => `The video “${title}” is not available yet — it will be added once the official file is ready.`,
    },
  },

  offersPage: {
    heroTag: "OFFERS",
    heroHeadline: ["Something special,", "for your stay."],
    heroDescription: "Discover the privileges and experiences currently on offer at Túi Ba Gang.",
    heroImageAlt: "Morning mist seen from a Túi Ba Gang balcony",
    comingImageAlt: "Da Lat forests and mountains in the mist",
    comingHeading: ["Something special", "is on its way."],
    comingDescription: "New experiences and privileges from Túi Ba Gang are coming soon.",
    allOffers: "All offers",
    count: (count) => `${count} ${count === 1 ? "offer available" : "offers available"}`,
    emptyTitle: "No matching offers yet",
    emptyDescription: "Please check back later or choose another property.",
    exploreOffer: "EXPLORE OFFER",
  },

  contactPage: {
    label: "CONTACT",
    headline: ["Every journey,", "a point of connection."],
    description: "Choose where you would like to stay. We are always here to accompany your holiday in Da Lat.",
    bannerImageAlt: "A resting corner at Túi Ba Gang, with a window onto Da Lat's misty hills",
    finalImageAlt: "Da Lat's misty hills seen from Túi Ba Gang",
    finalHeadlineCity: "DA LAT",
    offerNotice: {
      before: "You are interested in the offer",
      middle: "— please contact",
      after: "directly below.",
    },
    contactProperty: (name) => `CONTACT ${name}`,
  },

  bookingPage: {
    heroTag: "BOOKING",
    heroHeadline: ["Find available rooms", "across 3 properties."],
    heroImageAlt: "Book a room at Túi Ba Gang",
    search: {
      location: "Location",
      allHotels: "All hotels",
      checkIn: "Check-in",
      checkOut: "Check-out",
      guests: "Guests",
      submit: "SEARCH",
      mockNotice:
        "This is a preview of the room search. Real-time availability will be connected to ezCloud in a later phase.",
    },
    guests: {
      adults: "Adults",
      children: "Children",
      summary: (adults, children) =>
        `${adults} ${adults === 1 ? "Adult" : "Adults"}, ${children} ${children === 1 ? "Child" : "Children"}`,
      decrease: (label) => `Decrease ${label}`,
      increase: (label) => `Increase ${label}`,
    },
    results: {
      checking: "Checking availability...",
      emptyTitle: "No matching rooms available",
      emptyDescription: "Please try different dates or another property.",
      label: "SEARCH RESULTS (MOCK)",
      apiNote:
        "[API NOT YET CONFIRMED] Real results (rates, availability) will come from ezCloud once integrated — see docs/api-integration-design.md.",
    },
  },

  roomsPage: {
    label: "ROOMS",
    headline: ["Three places to stay,", "three shades of Da Lat."],
    description:
      "Whether it is a stay in the heart of the city, a peaceful corner by the lake, or a warm space with its own character, Túi Ba Gang always has the right place for you.",
    loading: "Loading rooms...",
    heroHeadline: "Rooms",
    heroImageAlt: (fullName) => `Rooms at ${fullName}`,
    all: "All",
    filterLabel: "Filter by room type",
    emptyTitle: "No matching room types",
    emptyDescription: "Please try another filter.",
    viewDetails: "View details",
    viewPhoto: (index) => `View photo ${index}`,
    amenities: "AMENITIES",
    priceNote: "Room rates will be shown when checking real-time availability via ezCloud.",
    bookThisRoom: "BOOK THIS ROOM",
  },

  libraryPage: {
    label: "LIBRARY",
    headline: "Three spaces, one spirit.",
    description: "Discover different ways to experience Da Lat with Túi Ba Gang.",
    viewLibrary: (name) => `EXPLORE ${name}`,
    loading: "Loading property...",
    exploreProperty: (name) => `EXPLORE ${name}`,
    closeUp: (title) => `${title} — close-up`,
  },

  comingSoon: {
    heading: ["Another corner of Da Lat,", "being crafted", "in every detail."],
    openingBefore: "is expected to open in Q4 2026. Follow",
    openingAfter: "to be the first to hear about the new space, special offers and early-access experiences.",
    backToHome: "BACK TO HOMEPAGE",
    visitCentral: "VISIT CENTRAL NOW",
    imageAlt: (fullName) => `${fullName} — opening Q4 2026`,
  },

  notFound: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or has been moved. Head back to the homepage to keep exploring Túi Ba Gang.",
  },

  error: {
    label: "SOMETHING WENT WRONG",
    title: "Sorry, something unexpected happened",
    description: "Please try again. If the problem persists, get in touch with us via the Contact page.",
    globalDescription: "Please reload the page or come back in a few minutes.",
  },

  chat: {
    title: "Túi Ba Gang Assistant",
    subtitle: "Usually replies in seconds",
    panelLabel: "Chat with the Túi Ba Gang assistant",
    open: "Chat with our virtual assistant",
    close: "Close chat",
    closeShort: "Close",
    newConversation: "New conversation",
    placeholder: "Type your question…",
    messageLabel: "Message",
    send: "Send",
    welcome:
      "Hello! I'm the virtual assistant of **Túi Ba Gang**. I can help you look up rooms, rates and stay policies.",
    suggestions: [
      "What room types do you have?",
      "Is there a room for 2 this weekend?",
      "What are the check-in and check-out times?",
      "What is the cancellation policy?",
    ],
    status: {
      writing: "Writing a reply…",
      lookingUp: "Looking it up…",
      tools: {
        list_room_types: "Looking up room types…",
        check_availability: "Checking availability…",
      },
    },
    errors: {
      unreachable: "Could not reach the virtual assistant. Please try again later or contact us via hotline/Zalo.",
      server: (status) => `Server error (${status})`,
      connection: "Could not connect to the server.",
    },
  },

  properties: {
    central: {
      tagline: "Vibrant in the heart of the city",
      cardDescription: "In the heart of Da Lat, closer to every plan.",
      listingLine: "In the heart of Da Lat, closer to every plan.",
      heroSubheadline: ["Vibrant in the", "heart of the city."],
      story: {
        heading: ["An inspiring", "place to pause."],
        paragraphs: [
          "Túi Ba Gang Central is where the modern rhythm of Da Lat meets privacy. Set right in the city centre, the hotel offers a comfortable, refined and convenient stay — so you can easily discover the best of Da Lat, in your own way.",
        ],
        ctaLabel: "DISCOVER OUR STORY",
      },
      amenities: [
        { title: "CENTRAL LOCATION", description: "Easy access to Da Lat's destinations and its everyday rhythm." },
        { title: "REFINED DINING", description: "Thoughtfully prepared dining for every moment of your stay." },
        { title: "COMFORTABLE ROOMS", description: "Comfortable, well-kept rooms made for your days in Da Lat." },
      ],
      amenitiesSection: {
        label: "AMENITIES",
        heading: ["Everything you need for a complete stay."],
      },
      roomsSection: {
        label: "ROOMS",
        ctaLabel: "VIEW ALL ROOMS",
      },
      dining: {
        note: "Da Lat, always with something gentle that brings us back.",
        ctaLabel: "EXPLORE DINING",
      },
      closingBanner: {
        tag: ["DA LAT", "CENTRAL", "A DEEPER YOU"],
        ctaLabel: "BOOK NOW",
      },
    },
    "ember-style": {
      tagline: "Warm. Refined. Energising.",
      cardDescription: "Warm. Refined. Energising.",
      listingLine: "Warm. Refined. Energising.",
      heroSubheadline: ["Warm.", "Refined.", "Energising."],
      story: {
        heading: ["The flame behind", "more beautiful journeys."],
        paragraphs: [
          "Túi Ba Gang Ember Style was inspired by a ribbon of red silk – soft, warm and full of life. The red staircase is a symbol of cherished journeys, where every step leads you to more refined, more meaningful experiences.",
          "At Ember Style, we offer a modern, elegant and energising space, with services and privileges designed especially for guests who want more from their stay.",
        ],
      },
      amenities: [
        { label: "Exclusive privileges" },
        { label: "Refined dining" },
        { label: "Personalised care" },
        { label: "Private spaces" },
        { label: "Special experiences" },
      ],
      amenitiesSection: {
        heading: ["More than a stay."],
      },
      roomsSection: {
        heading: "Spaces of quiet refinement.",
        subheading:
          "Each room is a warm moment of stillness, cared for in every detail, bringing comfort and a sense of luxurious privacy.",
        ctaLabel: "VIEW ALL ROOMS",
      },
      closingBanner: {
        ctaLabel: "BOOK NOW",
      },
    },
    "little-bay": {
      cardDescription: "Peaceful by the lake, close to nature.",
      heroSubheadline: ["A little bay in Da Lat", "with the Túi Ba Gang touch."],
      heroTopRightTag: ["MORNING MIST", "GREENERY", "MOMENTS", "OF PEACE"],
      moodTiles: [
        { title: "Sunrise", description: "Begin the day with calm, gentle energy." },
        { title: "Sunset", description: "Slow down with soft, quiet evenings." },
        { title: "Moonlight", description: "Unwind in the peaceful night." },
      ],
      amenities: [
        { title: "SECLUDED SPACES", description: "Three private villas amid lush greenery." },
        { title: "CLOSE TO NATURE", description: "Surrounded by trees and fresh mountain air." },
        { title: "RELAXING EXPERIENCES", description: "An ideal place to recharge." },
        { title: "THE TÚI BA GANG TOUCH", description: "Care and refinement in every detail." },
      ],
      amenitiesSection: {
        heading: ["NATURE,", "PRIVACY AND A SLOWER PACE."],
      },
      moreThanStay: {
        heading: ["A space", "for slower days."],
        paragraph:
          "At Little Bay, every moment is designed to help you connect more deeply with nature, with your loved ones and with yourself.",
        linkLabel: "LEARN MORE",
      },
      closingBanner: {
        tag: ["DA LAT", "A LITTLE BAY", "A DEEPER YOU"],
        ctaLabel: "BOOK NOW",
      },
    },
  },

  roomDescriptions: {
    "central/superior-room": "A neat, cosy room, ideal for short trips.",
    "central/deluxe-window": "A large window lets in natural light for a brighter, airier space.",
    "central/deluxe-plus": "A more spacious room with full amenities.",
    "central/premier-plus": "A premium room with city views.",
    "central/premier-family": "Made for families — the most spacious room at Central.",
    "ember-style/deluxe-room": "Warm and true to the spirit of Ember Style.",
    "ember-style/premier-room": "A more refined space with its own relaxation corner.",
    "ember-style/family-room": "Ideal for families or groups of friends.",
    "ember-style/suite-room": "The most premium room at Ember Style.",
    "little-bay/bay-view-room": "Overlooking the lake, close to nature.",
    "little-bay/lake-view-room": "Full lake views in a quiet setting.",
    "little-bay/suite-room": "The most spacious room at Little Bay.",
  },
  roomAmenities: ["High-speed Wi-Fi", "Air conditioning", "Complimentary drinking water"],

  offers: {
    "stay-a-little-longer": {
      description: "One more night to let Da Lat slow down a little.",
      benefits: [
        "15% off stays of 2 nights or more",
        "Complimentary breakfast for 2 guests",
        "Free room upgrade (subject to availability)",
      ],
    },
    "a-warmer-you": {
      description: "A warmer stay with exclusive privileges.",
      benefits: [
        "Complimentary afternoon tea set for 2 guests",
        "10% off food & beverage",
        "Early check-in / Late check-out (subject to availability)",
      ],
    },
    "a-little-getaway": {
      description: "Step away from the city and into nature.",
      benefits: [
        "10% off stays of 2 nights or more",
        "Complimentary morning tea & meditation",
        "Free outdoor activities (subject to schedule)",
      ],
    },
  },

  experiences: {
    "mot-buoi-sang-cham": { title: "A slow morning", description: "Coffee and the first light of the day." },
    "huong-vi-da-lat": { title: "Tastes of Da Lat", description: "The places to eat that we love." },
    "nhung-goc-da-lat": { title: "Corners of Da Lat", description: "A few places worth stopping by." },
    "o-lai-tan-huong": { title: "Stay and unwind", description: "Sometimes the best holiday is going nowhere at all." },
  },
};
