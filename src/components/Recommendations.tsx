import React from "react";

interface Recommendation {
category: string;
suggestions: string[];
}

interface RecommendationsProps {
missingItems: string[];
environmentStage: "dev" | "staging" | "production";
}

const defaultRecommendations: Recommendation[] = [
{
category: "SAST (Static Application Security Testing)",
suggestions: [
"Consider integrating SonarQube, Semgrep, or CodeQL.",
"Ensure it runs on every PR or commit to dev branch.",
],
},
{
category: "Secrets Scanning",
suggestions: [
"Use Gitleaks, TruffleHog, or GitGuardian.",
"Scan Git history and CI logs for secrets.",
],
},
{
category: "SCA (Software Composition Analysis)",
suggestions: [
"Integrate tools like Snyk, OWASP Dependency-Check, or Syft.",
"Ensure SBOM generation for dependency traceability.",
],
},
{
category: "Docker Image Scan",
suggestions: [
"Scan images with Grype, Trivy, or Dockle.",
"Run scan in CI post-build stage before pushing.",
],
},
{
category: "CI/CD Best Practices",
suggestions: [
"Enforce branch protection on main/master.",
"Use environment-specific secrets in CI.",
"Set up staging with preview URLs.",
],
},
];

const Recommendations: React.FC<RecommendationsProps> = ({
missingItems,
environmentStage,
}) => {
return (
<div className="mt-8 bg-white shadow-md p-6 rounded-xl border border-gray-200">
<h2 className="text-2xl font-bold mb-4 text-indigo-600">🔍 Recommendations</h2>

php-template
Copy
Edit
  {missingItems.length > 0 && (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-red-600 mb-2">Missing Items:</h3>
      <ul className="list-disc list-inside text-sm text-red-700">
        {missingItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )}

  <div>
    <h3 className="text-lg font-semibold mb-2 text-gray-700">
      Best Practices for {environmentStage.toUpperCase()} Stage
    </h3>
    <div className="space-y-4">
      {defaultRecommendations.map((rec) => (
        <div key={rec.category}>
          <h4 className="font-semibold text-sm text-indigo-500">{rec.category}</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {rec.suggestions.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</div>
);
};

export default Recommendations;