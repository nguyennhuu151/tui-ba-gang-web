/**
 * EmptyState — trạng thái rỗng dùng chung (vd. lọc Ưu đãi/Phòng nghỉ không có kết quả).
 */
export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-cream-200 px-6 py-16 text-center">
      <p className="font-heading text-lg text-ink">{title}</p>
      {description && <p className="max-w-sm text-sm text-brown-600">{description}</p>}
    </div>
  );
}
