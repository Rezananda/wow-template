import React from "react";
import Footer from "../../Components/Footer/Footer";
import Heroimage from "../../Components/Heroimage/Heroimage";
import Navbar from "../../Components/Navbar/Navbar";
import WowTemplate from "../../Components/Templates/WowTemplate";
import WowTipsnTutorial from "../../Components/Templates/WowTipsnTutorial";

const Home = () => {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <Heroimage />
      <WowTemplate />
      <WowTipsnTutorial />
      <Footer />
    </div>
  );
};

export default Home;
