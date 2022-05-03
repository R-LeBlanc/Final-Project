import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["50% - 59%", "60% - 69%", "70% - 79%", "80% - 89%", "90% - 100%"],
  datasets: [
    {
      lable: "Class Averages",
      data: [3, 6, 8, 7, 5],
      backgroundColor: [
        "rgb(255, 46, 99)",
        "rgb(238, 238, 238)",
        "rgb(255, 87, 34)",
        "rgb(0, 173, 181)",
        "rgb(48, 56, 65)",
      ],
      borderWidth: 0,
    },
  ],
};
