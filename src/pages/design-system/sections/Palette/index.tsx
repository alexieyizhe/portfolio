import React from "react";

import copy from "~assets/copy.json";

import ElementGroup from "../../components/ElementGroup";
import PaletteSquare from "./PaletteSquare";

const PaletteSection = () => (
  <ElementGroup
    title={copy.designSystemSection.sections.palette.title}
    desc={copy.designSystemSection.sections.palette.desc}
  >
    <PaletteSquare color="black" />
    <PaletteSquare color="greyDark" />
    <PaletteSquare color="greyMedium" />
    <PaletteSquare color="greyLight" />
    <PaletteSquare color="white" />
  </ElementGroup>
);

export default PaletteSection;
