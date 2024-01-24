import { TrainingData } from "./TrainingData";

export type TrainingTableProps = {
  trainingList: TrainingData[];
  onDelete: (trainingToDelete: TrainingData) => void;
  onCorrect: (trainingToCorrect: TrainingData) => void;
};
