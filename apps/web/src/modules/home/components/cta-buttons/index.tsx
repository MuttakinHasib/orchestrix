import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

import { Button } from "@repo/ui/components/base/button";

import { ROUTES } from "@/modules/core/constants/routes";
import { env } from "@/modules/core/env";

const CTA = "h-11.5 rounded-[10px] px-5 text-[15px]";

interface CtaButtonsProps {
  /** Drops the docs button's fill, for sections where it sits on a plain band. */
  isDocsOutlined?: boolean;
}

/** The page's two calls to action: start building, or read the docs. */
export function CtaButtons({ isDocsOutlined = false }: CtaButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      <Button
        asChild
        size="xl"
        className={cn(
          CTA,
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_30px_color-mix(in_oklab,var(--primary)_40%,transparent)]",
          "motion-safe:transition-[transform,filter] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
        )}
      >
        <Link href={ROUTES.SIGN_UP}>
          Start building
          <ArrowRight aria-hidden />
        </Link>
      </Button>
      <Button
        asChild
        size="xl"
        variant="secondary"
        className={cn(CTA, "hover:border-foreground/20", {
          "bg-transparent": isDocsOutlined,
        })}
      >
        <Link href={env.docsUrl}>
          <BookOpen aria-hidden />
          Read the docs
        </Link>
      </Button>
    </div>
  );
}
