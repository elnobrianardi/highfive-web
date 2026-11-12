import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import site from "@/data/site.json";

export type SeoProps = {
  /** Full page title. When omitted, the site default is used. */
  title?: string;
  /** Meta description. Falls back to the site default. */
  description?: string;
  /** Path used to build the canonical URL (e.g. "/about-us"). Defaults to the current route. */
  canonicalPath?: string;
  /** Absolute or root-relative image path for social cards. */
  image?: string;
  /** Per-page keywords; merged over site defaults. */
  keywords?: string[];
  /** Set true on 404/utility routes to keep them out of search results. */
  noindex?: boolean;
  /** Structured data (schema.org) objects rendered as JSON-LD. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const absoluteUrl = (value: string): string =>
  value.startsWith("http") ? value : `${site.url}${value}`;

const absolutePath = (path: string): string =>
  path.startsWith("http") ? path : `${site.url}${path}`;

const Seo = ({
  title,
  description,
  canonicalPath,
  image,
  keywords,
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const router = useRouter();

  const pageTitle = title ? `${title} | ${site.name}` : `${site.name} | Influencer Marketing Agency`;
  const pageDescription = description || site.description;
  const path = canonicalPath || (router.asPath === "/" ? "/" : router.asPath.split("?")[0].split("#")[0]);
  const canonical = absolutePath(path);
  const ogImage = absoluteUrl(image || site.defaultOgImage);
  const keywordList = Array.from(new Set([...(keywords || []), ...site.keywords])).join(", ");

  const jsonLdBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywordList} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      {site.twitterHandle ? (
        <meta name="twitter:site" content={site.twitterHandle} />
      ) : null}

      {jsonLdBlocks.map((block, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </Head>
  );
};

export default Seo;
