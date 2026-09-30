import { ChatWidget } from "@/components/chat/ChatWidget";
import { chatbotApiUrl } from "@/lib/site";
import { getI18n } from "@/lib/i18n/server";
import { brandContact } from "@/lib/content/properties";
import { telHref } from "@/lib/phone";

/**
 * StickyContactWidget — nút nổi Chat trợ lý ảo + Zalo + gọi điện, góc màn hình.
 * Nút Chat chỉ hiện khi đã cấu hình backend chatbot (xem `chatbotApiUrl` trong lib/site.ts).
 * Xem docs/component-inventory.md và docs/user-flows.md (Flow G).
 *
 * MOCK / PLACEHOLDER cho Phase 5:
 * - Link Zalo và số điện thoại dùng `brandContact` (hotline CONFIRMED của Central,
 *   xem lib/content/properties.ts) vì nút này đại diện chung cho cả thương hiệu.
 * - Đây KHÔNG PHẢI tích hợp Zalo OA API — chỉ là deep-link mở Zalo, đúng phạm vi
 *   đã CONFIRMED (xem docs/api-integration-design.md mục 3). Không implement Zalo API thật.
 */
const HOTLINE = brandContact.hotline;
const HOTLINE_TEL = telHref(HOTLINE);
// Số Zalo thật / OA ID chính thức chưa được cung cấp — đọc từ NEXT_PUBLIC_ZALO_LINK_CENTRAL
// (xem .env.example), chưa cấu hình thì dùng link tạm trỏ theo số hotline.
const ZALO_LINK = process.env.NEXT_PUBLIC_ZALO_LINK_CENTRAL || `https://zalo.me/${HOTLINE_TEL.slice("tel:".length)}`;

export async function StickyContactWidget() {
  const { dict } = await getI18n();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {chatbotApiUrl && <ChatWidget />}
      <a
        href={ZALO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.contactWidget.zalo}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-105"
      >
        <span className="text-xs font-bold">Zalo</span>
      </a>
      <a
        href={HOTLINE_TEL}
        aria-label={dict.contactWidget.callHotline(HOTLINE)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brown-800 text-cream-50 shadow-lg transition-transform hover:scale-105"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 3h3l1.5 4L6.5 8.5a10 10 0 0 0 5 5L13 11.5l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C9.4 17.1 2.9 10.6 2.5 4.6A1.5 1.5 0 0 1 4 3Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
