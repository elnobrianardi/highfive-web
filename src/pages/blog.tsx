import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import BlogMain from "@/components/containers/blog/BlogMain";

const BlogPage = () => {
  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: "Blog",
        canonicalPath: "/blog",
        description:
          "Insights, trends, and playbooks on influencer marketing, creator campaigns, and social media strategy from High Five.",
      }}
    >
      <CmnBanner title="Blog Standard" navigation="Blog Standard" />
      <BlogMain />
    </Layout>
  );
};

export default BlogPage;
