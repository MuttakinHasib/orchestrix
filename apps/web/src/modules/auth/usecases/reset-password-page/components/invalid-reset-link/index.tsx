import Link from "next/link";

import { Button } from "@repo/ui/components/base/button";

import { AuthHeading } from "@/modules/auth/components/auth-heading";
import { ROUTES } from "@/modules/core/constants/routes";

export function InvalidResetLink() {
  return (
    <>
      <AuthHeading
        title="This reset link isn’t valid"
        description="It may have expired or already been used. Request a new one to set your password."
      />
      <Button asChild className="h-10 w-full rounded-[8px] text-[13.5px]">
        <Link href={ROUTES.FORGOT_PASSWORD}>Request a new link</Link>
      </Button>
    </>
  );
}
