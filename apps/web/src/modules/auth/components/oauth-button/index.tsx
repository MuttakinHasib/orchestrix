"use client";

import { KeyRound } from "lucide-react";
import {
  useTransition,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";
import { toast } from "sonner";

import { GithubIcon } from "@repo/icons/github";
import { GoogleIcon } from "@repo/icons/google";
import { Button } from "@repo/ui/components/base/button";
import { Spinner } from "@repo/ui/components/base/spinner";

import { authService } from "@/modules/auth/services/auth-service";
import { OAuthProvider } from "@/modules/auth/types/auth-service";

const PROVIDER_ICON: Record<
  OAuthProvider,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  [OAuthProvider.GITHUB]: GithubIcon,
  [OAuthProvider.GOOGLE]: GoogleIcon,
  [OAuthProvider.SAML]: KeyRound,
};

interface OAuthButtonProps {
  provider: OAuthProvider;
  children: ReactNode;
}

export function OAuthButton({ provider, children }: OAuthButtonProps) {
  const [isPending, startTransition] = useTransition();
  const Icon = PROVIDER_ICON[provider];

  const handleClick = () => {
    startTransition(async () => {
      const result = await authService.startOAuth(provider);
      if (!result.ok) toast.info(result.error.message);
    });
  };

  return (
    <Button
      type="button"
      variant="secondary"
      disabled={isPending}
      aria-busy={isPending}
      onClick={handleClick}
      size="xl"
      className="w-full gap-2.5"
    >
      {isPending ? <Spinner aria-hidden /> : <Icon aria-hidden />}
      {children}
    </Button>
  );
}
