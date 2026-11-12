import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import HomeTwoAward from "@/components/containers/home-two/HomeTwoAward";
import OurMission from "@/components/containers/OurMission";
import WorkStepsProject from "@/components/containers/project/WorkStepsProject";
import OurAchievement from "@/components/containers/OurAchievement";

const OurStory = () => {
  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: "Our Story",
        canonicalPath: "/our-story",
        description:
          "The story behind High Five: how we built an influencer marketing agency driven by creators, culture, and measurable brand growth.",
      }}
    >
      <CmnBanner title="Our Story" navigation="Our Story" />
      <HomeTwoAward />
      <OurMission />
      <WorkStepsProject />
      <OurAchievement />
    </Layout>
  );
};

export default OurStory;
