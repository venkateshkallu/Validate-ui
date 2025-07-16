import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


export default function PipelineForm() {
  const [tech, setTech] = useState("")
  const [sast, setSast] = useState<string[]>([])
  const [secretScan, setSecretScan] = useState<string[]>([])
  const [vulScan, setVulScan] = useState<string[]>([])
  const [sca, setSca] = useState<string[]>([])
  const [ciTool, setCiTool] = useState("")
  const [cdTool, setCdTool] = useState("")
  const [showDocker, setShowDocker] = useState(false)

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 p-6 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          🧠 AI-Powered DevOps Pipeline Validator
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6">
        {/* Tech Stack */}
        <div>
  <Label>Select Technology Stack</Label>
  <Select
    value={tech}
    onChange={setTech}
    options={[
      { value: "amplify", label: "Amplify (FE)" },
      { value: "heroku", label: "Heroku (FE + BE)" },
      { value: "netlify", label: "Netlify (FE)" },
    ]}
    placeholder="Choose..."
  />
</div>


        {/* Version / Commands */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Version</Label>
            <Input placeholder="e.g. 1.0.3" />
          </div>
          <div>
            <Label>Install Command</Label>
            <Input placeholder="e.g. npm install" />
          </div>
          <div>
            <Label>Build Command</Label>
            <Input placeholder="e.g. npm run build" />
          </div>
        </div>

        <Separator />

        {/* SAST Tools */}
        <div>
          <Label>SAST Tools</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["CodeQL", "SonarQube", "Semgrep"].map((tool) => (
              <div key={tool} className="flex items-center space-x-2">
                <Checkbox
                  checked={sast.includes(tool)}
                  onCheckedChange={() =>
                    setSast((prev) =>
                      prev.includes(tool)
                        ? prev.filter((t) => t !== tool)
                        : [...prev, tool]
                    )
                  }
                />
                <Label>{tool}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Secret Scanning */}
        <div>
          <Label>Secret Scanning</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["TruffleHog", "Gitleaks", "GitHub Secret Scan"].map((tool) => (
              <div key={tool} className="flex items-center space-x-2">
                <Checkbox
                  checked={secretScan.includes(tool)}
                  onCheckedChange={() =>
                    setSecretScan((prev) =>
                      prev.includes(tool)
                        ? prev.filter((t) => t !== tool)
                        : [...prev, tool]
                    )
                  }
                />
                <Label>{tool}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Vulnerability Scanning */}
        <div>
          <Label>Vulnerability Scanning</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Dependency-Track", "Grype", "SBOM Scan"].map((tool) => (
              <div key={tool} className="flex items-center space-x-2">
                <Checkbox
                  checked={vulScan.includes(tool)}
                  onCheckedChange={() =>
                    setVulScan((prev) =>
                      prev.includes(tool)
                        ? prev.filter((t) => t !== tool)
                        : [...prev, tool]
                    )
                  }
                />
                <Label>{tool}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* SCA Tools */}
        <div>
          <Label>SCA Tools</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Snyk", "OWASP Dependency Check", "FOSSA"].map((tool) => (
              <div key={tool} className="flex items-center space-x-2">
                <Checkbox
                  checked={sca.includes(tool)}
                  onCheckedChange={() =>
                    setSca((prev) =>
                      prev.includes(tool)
                        ? prev.filter((t) => t !== tool)
                        : [...prev, tool]
                    )
                  }
                />
                <Label>{tool}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Prechecks */}
        <div>
          <Label>Pre-checks</Label>
          <Input placeholder="e.g. ESLint, Prettier, Unit Tests..." />
        </div>

        {/* Dockerfile Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={showDocker}
            onCheckedChange={(v) => setShowDocker(!!v)}
          />
          <Label>Create Dockerfile?</Label>
        </div>

        <Separator />

        {/* CI/CD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <Label>CI Tool</Label>
    <Select
      value={ciTool}
      onChange={setCiTool}
      options={[
        { value: "github-actions", label: "GitHub Actions" },
        { value: "gitlab-ci", label: "GitLab CI" },
        { value: "bitbucket", label: "Bitbucket" },
        { value: "jenkins", label: "Jenkins" },
      ]}
      placeholder="Select CI Tool"
    />
  </div>
</div>

 
          <div>
  <Label>CD Tool</Label>
  <Select
    value={cdTool}
    onChange={setCdTool}
    options={[
      { value: "github-actions", label: "GitHub Actions" },
      { value: "gitlab-ci", label: "GitLab CI" },
      { value: "bitbucket", label: "Bitbucket" },
      { value: "jenkins", label: "Jenkins" },
      { value: "argocd", label: "ArgoCD" },
    ]}
    placeholder="Select CD Tool"
  />
</div>
       
        {/* Branching Strategy */}
        <div>
          <Label>Branching Strategy / Environment Stage</Label>
          <Input placeholder="e.g. trunk-based, gitflow / dev, staging, prod..." />
        </div>
      </CardContent>
    </Card>
  )
}
