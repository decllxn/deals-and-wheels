// components/FilterComponents/VehicleAttributes.tsx

import React from "react";
import { View } from "react-native";

import MakeSelector from "@/components/FilterComponents/MakeSelector";
import ModelYearSelector from "@/components/FilterComponents/ModelYearSelector";
import TransmissionSelector from "@/components/FilterComponents/TransmissionSelector";

interface Props {
  makes: string[];
  onChangeMakes: (selected: string[]) => void;
  yearRange: [number, number];
  onChangeYear: (range: [number, number]) => void;
  transmission: string | null;
  onChangeTrans: (val: string | null) => void;
}

export default function VehicleAttributes({
  makes,
  onChangeMakes,
  yearRange,
  onChangeYear,
  transmission,
  onChangeTrans,
}: Props) {
  return (
    <View>
      <MakeSelector makes={makes} onChangeMakes={onChangeMakes} />
      <ModelYearSelector yearRange={yearRange} onChangeYear={onChangeYear} />
      <TransmissionSelector transmission={transmission} onChangeTrans={onChangeTrans} />
    </View>
  );
}