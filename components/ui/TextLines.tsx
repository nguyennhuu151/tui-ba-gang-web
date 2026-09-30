/** Hiển thị mỗi phần tử của mảng chữ trên 1 dòng riêng (tiêu đề nhiều dòng, tag xếp dọc...). */
export function TextLines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </>
  );
}
