import { FileText } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  XIcon,
  TikTokIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import type { Platform } from "@/lib/content";

type IconType = ComponentType<SVGProps<SVGSVGElement>> | ComponentType<{ className?: string }>;

export const platformMeta: Record<Platform, { label: string; Icon: IconType }> = {
  x: { label: "X", Icon: XIcon },
  tiktok: { label: "TikTok", Icon: TikTokIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  youtube: { label: "YouTube", Icon: YouTubeIcon },
  blog: { label: "Blog", Icon: FileText },
};

export function PlatformBadge({
  platform,
  className = "",
}: {
  platform: Platform;
  className?: string;
}) {
  const meta = platformMeta[platform] ?? platformMeta.blog;
  const Icon = meta.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-content backdrop-blur-sm ${className}`}
    >
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}
