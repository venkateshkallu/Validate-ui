import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const techOptions = ["Amplify (FE)", "Heroku (FE & BE)", "Netlify (FE)"];
const ciTools = ["GitHub Actions", "GitLab CI", "Bitbucket Pipelines", "Jenkins"];
const cdTools = ["ArgoCD", "GitHub Actions", "GitLab CI", "Bitbucket Pipelines", "Jenkins"];
const sastTools = ["SonarQube", "Semgrep", "Checkmarx", "CodeQL"];
const secretScanTools = ["TruffleHog", "GitLeaks", "Talisman", "Vault"];
const vulnScanTools = ["DependencyTrack", "Snyk", "OWASP Dependency-Check"];
const dockerScanTools = ["Trivy", "Grype", "Clair", "Anchore"];
const preChecks = ["SAST", "Secrets Scan", "SBOM", "SCA", "Container Scan", "Runtime Security"];
const productionStages = [
  { value: "not-ready", label: "Not Yet Deployed" },
  { value: "ready", label: "Ready for Production" },
  { value: "live", label: "Already in Production" }
];

const DevopsPipelineForm: React.FC = () => {
  const [form, setForm] = useState({
    tech: "",
    version: "",
    installCmd: "",
    buildCmd: "",
    sast: "",
    secrets: "",
    vuln: "",
    sca: false,
    dockerScan: "",
    ci: "",
    cd: "",
    prechecks: [] as string[],
    productionStage: "not-ready",
    branching: "",
  });

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const togglePrecheck = (item: string) => {
    setForm((prev) => {
      const exists = prev.prechecks.includes(item);
      return {
        ...prev,
        prechecks: exists
          ? prev.prechecks.filter((i) => i !== item)
          : [...prev.prechecks, item],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label>
            Technology
            <Select
              value={form.tech}
              onChange={(val) => handleChange("tech", val)}
              options={techOptions.map((t) => ({ value: t, label: t }))}
              placeholder="Select technology"
            />
          </Label>

          <Label>
            Version
            <Input
              value={form.version}
              onChange={(e) => handleChange("version", e.target.value)}
              placeholder="e.g., 18.x"
            />
          </Label>

          <Label>
            Install Command
            <Input
              value={form.installCmd}
              onChange={(e) => handleChange("installCmd", e.target.value)}
              placeholder="e.g., npm install"
            />
          </Label>

          <Label>
            Build Command
            <Input
              value={form.buildCmd}
              onChange={(e) => handleChange("buildCmd", e.target.value)}
              placeholder="e.g., npm run build"
            />
          </Label>

          <Label>
            SAST Tool
            <Select
              value={form.sast}
              onChange={(val) => handleChange("sast", val)}
              options={sastTools.map((t) => ({ value: t, label: t }))}
              placeholder="Select SAST tool"
            />
          </Label>

          <Label>
            Secret Scanning Tool
            <Select
              value={form.secrets}
              onChange={(val) => handleChange("secrets", val)}
              options={secretScanTools.map((t) => ({ value: t, label: t }))}
              placeholder="Select secret scan tool"
            />
          </Label>

          <Label>
            Vulnerability Scan Tool
            <Select
              value={form.vuln}
              onChange={(val) => handleChange("vuln", val)}
              options={vulnScanTools.map((t) => ({ value: t, label: t }))}
              placeholder="Select vulnerability scan tool"
            />
          </Label>

          <Label className="flex items-center gap-2">
            <Checkbox
              checked={form.sca}
              onCheckedChange={(val) => handleChange("sca", val)}
            />
            SCA (Software Composition Analysis)
          </Label>

          <Label>
            Docker Image Scan Tool
            <Select
              value={form.dockerScan}
              onChange={(val) => handleChange("dockerScan", val)}
              options={dockerScanTools.map((t) => ({ value: t, label: t }))}
              placeholder="Select docker scan tool"
            />
          </Label>

          <Label>
            CI Tool
            <Select
              value={form.ci}
              onChange={(val) => handleChange("ci", val)}
              options={ciTools.map((t) => ({ value: t, label: t }))}
              placeholder="Select CI tool"
            />
          </Label>

          <Label>
            CD Tool
            <Select
              value={form.cd}
              onChange={(val) => handleChange("cd", val)}
              options={cdTools.map((t) => ({ value: t, label: t }))}
              placeholder="Select CD tool"
            />
          </Label>

          <div>
            <Label>Pre-Deployment Checks</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {preChecks.map((check) => (
                <Label key={check} className="flex items-center gap-2">
                  <Checkbox
                    checked={form.prechecks.includes(check)}
                    onCheckedChange={() => togglePrecheck(check)}
                  />
                  {check}
                </Label>
              ))}
            </div>
          </div>

          <Label>
            Production Stage
            <Select
              value={form.productionStage}
              onChange={(val) => handleChange("productionStage", val)}
              options={productionStages}
              placeholder="Select production stage"
            />
          </Label>

          <Label>
            Branching Strategy
            <Input
              value={form.branching}
              onChange={(e) => handleChange("branching", e.target.value)}
              placeholder="e.g., trunk-based, Git flow, etc."
            />
          </Label>

          <Button type="submit">Validate Pipeline</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DevopsPipelineForm;
