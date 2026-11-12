import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ClientFeedbackMain from "@/components/containers/ClientFeedbackMain";

const ClientFeedback = () => {
  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: "Client Feedback",
        canonicalPath: "/client-feedback",
        description:
          "Read what brands say about working with High Five on influencer marketing and creator-led campaigns.",
      }}
    >
      <CmnBanner title="Client's Feedback" navigation="Client's Feedback" />
      <ClientFeedbackMain />
    </Layout>
  );
};

export default ClientFeedback;
