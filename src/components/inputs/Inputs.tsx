import { ChangeEvent, FC } from "react";
import { InputProps } from "../types/InputProps";
import "./inputs.css";

// обработка инпутов
export const Inputs: FC<InputProps> = ({ formData, setFormData }) => {
  const handleFormData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
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
    </>
  );
};
