// src/components/DevopsPipelineForm.tsx

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// Update the import path and component names to match your UI library
// Example for shadcn/ui (commonly used):
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const techOptions = ["Amplify (FE)", "Heroku (FE & BE)", "Netlify (FE)"];
const ciTools = ["GitHub Actions", "GitLab CI", "Bitbucket Pipelines", "Jenkins"];
const cdTools = ["ArgoCD", "GitHub Actions", "GitLab CI", "Bitbucket Pipelines", "Jenkins"];
const sastTools = ["SonarQube", "Semgrep", "Checkmarx", "CodeQL"];
const secretScanTools = ["TruffleHog", "GitLeaks", "Talisman", "Vault"];
const vulnScanTools = ["DependencyTrack", "Snyk", "OWASP Dependency-Check"];
const dockerScanTools = ["Trivy", "Grype", "Clair", "Anchore"];
const preChecks = ["SAST", "Secrets Scan", "SBOM", "SCA", "Container Scan", "Runtime Security"];

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
    // You can plug in logic here to analyze form and show recommendations
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label>
            Technology
            <Select value={form.tech} onValueChange={(val: string) => handleChange("tech", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select technology" />
              </SelectTrigger>
              <SelectContent>
                {techOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            Version
            <Input
              value={form.version}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("version", e.target.value)}
              placeholder="e.g., 18.x"
            />
          </Label>

          <Label>
            Install Command
            <Input
              value={form.installCmd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("installCmd", e.target.value)}
              placeholder="e.g., npm install"
            />
          </Label>

          <Label>
            Build Command
            <Input
              value={form.buildCmd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("buildCmd", e.target.value)}
              placeholder="e.g., npm run build"
            />
          </Label>

          <Label>
            SAST Tool
            <Select value={form.sast} onValueChange={(val: string) => handleChange("sast", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select SAST tool" />
              </SelectTrigger>
              <SelectContent>
                {sastTools.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            Secret Scanning Tool
            <Select value={form.secrets} onValueChange={(val: string) => handleChange("secrets", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select secret scan tool" />
              </SelectTrigger>
              <SelectContent>
                {secretScanTools.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            Vulnerability Scan Tool
            <Select value={form.vuln} onValueChange={(val: string) => handleChange("vuln", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select vulnerability scan tool" />
              </SelectTrigger>
              <SelectContent>
                {vulnScanTools.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label className="flex items-center gap-2">
            <Checkbox
              checked={form.sca}
              onCheckedChange={(val: boolean) => handleChange("sca", val)}
            />
            SCA (Software Composition Analysis)
          </Label>

          <Label>
            Docker Image Scan Tool
            <Select value={form.dockerScan} onValueChange={(val: string) => handleChange("dockerScan", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select docker scan tool" />
              </SelectTrigger>
              <SelectContent>
                {dockerScanTools.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            CI Tool
            <Select value={form.ci} onValueChange={(val: string) => handleChange("ci", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select CI tool" />
              </SelectTrigger>
              <SelectContent>
                {ciTools.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>

          <Label>
            CD Tool
            <Select value={form.cd} onValueChange={(val: string) => handleChange("cd", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select CD tool" />
              </SelectTrigger>
              <SelectContent>
                {cdTools.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              onValueChange={(val: string) => handleChange("productionStage", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select production stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-ready">Not Yet Deployed</SelectItem>
                <SelectItem value="ready">Ready for Production</SelectItem>
                <SelectItem value="live">Already in Production</SelectItem>
              </SelectContent>
            </Select>
          </Label>

          <Label>
            Branching Strategy
            <Input
              value={form.branching}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("branching", e.target.value)}
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
