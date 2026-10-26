import React from "react";
import Layout from "@/components/layout/Layout";
import HomeOneBanner from "@/components/layout/banner/HomeOneBanner";
import Agency from "@/components/containers/home/Agency";
import AgencyRunningText from "@/components/containers/home/AgencyRunningText";
import HomeSponsor from "@/components/containers/home/HomeSponsor";
import HighFiveService from "@/components/containers/home/HighFiveService";
import HighFiveUSP from "@/components/containers/home/HighFiveUSP";
import CaseStudyHome from "@/components/containers/home/CaseStudyHome";
import ContactInfo from "@/components/containers/home/ContactInfo";

const Home = () => {
  return (
    <Layout header={1} footer={1}>
      <HomeOneBanner />
      <Agency />
      <AgencyRunningText />
      <HomeSponsor />
      <HighFiveService />
      <HighFiveUSP />
      <CaseStudyHome />
      <ContactInfo />
    </Layout>
  );
};

export default Home;
