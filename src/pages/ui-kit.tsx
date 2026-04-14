import Head from "next/head";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  DatePicker,
  Input,
  RadioGroup,
  SearchableSelect,
  Select,
} from "@/components/ui";

const titleFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

const metrics = [
  { label: "Active Sessions", value: "14.8k", tone: "info" as const },
  { label: "Conversion", value: "8.2%", tone: "success" as const },
  { label: "Alerts", value: "3", tone: "warning" as const },
];

const roleOptions = [
  { label: "Product Designer", value: "designer" },
  { label: "Frontend Engineer", value: "frontend" },
  { label: "Data Analyst", value: "analyst" },
  { label: "Operations", value: "ops" },
];

export default function UIKitPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Head>
        <title>UI Kit Showcase</title>
      </Head>

      <div
        className={`${titleFont.className} ${monoFont.variable} min-h-screen bg-[radial-gradient(circle_at_top,#10345f,#070e1a_45%,#05070c_100%)] px-5 py-10 text-slate-100 sm:px-8`}
      >
        <main className="mx-auto w-full max-w-6xl space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-slate-950/60 p-8 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.55)] backdrop-blur">
            <div className="pointer-events-none absolute -top-32 -right-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <Badge tone="info">Design System</Badge>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
              Components crafted for fast product screens and clean interaction patterns.
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
              This page showcases reusable UI primitives from the components folder. Mix and
              match them across your pages without rewriting styles.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg">Create Workspace</Button>
              <Button variant="secondary" size="lg">
                Review Components
              </Button>
              <Button variant="ghost" size="lg">
                Open Figma Mapping
              </Button>
              <Button variant="danger" size="lg" onClick={() => setDialogOpen(true)}>
                Launch Dialog
              </Button>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <p className="text-sm text-slate-400">{metric.label}</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                  <Badge tone={metric.tone}>Live</Badge>
                </div>
              </Card>
            ))}
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <Card
              title="Buttons"
              subtitle="Variants and sizes"
              actions={<Badge tone="neutral">button.tsx</Badge>}
            >
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Card>

            <Card
              title="Input"
              subtitle="Form fields with helper and error states"
              actions={<Badge tone="neutral">input.tsx</Badge>}
            >
              <div className="space-y-4">
                <Input
                  name="workspace"
                  label="Workspace Name"
                  placeholder="Neon Analytics"
                  hint="Used in project headers and invitations"
                />
                <Input
                  name="domain"
                  label="Primary Domain"
                  placeholder="project.example.com"
                  error="Domain is already connected to another team"
                />
                <Select
                  name="role"
                  label="Team Role"
                  options={roleOptions}
                  defaultValue="frontend"
                  hint="Used to personalize onboarding templates"
                />
                <SearchableSelect
                  name="owner"
                  label="Workspace Owner"
                  options={[
                    { label: "Ariana Cross", value: "ariana" },
                    { label: "Mika Tanaka", value: "mika" },
                    { label: "Noah Patel", value: "noah" },
                    { label: "Priya Bose", value: "priya" },
                    { label: "Soren Li", value: "soren" },
                  ]}
                  defaultValue="mika"
                  searchPlaceholder="Find owner..."
                  hint="Includes search bar for fast lookup"
                />
                <Button className="w-full">Save Project Settings</Button>
              </div>
            </Card>

            <Card
              title="Select"
              subtitle="Single-choice selector with validation"
              actions={<Badge tone="neutral">select.tsx</Badge>}
            >
              <div className="space-y-4">
                <Select
                  name="billing-plan"
                  label="Billing Plan"
                  options={[
                    { label: "Starter", value: "starter" },
                    { label: "Growth", value: "growth" },
                    { label: "Scale", value: "scale" },
                  ]}
                  defaultValue="growth"
                />
                <Select
                  name="region"
                  label="Deployment Region"
                  options={[
                    { label: "US East", value: "us-east" },
                    { label: "EU West", value: "eu-west" },
                  ]}
                  placeholder="Pick a region"
                  defaultValue=""
                  error="Please choose a deployment region"
                />
              </div>
            </Card>

            <Card
              title="Date Picker"
              subtitle="Native calendar input"
              actions={<Badge tone="neutral">datePicker.tsx</Badge>}
            >
              <div className="space-y-4">
                <DatePicker
                  name="launch-date"
                  label="Launch Date"
                  defaultValue="2026-06-24"
                  hint="Pick the date when your workspace goes live"
                />
                <DatePicker
                  name="freeze-date"
                  label="Code Freeze"
                  min="2026-05-01"
                  max="2026-08-31"
                  error="Please choose a date between May and August"
                />
              </div>
            </Card>

            <Card
              title="Radio Buttons"
              subtitle="Single-choice option groups"
              actions={<Badge tone="neutral">radioGroup.tsx</Badge>}
            >
              <div className="space-y-4">
                <RadioGroup
                  name="notifications"
                  label="Notification Frequency"
                  defaultValue="important"
                  hint="You can change this later in account settings"
                  options={[
                    {
                      label: "All Activity",
                      value: "all",
                      hint: "Email me for every update and mention",
                    },
                    {
                      label: "Important Only",
                      value: "important",
                      hint: "Mentions, approvals, and system alerts",
                    },
                    {
                      label: "Muted",
                      value: "mute",
                      hint: "No email notifications",
                    },
                  ]}
                />
                <RadioGroup
                  name="workspace-visibility"
                  label="Workspace Visibility"
                  error="Please select one visibility mode"
                  options={[
                    { label: "Private", value: "private" },
                    { label: "Team", value: "team" },
                    { label: "Public", value: "public", disabled: true },
                  ]}
                />
              </div>
            </Card>

            <Card
              title="Checkbox"
              subtitle="Boolean and consent controls"
              actions={<Badge tone="neutral">checkbox.tsx</Badge>}
            >
              <div className="space-y-3">
                <Checkbox
                  name="terms"
                  label="I agree to the terms and data policy"
                  hint="Required before creating a production workspace"
                  defaultChecked
                />
                <Checkbox
                  name="release-notes"
                  label="Send me release notes every Friday"
                />
                <Checkbox
                  name="security-review"
                  label="Security review completed"
                  error="This confirmation is required for deployment"
                />
              </div>
            </Card>

            <Card
              title="Dialog"
              subtitle="Overlay modal with actions"
              actions={<Badge tone="neutral">dialog.tsx</Badge>}
            >
              <div className="space-y-4">
                <p className="text-sm text-slate-300">
                  Use the dialog for confirmations, task flows, or focused forms.
                </p>
                <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
              </div>
            </Card>

            <Card
              title="Badges"
              subtitle="Status indicators"
              actions={<Badge tone="neutral">badge.tsx</Badge>}
              className="lg:col-span-2"
            >
              <div className="flex flex-wrap gap-3">
                <Badge tone="neutral">Neutral</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="info">Info</Badge>
              </div>
            </Card>
          </section>

          <footer className="pb-6 text-xs text-slate-400 [font-family:var(--font-ibm-plex-mono)]">
            Route: /ui-kit • Components: /src/components/ui
          </footer>
        </main>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Publish changes?"
        description="This action will make the selected workspace settings active for your team."
        actions={
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
          </>
        }
      >
        <div className="space-y-3">
          <p>
            Dialogs keep users focused on one task at a time. This example uses the reusable
            dialog component with backdrop click and escape handling.
          </p>
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-cyan-100">
            Review the details below before you confirm the action.
          </div>
        </div>
      </Dialog>
    </>
  );
}
