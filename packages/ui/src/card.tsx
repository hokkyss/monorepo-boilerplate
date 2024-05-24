import type { ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  href: string;
  title: string;
};

export default function Card({ children, className, href, title }: CardProps) {
  return (
    <a
      className={className}
      href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}
