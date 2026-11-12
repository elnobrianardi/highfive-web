import type { GetServerSideProps } from "next";

import { SITE_URL, IS_PREVIEW_DEPLOYMENT } from "@/lib/siteUrl";

const buildRobots = (): string => {
  // Staging/preview deployments must never be crawled or indexed.
  if (IS_PREVIEW_DEPLOYMENT) {
    return `User-agent: *\nDisallow: /`;
  }

  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
};

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.write(buildRobots());
  res.end();

  return { props: {} };
};

export default Robots;
