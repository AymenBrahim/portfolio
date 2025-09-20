import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  RefObject,
} from "react";
import { twMerge } from "tailwind-merge";
import "./button.css";
type Variant = {
  variant?: "primary" | "secondary" | "tertiary";
};

type AnchorButtonProps = {
  type: "anchor";
  ref?: React.RefObject<HTMLAnchorElement | null>;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type RegularButtonProps = {
  type?: "button";
  ref?: React.RefObject<HTMLButtonElement | null>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = Variant & (AnchorButtonProps | RegularButtonProps);

export default function Button(props: ButtonProps) {
  const { type = "anchor", variant = "primary", ref, ...attributes } = props;

  if (type === "anchor") {
    return (
      <a
        {...(attributes as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={twMerge("button", variant, props.className)}
        ref={ref as RefObject<HTMLAnchorElement | null>}
      />
    );
  }

  return (
    <button
      {...(attributes as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={twMerge("button", variant, props.className)}
      ref={ref as RefObject<HTMLButtonElement | null>}
    />
  );
}
