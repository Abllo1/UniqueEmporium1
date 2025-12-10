"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHelmetProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const SeoHelmet: React.FC<SeoHelmetProps> = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={ogUrl || canonicalUrl} />
      <meta property="og:type" content={ogType} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle || title} />
      <meta name="twitter:description" content={twitterDescription || description} />
    </Helmet>
  );
};

export default SeoHelmet;