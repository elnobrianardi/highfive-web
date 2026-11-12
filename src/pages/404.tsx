import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ErrorMain from "@/components/containers/ErrorMain";

const ErrorPage = () => {
  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: "Page Not Found",
        description: "The page you are looking for could not be found.",
        noindex: true,
      }}
    >
      <CmnBanner title="Error" navigation="Error" />
      <ErrorMain />
    </Layout>
  );
};

export default ErrorPage;
