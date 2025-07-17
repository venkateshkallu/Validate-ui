import React, { useState } from "react";
import ToolSelector from "./components/ToolSelector";
import ToolSummary from "./components/ToolSummary";
import PipelineForm from "./components/PipelineForm";
import type { StageData } from "./types";
import data from "@/data/tools.json"; // optional in some setups
import "@/index.css"; // Ensure global styles are imported

const App: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string>("");

  const stages: string[] = (data as StageData[]).map((entry) => entry.Stage);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          {/* 🧠 AI-Powered Pipeline Validator */}
        </h1>

        {/* 🔹 Intelligent DevOps Form */}
        <PipelineForm />

        {/* 🔹 Stage-based Tool Recommendation */}
        <ToolSelector
          stages={stages}
          selectedStage={selectedStage}
          onSelect={setSelectedStage}
        />
        {selectedStage && (
          <ToolSummary selectedStage={selectedStage} data={data as StageData[]} />
        )}
      </div>
    </div>
  );
};

export default App;
