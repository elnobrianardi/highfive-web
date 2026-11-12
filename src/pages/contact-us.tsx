import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ContactMain from "@/components/containers/ContactMain";

const ContactUs = () => {
  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: "Contact Us",
        canonicalPath: "/contact-us",
        description:
          "Get in touch with High Five to plan your next influencer marketing campaign. Email hello@highfive.co.id.",
      }}
    >
      <CmnBanner title="Contact Us" navigation="Contact Us" />
      <ContactMain />
    </Layout>
  );
};

export default ContactUs;
