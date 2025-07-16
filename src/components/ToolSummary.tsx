import React from "react";
import type { StageData } from "../types";

interface ToolSummaryProps {
  selectedStage: string;
  data: StageData[];
}

const countries: (keyof Omit<StageData, "No." | "Stage">)[] = [
  "China", "Germany", "Japan", "Canada", "Australia", "USA", "Russia", "UAE"
];

const ToolSummary: React.FC<ToolSummaryProps> = ({ selectedStage, data }) => {
  const stageData = data.find((entry) => entry.Stage === selectedStage);

  if (!stageData) {
    return <p className="text-gray-500">No data found for this stage.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{selectedStage}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {countries.map((country) => (
          <div key={country} className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">{country}</h3>
            <p className="text-sm whitespace-pre-line">
              {stageData[country] ? stageData[country].trim() : "No data available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolSummary;
