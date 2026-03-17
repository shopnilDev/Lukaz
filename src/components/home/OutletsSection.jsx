import { getOutlets } from "@/utils/actions";
import React from "react";
import OutletsSectionClient from "./OutletsSectionClient";

const OutletsSection = async () => {
  const outlets = await getOutlets();

  return <OutletsSectionClient outlets={outlets?.data} />;
};

export default OutletsSection;
