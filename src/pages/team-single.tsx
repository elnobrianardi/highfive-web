import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import TeamDetailsMain from "@/components/containers/TeamDetailsMain";
import CtaTwo from "@/components/containers/service-details/CtaTwo";

const TeamDetails = () => {
  return (
    <Layout
      header={2}
      footer={5}
      video={0}
      seo={{
        title: "Team Member",
        canonicalPath: "/team-single",
        description:
          "Profile of a High Five team member working on influencer marketing and creator campaigns.",
      }}
    >
      <CmnBanner
        title="SANA P. LESH"
        navigation="Team Details"
        parent="Our Teams"
        parentLink="our-teams"
      />
      <TeamDetailsMain />
      <CtaTwo />
    </Layout>
  );
};

export default TeamDetails;
