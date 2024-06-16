import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../Assets/Icon/Icon";
import Button from "../Button/Button";
import SearchBar from "../Input/SearchBar";
import AnimatedTextList from "../Label/AnimatedTextList";
import Label from "../Label/Label";
import Layout from "../Layout/Layout";

const Heroimage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full md:flex hidden flex-col items-center justify-center space-y-4 py-10">
        <AnimatedTextList />
        <Label type={"headline-description"} className={"text-center"}>
          Gratis dan tanpa login. Cari sekarang
        </Label>
        <SearchBar className={"mt-4"} handleClose={() => ""} />
        <Label type={"card-desc"} className={"text-center"}>
          atau
        </Label>
        <Button
          type={"fill"}
          size={"medium"}
          onClick={() => navigate("/all-template")}
          className={
            "flex items-center gap-2 hover:bg-gradient-to-r hover:from-cyan-600 hover:via-sky-600 hover:to-blue-600 hover:shadow-xl"
          }
        >
          Lihat semua template{" "}
          <Icon className={"h-5 w-5"} name={"arrowRight"} />
        </Button>
      </div>

      {/* Mobile */}
      <div className="w-full flex md:hidden flex-col items-center justify-center space-y-2 pb-10">
        {/* <AnimatedTextList />
         */}
        <Label type={"headline"} className={"text-center py-2 "}>
          Kumpulan Template Terbaik #1 di Indonesia
        </Label>
        <Label type={"headline-description"} className={"text-center !text-xl"}>
          Gratis dan tanpa login. Cari sekarang
        </Label>
        <SearchBar className={"mt-4 w-full"} handleClose={() => ""} />
        <Label type={"card-desc"} className={"text-center"}>
          atau
        </Label>
        <Button
          type={"fill"}
          size={"medium"}
          onClick={() => navigate("/all-template")}
          className={
            "flex items-center gap-2 hover:bg-gradient-to-r hover:from-cyan-600 hover:via-sky-600 hover:to-blue-600 hover:shadow-xl"
          }
        >
          Lihat semua template{" "}
          <Icon className={"h-5 w-5"} name={"arrowRight"} />
        </Button>
      </div>
    </Layout>
  );
};

export default Heroimage;
