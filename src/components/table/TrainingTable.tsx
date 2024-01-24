import { FC } from "react";
import { TrainingTableProps } from "../types/TrainingTableProps";
import { formatDate } from "../formatDate";
import "./Table.css";

//таблица
export const TrainingTable: FC<TrainingTableProps> = ({
  trainingList,
  onDelete,
  onCorrect,
}) => {
  return (
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
                onClick={() => onDelete(training)}
              >
                ✘
              </button>
              <button
                className="button__correct"
                onClick={() => onCorrect(training)}
              >
                ✎
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
