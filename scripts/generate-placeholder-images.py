"""
Dev tool: sinh ảnh minh hoạ TẠM THỜI (placeholder) cho Phase 6.

Đây KHÔNG phải ảnh thật của Túi Ba Gang — chỉ là ảnh gradient + chữ để có bố cục
trực quan trong lúc chưa có ảnh chụp/render thật (xem docs/open-questions.md #22).
Giữ đúng phong cách ảnh placeholder đã dùng ở Phase 5 (public/images/hero-home.jpg,
public/images/central-card.jpg, ...) để toàn site nhất quán 1 kiểu ảnh minh hoạ.

Khi có ảnh thật: chỉ cần thay file theo đúng path, KHÔNG cần sửa component nào
(mọi component đều nhận path ảnh qua props/content, không hard-code logic theo ảnh).

Chạy: python3 scripts/generate-placeholder-images.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(OUT, exist_ok=True)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

CREAM = (233, 222, 202)
TAN = (189, 168, 139)

# Màu tint theo cơ sở — khớp accent trong tailwind.config.ts
TINTS = {
    "central": {"dark": (61, 43, 31), "darker": (26, 18, 13)},       # brown-800/900
    "ember-style": {"dark": (122, 59, 34), "darker": (22, 13, 8)},   # ember.accent/dark
    "little-bay": {"dark": (75, 93, 69), "darker": (27, 27, 20)},    # littlebay.accent-ish
    "neutral": {"dark": (61, 43, 31), "darker": (26, 18, 13)},
}


def _lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def _vgrad(w, h, top, bottom):
    im = Image.new("RGB", (w, h), top)
    px = im.load()
    for y in range(h):
        c = _lerp(top, bottom, y / max(h - 1, 1))
        for x in range(w):
            px[x, y] = c
    return im


def _font(path, size):
    return ImageFont.truetype(path, size)


def make_hero(path, title, subtitle, tint_key="neutral", w=1920, h=1080):
    """Ảnh nền tối full-bleed dùng cho Hero — giống public/images/hero-home.jpg."""
    dark = TINTS[tint_key]["dark"]
    darker = TINTS[tint_key]["darker"]
    im = _vgrad(w, h, dark, darker)
    draw = ImageDraw.Draw(im)
    title_font = _font(FONT_BOLD, int(h * 0.065))
    sub_font = _font(FONT_REG, int(h * 0.026))
    cap_font = _font(FONT_REG, int(h * 0.016))
    x = int(w * 0.05)
    y_title = int(h * 0.80)
    draw.text((x, y_title), title, font=title_font, fill=CREAM)
    draw.text((x, y_title + int(h * 0.075)), subtitle, font=sub_font, fill=(*CREAM, 255))
    draw.text(
        (x, int(h * 0.955)),
        "Ảnh minh hoạ tạm thời — chưa phải ảnh thật (placeholder)",
        font=cap_font,
        fill=(180, 168, 150),
    )
    im.save(path, quality=87)


def make_card(path, title, subtitle, tint_key="neutral", w=1200, h=900, bar_ratio=0.30):
    """Ảnh thẻ (card) cream→tối, thanh chữ đậm ở đáy — giống central-card.jpg."""
    dark = TINTS[tint_key]["dark"]
    grad_h = int(h * (1 - bar_ratio))
    im = Image.new("RGB", (w, h), CREAM)
    im.paste(_vgrad(w, grad_h, CREAM, TAN), (0, 0))
    bar = Image.new("RGB", (w, h - grad_h), dark)
    im.paste(bar, (0, grad_h))
    draw = ImageDraw.Draw(im)
    title_font = _font(FONT_BOLD, int(h * 0.06))
    sub_font = _font(FONT_REG, int(h * 0.032))
    cap_font = _font(FONT_REG, int(h * 0.02))
    x = int(w * 0.05)
    y = grad_h + int((h - grad_h) * 0.18)
    draw.text((x, y), title, font=title_font, fill=CREAM)
    draw.text((x, y + int(h * 0.08)), subtitle, font=sub_font, fill=(224, 214, 199))
    draw.text(
        (x, h - int(h * 0.06)),
        "Ảnh minh hoạ tạm thời (placeholder)",
        font=cap_font,
        fill=(190, 178, 160),
    )
    im.save(path, quality=87)


def make_photo(path, caption, tint_key="neutral", w=1200, h=1500, variant=0):
    """Ảnh 'photo' đơn giản, KHÔNG chữ tiêu đề lớn — dùng cạnh đoạn văn (Our Story, Dining...)."""
    dark = TINTS[tint_key]["dark"]
    darker = TINTS[tint_key]["darker"]
    if variant % 2 == 0:
        im = _vgrad(w, h, dark, darker)
    else:
        im = _vgrad(w, h, darker, dark)
    draw = ImageDraw.Draw(im)
    cap_font = _font(FONT_REG, int(h * 0.018))
    draw.text(
        (int(w * 0.06), int(h * 0.94)),
        caption,
        font=cap_font,
        fill=(200, 188, 170),
    )
    im.save(path, quality=87)


# ---------------------------------------------------------------------------
# 1. About (/ve-chung-toi)
make_hero(f"{OUT}/about-hero.jpg", "VỀ CHÚNG TÔI", "Một chiếc túi, một hành trình", "neutral")
make_photo(f"{OUT}/about-dalat-banner.jpg", "Đà Lạt", "neutral", w=1920, h=1000, variant=0)
make_photo(f"{OUT}/about-closing.jpg", "Túi Ba Gang", "neutral", w=1920, h=1000, variant=1)

# 2. Thư viện — hero riêng từng cơ sở + ảnh Our Story + ảnh Dining
PROPERTIES = [
    ("central", "TÚI BA GANG CENTRAL", "Sôi động giữa lòng phố"),
    ("ember-style", "TÚI BA GANG EMBER STYLE", "Ấm áp. Tinh tế. Năng lượng."),
    ("little-bay", "TÚI BA GANG LITTLE BAY", "A little bay by Túi Ba Gang"),
]
PROP_SUB = {slug: sub for slug, _title, sub in PROPERTIES}
for slug, title, sub in PROPERTIES:
    make_hero(f"{OUT}/thuvien-hero-{slug}.jpg", title, sub, slug)
    make_photo(f"{OUT}/story-{slug}.jpg", f"Our Story — {slug}", slug, variant=0)
    make_photo(f"{OUT}/dining-{slug}.jpg", f"Ẩm thực — {slug}", slug, variant=1)

# 3. Rooms — CONFIRMED theo ảnh mockup thật tab "Phòng nghỉ" do user cung cấp
# (khớp lib/content/rooms.ts — xem ghi chú M1-M3 trong file đó).
ROOMS = {
    "central": ["Superior Room", "Deluxe Window", "Deluxe Plus", "Premier Plus", "Premier Family"],
    "ember-style": ["Deluxe Room", "Premier Room", "Family Room", "Suite Room"],
    "little-bay": ["Bay View Room", "Lake View Room", "Suite Room"],
}
import re


def slugify(name):
    s = name.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


for hotel, names in ROOMS.items():
    for name in names:
        rslug = slugify(name)
        for i in range(2):
            make_card(
                f"{OUT}/room-{hotel}-{rslug}-{i + 1}.jpg",
                name,
                PROP_SUB[hotel],
                hotel,
                bar_ratio=0.26,
            )

# 4. Trải nghiệm
make_hero(f"{OUT}/trai-nghiem-hero.jpg", "TRẢI NGHIỆM", "Một ngày ở Túi Ba Gang", "neutral")
EXPERIENCES = [
    ("mot-buoi-sang-cham", "Một buổi sáng chậm"),
    ("huong-vi-da-lat", "Hương vị Đà Lạt"),
    ("nhung-goc-da-lat", "Những góc Đà Lạt"),
    ("o-lai-tan-huong", "Ở lại tận hưởng"),
]
for slug, title in EXPERIENCES:
    make_card(f"{OUT}/experience-{slug}.jpg", title, "Trải nghiệm Đà Lạt", "neutral")

# 5. Ưu đãi
OFFERS = [
    ("central", "Stay a Little Longer"),
    ("ember-style", "A Warmer You"),
    ("little-bay", "A Little Getaway"),
]
for slug, title in OFFERS:
    make_card(f"{OUT}/offer-{slug}.jpg", title, PROP_SUB[slug], slug)

# 6. Liên hệ
for slug, title, sub in PROPERTIES:
    make_photo(f"{OUT}/contact-{slug}.jpg", f"Liên hệ — {slug}", slug, w=1200, h=900, variant=0)

# 7. Đặt phòng
make_hero(f"{OUT}/dat-phong-hero.jpg", "ĐẶT PHÒNG", "Tìm phòng trống tại 3 cơ sở", "neutral")

print("Done.")
