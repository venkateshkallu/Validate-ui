import React from "react";

type PipelineConfig = {
platform: string;
version?: string;
installCmd?: string;
buildCmd?: string;
sast?: string;
secretScan?: string;
vulnScan?: string;
sca?: string;
dockerfile?: boolean;
ciTool?: string;
imageScan?: string;
cdTool?: string;
branchingStrategy?: string;
environments?: string[];
productionReady?: boolean;
};

type ValidationResult = {
type: "missing" | "recommended" | "configured";
message: string;
};

interface ValidationResultsProps {
config: PipelineConfig;
}

const validateConfig = (config: PipelineConfig): ValidationResult[] => {
const results: ValidationResult[] = [];

// Required fields
if (!config.installCmd) {
results.push({ type: "missing", message: "Install command is missing." });
} else {
results.push({ type: "configured", message: "Install command is provided." });
}

if (!config.buildCmd) {
results.push({ type: "missing", message: "Build command is missing." });
} else {
results.push({ type: "configured", message: "Build command is provided." });
}

if (!config.sast) {
results.push({ type: "recommended", message: "Add a Static Analysis (SAST) tool like SonarQube or CodeQL." });
}

if (!config.secretScan) {
results.push({ type: "recommended", message: "Add Secret Scanning (e.g., TruffleHog, Gitleaks)." });
}

if (!config.vulnScan) {
results.push({ type: "recommended", message: "Add a Vulnerability Scanner like DependencyTrack or Snyk." });
}

if (!config.sca) {
results.push({ type: "recommended", message: "Add SCA (Software Composition Analysis) like Syft, OWASP Dependency-Check." });
}

if (!config.dockerfile) {
results.push({ type: "recommended", message: "Dockerfile is not present. Consider containerizing your app." });
}

if (!config.ciTool) {
results.push({ type: "missing", message: "CI Tool is not selected." });
}

if (!config.imageScan) {
results.push({ type: "recommended", message: "Add Docker Image scanning (e.g., Grype, Trivy)." });
}

if (!config.cdTool) {
results.push({ type: "missing", message: "CD Tool is not selected." });
}

if (!config.branchingStrategy) {
results.push({ type: "recommended", message: "Define a branching strategy (e.g., GitFlow, trunk-based)." });
}

if (config.productionReady && !config.environments?.includes("production")) {
results.push({ type: "missing", message: "Production environment is not defined but marked as ready." });
}

return results;
};

const ValidationResults: React.FC<ValidationResultsProps> = ({ config }) => {
const results = validateConfig(config);

const grouped = {
configured: results.filter((r) => r.type === "configured"),
missing: results.filter((r) => r.type === "missing"),
recommended: results.filter((r) => r.type === "recommended"),
};

return (
<div className="mt-6 space-y-4">
<h2 className="text-2xl font-bold text-gray-800">Validation Results</h2>

php-template
Copy
Edit
  <div>
    <h3 className="text-lg font-semibold text-green-600">✅ Configured</h3>
    <ul className="list-disc ml-5 text-green-700">
      {grouped.configured.map((r, i) => (
        <li key={i}>{r.message}</li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold text-yellow-600">⚠️ Recommended</h3>
    <ul className="list-disc ml-5 text-yellow-700">
      {grouped.recommended.map((r, i) => (
        <li key={i}>{r.message}</li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-lg font-semibold text-red-600">❌ Missing</h3>
    <ul className="list-disc ml-5 text-red-700">
      {grouped.missing.map((r, i) => (
        <li key={i}>{r.message}</li>
      ))}
    </ul>
  </div>
</div>
);
};

export default ValidationResults;