"use client";

import { toast } from "sonner";

import { Button } from "@/components/base/button";
import { AUTH_UNAVAILABLE_MESSAGE } from "@/modules/auth/utils/simulate-request";

function OauthButton({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      className="h-10 w-full gap-2.5 text-sm [&_svg:not([class*='size-'])]:size-4"
      onClick={() => toast.info(AUTH_UNAVAILABLE_MESSAGE)}
    >
      {icon}
      {children}
    </Button>
  );
}

export { OauthButton };
