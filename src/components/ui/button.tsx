"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic-button";

const buttonVariants = cva(
  "group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_var(--primary)] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_28px_-12px_var(--primary)]",
        secondary:
          "border border-primary/15 bg-primary/8 text-foreground hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/12 hover:shadow-[0_8px_20px_-14px_var(--primary)]",
        outline:
          "border border-foreground/15 bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
        ghost: "text-foreground hover:bg-foreground/5 hover:text-primary",
        dark: "bg-dark text-white shadow-[0_8px_24px_-12px_rgba(11,18,32,0.6)] hover:-translate-y-0.5 hover:bg-dark-elevated hover:shadow-[0_12px_28px_-12px_rgba(11,18,32,0.75)]",
        light:
          "bg-white text-dark shadow-[0_8px_24px_-12px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 hover:bg-white/90",
        arrow:
          "border border-foreground/15 bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
        navigation:
          "min-h-9 rounded-lg px-2 text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
      },
      size: {
        xs: "min-h-8 px-3 text-xs",
        sm: "min-h-10 px-4 text-[13px]",
        md: "min-h-11 px-5",
        lg: "min-h-14 px-7 text-base",
        xl: "min-h-16 px-8 text-base",
        icon: "size-11 min-h-11 shrink-0 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconOnly?: boolean;
  showArrow?: boolean;
  magnetic?: boolean;
  loading?: boolean;
  disabled?: boolean;
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
  magnetic = false,
  loading = false,
  icon,
  iconOnly = false,
  children,
  href,
  disabled,
  ...props
}: ButtonProps) {
  const hasArrow = showArrow || variant === "arrow";
  const content = (
    <>
      <span className={loading ? "opacity-0" : undefined}>{children}</span>
      {icon ? (
        <span className={loading ? "opacity-0" : undefined}>{icon}</span>
      ) : null}
      {hasArrow ? (
        <ArrowRight
          className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
      {loading ? (
        <LoaderCircle
          className="absolute size-4 animate-spin"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const classes = cn(
    buttonVariants({ variant, size: iconOnly ? "icon" : size }),
    className,
  );

  const inner = href ? (
    <Link
      href={href}
      className={classes}
      {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      aria-disabled={disabled || loading ? true : undefined}
      aria-busy={loading || undefined}
      tabIndex={disabled || loading ? -1 : undefined}
      onClick={
        disabled || loading
          ? event => event.preventDefault()
          : (props as AnchorHTMLAttributes<HTMLAnchorElement>).onClick
      }
    >
      {content}
    </Link>
  ) : (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );

  if (!magnetic) return inner;

  return <Magnetic className="inline-flex">{inner}</Magnetic>;
}

type IconButtonProps = CommonProps &
  (
    | (Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
        href?: undefined;
      })
    | (Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
        href: string;
      })
  ) & {
    "aria-label": string;
  };

export function IconButton({ children, ...props }: IconButtonProps) {
  return (
    <Button {...props} iconOnly aria-label={props["aria-label"]}>
      {children}
    </Button>
  );
}
