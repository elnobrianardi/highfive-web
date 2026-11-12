import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectDetailsMain from "@/components/containers/project/ProjectDetailsMain";

const CaseStudySingle = () => {
  const router = useRouter();
  const { slug } = router.query;

  let title = "Case Study";
  if (slug && typeof slug === "string") {
    title = slug.replace(/-/g, " ").replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });
  }

  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: `${title} Case Study`,
        canonicalPath: `/case-study/${slug ?? ""}`,
        description: `Influencer marketing case study: how High Five delivered results for ${title}.`,
      }}
    >
      <CmnBanner title={title} navigation={title} parent="Case Study" parentLink="/" />
      <ProjectDetailsMain />
    </Layout>
  );
};

export default CaseStudySingle;
