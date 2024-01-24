import React from "react";
import { TrainingData } from "./TrainingData";

// входные данные для импута формы
export type InputProps = {
  formData: TrainingData;
  setFormData: React.Dispatch<React.SetStateAction<TrainingData>>;
};
