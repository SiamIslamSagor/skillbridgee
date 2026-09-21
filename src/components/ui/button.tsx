"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic-button";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-foreground/15 bg-transparent text-foreground hover:bg-foreground/5",
        ghost: "text-foreground hover:bg-foreground/5",
        light: "bg-white text-dark hover:bg-white/90",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-5 text-[13px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: ReactNode;
  showArrow?: boolean;
  magnetic?: boolean;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  className,
  variant,
  size,
  showArrow = false,
  magnetic = true,
  children,
  href,
  ...props
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const classes = cn(buttonVariants({ variant, size }), className);

  const inner = href ? (
    <Link
      href={href}
      className={classes}
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {content}
    </Link>
  ) : (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );

  if (!magnetic) return inner;

  return (
    <Magnetic className="inline-flex" strength={0.25}>
      {inner}
    </Magnetic>
  );
}
