import { ChangeEvent, FC, useState } from "react";
import { TrainingData } from "./TrainingData";
import { formatDate } from "./formatData";
import "./Formstep.css";

export const FormStep: FC = () => {
  const [formData, setFormData] = useState<TrainingData>({
    date: "",
    distance: 0,
  });

  const [trainingList, setTrainingList] = useState<TrainingData[]>([]);

  const handleFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const existingTraining = trainingList.find(
      (training) => training.date === formData.date
    );

    if (existingTraining) {
      existingTraining.distance =
        parseInt(existingTraining.distance) + parseInt(formData.distance);
    } else {
      setTrainingList((prevList) =>
        [formData, ...prevList].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }

    setFormData({ date: "", distance: 0 });
  };

  const handleDelete = (trainingToDelete) => {
    setTrainingList((prevTrainingList) =>
      prevTrainingList.filter(
        (training) => training.date !== trainingToDelete.date
      )
    );
  };

  return (
    <div className="form__wrapper">
      <form onSubmit={handleFormSubmit} id="form">
        <div className="inputs__wrapper">
          <div className="input_wrapper">
            <label htmlFor="dateInput">Дата (ДД.ММ.ГГ)</label>
            <br />
            <input
              type="date"
              id="dateInput"
              name="date"
              value={formData.date}
              onChange={handleFormData}
            />
            <br />
          </div>

          <div className="input_wrapper">
            <label htmlFor="distanceInput">Пройдено км</label>
            <br />
            <input
              type="number"
              id="distanceInput"
              name="distance"
              value={formData.distance}
              onChange={handleFormData}
            />
            <br />
          </div>

          <div className="input_wrapper">
            <button type="submit">OK</button>
          </div>
        </div>
      </form>

      <table className="table__wrapper">
        <thead>
          <tr>
            <th>Дата</th>
            <th>км</th>
            <th>действия</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {trainingList.map((training, index) => (
            <tr key={index}>
              <td>{formatDate(training.date)}</td>
              <td>{training.distance}</td>
              <td>
                <button
                  className="button__delete"
                  onClick={() => handleDelete(training)}
                >
                  ✘
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
