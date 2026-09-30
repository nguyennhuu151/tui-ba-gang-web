"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/client";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { dict } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="section-label">{dict.error.label}</p>
      <h1 className="font-heading text-3xl text-ink md:text-4xl">
        {dict.error.title}
      </h1>
      <p className="max-w-sm text-sm text-brown-600">
        {dict.error.description}
      </p>
      <div className="mt-2 flex gap-4">
        <Button onClick={() => retry()}>{dict.common.tryAgain}</Button>
        <Button href="/" variant="outline">
          {dict.common.backToHome}
        </Button>
      </div>
    </Container>
  );
}
