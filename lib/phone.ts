/** "0263 383 7837" → "tel:+842633837837" — số Việt Nam dạng quốc tế, gọi được cả từ nước ngoài. */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("0") ? `+84${digits.slice(1)}` : digits}`;
}
