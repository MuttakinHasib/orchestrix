/**
 * Slack mark, single-color. lucide-react no longer ships brand icons.
 */
function SlackIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width={16}
      height={16}
      {...props}
    >
      <path d="M5.04 15.16a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52Zm1.27 0a2.52 2.52 0 0 1 5.04 0v6.32a2.52 2.52 0 1 1-5.04 0v-6.32ZM8.83 5.04a2.52 2.52 0 1 1 2.52-2.52v2.52H8.83Zm0 1.28a2.52 2.52 0 0 1 0 5.04H2.52a2.52 2.52 0 1 1 0-5.04h6.31Zm10.13 2.52a2.52 2.52 0 1 1 2.52 2.52h-2.52V8.84Zm-1.27 0a2.52 2.52 0 0 1-5.04 0V2.52a2.52 2.52 0 1 1 5.04 0v6.32Zm-2.52 10.12a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52Zm0-1.27a2.52 2.52 0 0 1 0-5.04h6.32a2.52 2.52 0 1 1 0 5.04h-6.32Z" />
    </svg>
  );
}

export { SlackIcon };
