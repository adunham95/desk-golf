import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
/* eslint no-use-before-define: 0 */
import React from 'react';

interface NavLinkTypes {
    href: string,
    exact?: boolean,
    children: React.ReactNode,
    className: string,
    activeClass?: string,
    nonActiveClass?: string
}

export function NavLink({
  href, exact = true, children, className, activeClass = '', nonActiveClass = '',
}: NavLinkTypes) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      passHref
    >
      <a className={`${className} ${isActive ? activeClass : nonActiveClass}`}>
        {children}
      </a>
    </Link>
  );
}
