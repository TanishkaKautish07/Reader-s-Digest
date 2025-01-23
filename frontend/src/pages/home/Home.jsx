import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommened from "./Recommened";
import News from "./News";
import ExploreBooks from "./ExploreBooks";

const Home = () => {
  return (
    <>
      <Banner />
      <Recommened />
      <News />
    </>
  );
};

export default Home;
