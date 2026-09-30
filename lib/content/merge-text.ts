/** Mọi field (kể cả lồng nhau) đều tuỳ chọn — dùng cho phần dữ liệu gốc chưa ghép text. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Ghép text theo ngôn ngữ (từ dictionary) vào dữ liệu gốc không phụ thuộc ngôn ngữ.
 * - Object: ghép đệ quy từng field.
 * - Mảng object (vd. `amenities`: gốc có `icon`, dictionary có `title`): ghép theo thứ tự phần tử.
 * - Còn lại (chuỗi, mảng chuỗi): giá trị trong dictionary được dùng.
 */
export function mergeText<T>(base: unknown, text: unknown): T {
  if (text === undefined) return base as T;
  if (Array.isArray(base) && Array.isArray(text) && base.every(isPlainObject)) {
    return base.map((item, index) => mergeText(item, text[index])) as T;
  }
  if (isPlainObject(base) && isPlainObject(text)) {
    const merged: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(text)) merged[key] = mergeText(base[key], value);
    return merged as T;
  }
  return text as T;
}
