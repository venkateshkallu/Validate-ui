import React from "react";

interface ToolSelectorProps {
  stages: string[];
  selectedStage: string;
  onSelect: (value: string) => void;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ stages, selectedStage, onSelect }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Select Pipeline Stage:</label>
      <select
        className="p-2 border border-gray-300 rounded w-full"
        value={selectedStage}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">-- Choose a stage --</option>
        {stages.map((stage) => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToolSelector;
