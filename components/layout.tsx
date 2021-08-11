import Head from 'next/head';
// eslint-disable-next-line no-use-before-define
import React from 'react';
import { Banner } from './banner';
import Header from './header';
import { AuthProvider } from '../context/auth';

const metaData = {
  siteName: 'Disk Golf',
  description: 'Generated by create next app',
};

interface LayoutInterface {
  showHeader?: boolean,
  pageTitle?: string,
  children: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[]
}

const banner = {
  show: false,
  link: 'google.com',
  text: 'Some text here',
  cta: 'Learn More',
};

export const Layout = ({
  pageTitle = '', children, showHeader = true,
}:LayoutInterface) => (
  <AuthProvider>
    <Head>
      <title>{pageTitle !== '' ? `${pageTitle} | ${metaData.siteName}` : metaData.siteName}</title>
      <meta
        name="description"
        content={metaData.description}
      />
      <meta
        name="theme-color"
        content="#6dd6c2"
      />
      <link
        rel="icon"
        href="/favicon.ico"
      />
      <link
        rel="manifest"
        href="manifest.json"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Head>
    {banner.show && (
    <Banner
      text={banner.text}
      link={banner.link}
      cta={banner.cta}

    />
    )}
    {showHeader && <Header />}
    <main>
      {children}
    </main>
  </AuthProvider>
);
