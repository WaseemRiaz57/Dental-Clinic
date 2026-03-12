"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";

type DynamicLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export default function DynamicLink({ href, ...props }: DynamicLinkProps) {
  const searchParams = useSearchParams();
  const paramString = searchParams.toString();
  const separator = href.includes("?") ? "&" : "?";
  const fullHref = paramString ? `${href}${separator}${paramString}` : href;

  return <Link href={fullHref} {...props} />;
}
