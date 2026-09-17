import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Button — component nguyên tử dùng lại nhiều nhất toàn site.
 * Variant theo docs/design-system.md mục 6 và docs/ui-component-spec.md mục 2.8.
 */

type Variant = "primary" | "outline" | "ghost";
type Accent = "brown" | "ember" | "littlebay";
/**
 * Size — "md" (mặc định, giữ nguyên hành vi cũ ở MỌI nơi đang dùng Button) và "sm"
 * (Phase 6.6 mục 3.2 bug fix: cỡ nhỏ hơn cho nút đặt trong không gian hẹp, vd. nút
 * "XEM THƯ VIỆN ..." đè lên ảnh nhỏ ở `PropertyOverlayCard` — nút cỡ mặc định quá to,
 * bị đè lên tag chữ góc phải khi tên cơ sở dài. Chỉ đổi kích thước, không đổi màu/hành vi).
 */
type Size = "sm" | "md";

const baseClasses =
  "inline-flex items-center gap-2 rounded-md font-medium tracking-wide transition-colors duration-200 whitespace-nowrap";

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-1.5 text-xs",
};

const accentPrimaryClasses: Record<Accent, string> = {
  brown: "bg-brown-800 text-cream-50 hover:bg-brown-900",
  ember: "bg-ember-accent text-cream-50 hover:bg-ember-dark",
  littlebay: "bg-littlebay-accent text-cream-50 hover:bg-brown-900",
};

// Dùng khi Button đặt trên nền sáng (nền mặc định của trang).
const outlineClasses: Record<Accent, string> = {
  brown: "border border-brown-800 text-brown-800 hover:bg-brown-800 hover:text-cream-50",
  ember: "border border-ember-accent text-ember-accent hover:bg-ember-accent hover:text-cream-50",
  littlebay:
    "border border-littlebay-accent text-littlebay-accent hover:bg-littlebay-accent hover:text-cream-50",
};

// Dùng khi Button đặt trên nền ảnh/nền tối (vd. trên Hero) — giữ khả năng đọc (contrast).
// Xem docs/design-system.md mục 6 — biến thể bổ sung cho nhu cầu accessibility, không có trong mockup gốc.
const outlineInverseClasses =
  "border border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-ink";

const ghostBase = "inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline";

const ghostSizeClasses: Record<Size, string> = {
  md: "text-sm",
  sm: "text-xs",
};

function classesFor(variant: Variant, accent: Accent, inverse: boolean, size: Size) {
  const sized = `${baseClasses} ${sizeClasses[size]}`;
  if (variant === "primary") {
    const solid = inverse ? "bg-cream-50 text-ink hover:bg-cream-100" : accentPrimaryClasses[accent];
    return `${sized} ${solid}`;
  }
  if (variant === "outline") {
    const outline = inverse ? outlineInverseClasses : outlineClasses[accent];
    return `${sized} bg-transparent ${outline}`;
  }
  return `${ghostBase} ${ghostSizeClasses[size]} ${inverse ? "text-cream-50" : ""}`.trim();
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface BaseButtonProps {
  children: ReactNode;
  variant?: Variant;
  accent?: Accent;
  /** true khi đặt trên nền ảnh/nền tối (vd. Hero) */
  inverse?: boolean;
  withArrow?: boolean;
  className?: string;
  /** "md" (mặc định) hoặc "sm" — xem giải thích ở type Size phía trên. */
  size?: Size;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  onClick?: () => void;
  type?: undefined;
  disabled?: undefined;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    accent = "brown",
    inverse = false,
    withArrow = true,
    className = "",
    size = "md",
  } = props;
  const classes = `${classesFor(variant, accent, inverse, size)} ${className}`.trim();

  if (props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {children}
        {withArrow && <ArrowIcon />}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
    >
      {children}
      {withArrow && <ArrowIcon />}
    </button>
  );
}
