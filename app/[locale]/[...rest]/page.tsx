import { notFound } from "next/navigation";

/**
 * Bắt mọi URL không khớp route nào bên trong `/vi/...`, `/en/...` để hiển thị trang 404
 * của site (app/[locale]/not-found.tsx, có Header/Footer và đúng ngôn ngữ) thay cho trang
 * 404 mặc định của Next.js.
 */
export default function CatchAllPage() {
  notFound();
}
