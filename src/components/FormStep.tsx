import { FC, useState } from "react";
import { TrainingData } from "./types/TrainingData";
import "./Formstep.css";
import { Inputs } from "./inputs/Inputs";
import { TrainingTable } from "./table/TrainingTable";

export const FormStep: FC = () => {
  const [formData, setFormData] = useState<TrainingData>({
    date: "",
    distance: 0,
  });

  const [trainingList, setTrainingList] = useState<TrainingData[]>([]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.date || isNaN(+formData.distance)) {
      alert("Пожалуйста, заполните все поля корректно.");
      return;
    }
    const existingTraining = trainingList.find(
      (training) => training.date === formData.date
    );

    if (existingTraining) {
      existingTraining.distance =
        +existingTraining.distance + +formData.distance;
    } else {
      setTrainingList((lastList) =>
        [formData, ...lastList].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }
    setFormData({
      date: "",
      distance: 0,
    });
  };

  const handleDelete = (trainingToDelete: TrainingData) => {
    setTrainingList((lastList) =>
      lastList.filter((lastList) => lastList.date !== trainingToDelete.date)
    );
  };

  const handleCorrect = (trainingToCorrect: TrainingData) => {
    const correctTraining = trainingList.find(
      (training) => training.date === trainingToCorrect.date
    );

    if (correctTraining) {
      const { date, distance } = correctTraining;
      setFormData({
        date: date,
        distance: distance,
      });
      handleDelete(trainingToCorrect);
    }
  };

  return (
    <div className="form__wrapper">
      <form onSubmit={handleFormSubmit} id="form">
        <div className="inputs__wrapper">
          <Inputs formData={formData} setFormData={setFormData} />
          <div className="input_wrapper">
            <button type="submit">OK</button>
          </div>
        </div>
      </form>

      <TrainingTable
        trainingList={trainingList}
        onDelete={handleDelete}
        onCorrect={handleCorrect}
      />
    </div>
  );
};
