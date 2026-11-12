import React from "react";
import Layout from "@/components/layout/Layout";
import HomeOneBanner from "@/components/layout/banner/HomeOneBanner";
import Agency from "@/components/containers/home/Agency";
import AgencyRunningText from "@/components/containers/home/AgencyRunningText";
import HomeSponsor from "@/components/containers/home/HomeSponsor";
import HighFiveService from "@/components/containers/home/HighFiveService";
import HighFiveUSP from "@/components/containers/home/HighFiveUSP";
import CaseStudyHome from "@/components/containers/home/CaseStudyHome";
// import ContactInfo from "@/components/containers/home/ContactInfo";
import site from "@/data/site.json";
import caseStudies from "@/data/caseStudies.json";
import { SITE_URL, absoluteUrl } from "@/lib/siteUrl";

type CaseStudy = {
  title: string;
  description: string;
  image: string;
  logo?: string;
  metrics?: { label: string; value: string }[];
};

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

const organizationJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: absoluteUrl(site.logo),
  image: absoluteUrl(site.defaultOgImage),
  description: site.description,
  email: site.email,
  knowsAbout: site.knowsAbout,
  areaServed: {
    "@type": "Country",
    name: site.areaServed,
  },
  sameAs: site.sameAs,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.addressLocality,
    addressRegion: site.address.addressRegion,
    postalCode: site.address.postalCode,
    addressCountry: site.address.addressCountry,
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Influencers Database",
      value: site.stats.influencersDatabase,
      unitText: "influencers",
    },
    {
      "@type": "PropertyValue",
      name: "City Covered",
      value: site.stats.citiesCovered,
      unitText: "cities",
    },
    {
      "@type": "PropertyValue",
      name: "Historical Campaign",
      value: site.stats.historicalCampaigns,
      unitText: "campaigns",
    },
  ],
};

const websiteJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE_URL,
  name: site.name,
  description: site.description,
  publisher: { "@id": organizationId },
  inLanguage: "en",
};

const servicesJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  serviceType: "Influencer Marketing",
  name: "Influencer Marketing Services",
  description:
    "High Five connects brands with the right creators through influencer marketing campaigns tailored to your goals.",
  provider: { "@id": organizationId },
  areaServed: {
    "@type": "Country",
    name: site.areaServed,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Influencer Marketing Services",
    itemListElement: site.services.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  },
};

const caseStudyJsonLd = (caseStudies as CaseStudy[]).map(
  (item): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${item.title} Influencer Marketing Campaign`,
    description: item.description,
    image: absoluteUrl(item.image),
    about: { "@type": "Brand", name: item.title },
    creator: { "@id": organizationId },
    additionalProperty: (item.metrics || []).map((metric) => ({
      "@type": "PropertyValue",
      name: metric.label,
      value: metric.value,
    })),
  })
);

const homeJsonLd: Record<string, unknown>[] = [
  organizationJsonLd,
  websiteJsonLd,
  servicesJsonLd,
  ...caseStudyJsonLd,
];

const Home = () => {
  return (
    <Layout
      header={1}
      footer={1}
      seo={{
        canonicalPath: "/",
        description:
          "High Five is an influencer marketing agency helping brands grow through strategic creator campaigns, KOL partnerships, and brand placement across Indonesia.",
        jsonLd: homeJsonLd,
      }}
    >
      <HomeOneBanner />
      <Agency />
      <AgencyRunningText />
      <HomeSponsor />
      <HighFiveService />
      <HighFiveUSP />
      <CaseStudyHome />
      {/* <ContactInfo /> */}
    </Layout>
  );
};

export default Home;
