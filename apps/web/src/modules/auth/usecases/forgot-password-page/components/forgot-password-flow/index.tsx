"use client";

import { useState } from "react";

import { ResetRequestForm } from "./components/reset-request-form";
import { ResetSentPanel } from "./components/reset-sent-panel";

/** Two-step reset: request the link, then confirm it was sent. */
function ForgotPasswordFlow() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  return sentTo ? (
    <ResetSentPanel email={sentTo} />
  ) : (
    <ResetRequestForm onSent={setSentTo} />
  );
}

export { ForgotPasswordFlow };
