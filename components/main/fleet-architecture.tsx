"use client";

import { useState } from "react";

// FleetIQ topology, taken from GEKKOLAS/FleetIQ SERVICES.md.
const services = [
  { name: "Orders", aggregate: "Order", schema: "fleetiq_orders", route: "/orders", tier: "core", note: "The fully-modelled exemplar: value objects, child entities and owned types." },
  { name: "Identity", aggregate: "UserAccount", schema: "fleetiq_identity", route: "/useraccounts", tier: "lean", note: "A lean scaffold — authentication itself lives in Duende IdentityServer." },
  { name: "Carriers", aggregate: "Carrier", schema: "fleetiq_carriers", route: "/carriers", tier: "deep", note: "Child entities, a full state machine and cross-service event flows." },
  { name: "Planning", aggregate: "Load", schema: "fleetiq_planning", route: "/loads", tier: "deep", note: "Child entities, a full state machine and cross-service event flows." },
  { name: "Tracking", aggregate: "Shipment", schema: "fleetiq_tracking", route: "/shipments", tier: "deep", note: "Child entities, a full state machine and cross-service event flows." },
  { name: "Billing", aggregate: "Invoice", schema: "fleetiq_billing", route: "/invoices", tier: "deep", note: "Publishes InvoiceIssuedIntegrationEvent when an invoice is issued — consumed by Notifications." },
  { name: "Documents", aggregate: "Document", schema: "fleetiq_documents", route: "/documents", tier: "deep", note: "Versions and expiry: Uploaded → Verified | Rejected → re-upload → Archived." },
  { name: "Notifications", aggregate: "Notification", schema: "fleetiq_notifications", route: "/notifications", tier: "deep", note: "Validated channel: Pending → Sent | Failed (+reason) → Retry, max 5 attempts." },
  { name: "Analytics", aggregate: "ReportDefinition", schema: "fleetiq_analytics", route: "/reportdefinitions", tier: "deep", note: "Schedules (On demand / Daily / Weekly / Monthly) with a ReportRun history." },
  { name: "Compliance", aggregate: "ComplianceCheck", schema: "fleetiq_compliance", route: "/compliancechecks", tier: "deep", note: "Findings with severity — Pass is blocked by High/Critical findings; Fail requires findings; Waive needs a reason." },
  { name: "Integration", aggregate: "IntegrationConnector", schema: "fleetiq_integration", route: "/integrationconnectors", tier: "deep", note: "Endpoint URL validation, sync health, and auto-disable after 3 consecutive failures." },
  { name: "Intelligence", aggregate: "PredictionRequest", schema: "fleetiq_intelligence", route: "/predictionrequests", tier: "deep", note: "Requested → Running → Completed (result + confidence 0..1) | Failed (+error)." },
] as const;

const tiers = {
  core: { label: "Exemplar service", dot: "bg-fuchsia-300" },
  deep: { label: "Deepened domain", dot: "bg-violet-400" },
  lean: { label: "Lean scaffold", dot: "bg-zinc-500" },
} as const;

const infraBox = "rounded-xl border border-zinc-950/10 bg-zinc-950/[0.02] px-3 py-2 text-xs text-zinc-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300";
const connector = "mx-auto h-[18px] w-px";

export function FleetArchitecture() {
  const [active, setActive] = useState(0);
  const selected = services[active];

  return (
    <div className="mt-3 rounded-[1.5rem] border border-zinc-950/10 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.12),transparent_50%)] p-4 dark:border-white/10 dark:bg-zinc-950/60 sm:p-5">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.08] px-3.5 py-3">
          <div className="text-[13px] font-semibold text-zinc-950 dark:text-white">API Gateway</div>
          <div className="mt-0.5 text-[11px] text-cyan-600 dark:text-cyan-300">YARP</div>
        </div>
        <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/[0.06] px-3.5 py-3">
          <div className="text-[13px] font-semibold text-zinc-950 dark:text-white">IdentityServer</div>
          <div className="mt-0.5 text-[11px] text-yellow-600 dark:text-yellow-300">Duende · OAuth2 / OIDC</div>
        </div>
      </div>

      <div aria-hidden="true" className={`${connector} bg-gradient-to-b from-cyan-400 to-violet-400/60`} />

      <div role="listbox" aria-label="FleetIQ services" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <button
              key={service.name}
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className={`relative cursor-pointer rounded-xl border px-2.5 pb-2 pt-2.5 text-left transition-all duration-200 ${
                isActive
                  ? "border-violet-400/60 bg-violet-400/[0.16]"
                  : "border-zinc-950/10 bg-zinc-950/[0.02] hover:border-violet-400/30 dark:border-white/[0.08] dark:bg-white/[0.03]"
              }`}
            >
              <span className={`block text-[12.5px] font-semibold ${isActive ? "text-zinc-950 dark:text-white" : "text-zinc-700 dark:text-zinc-300"}`}>{service.name}</span>
              <span className="mt-0.5 block truncate text-[10px] text-zinc-500">{service.route}</span>
              <span aria-hidden="true" className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full ${tiers[service.tier].dot}`} />
            </button>
          );
        })}
      </div>

      <div aria-hidden="true" className={`${connector} bg-gradient-to-b from-violet-400/60 to-fuchsia-500`} />

      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/[0.14] to-violet-500/10 px-4 py-2.5">
        <span className="text-[13px] font-semibold text-zinc-950 dark:text-white">RabbitMQ</span>
        <span className="text-[11px] text-fuchsia-600 dark:text-fuchsia-300">MassTransit · transactional outbox</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className={infraBox}>PostgreSQL <span className="text-zinc-500">· ×12</span></div>
        <div className={infraBox}>Redis</div>
        <div className={infraBox}>MinIO</div>
      </div>

      <div aria-live="polite" className="mt-3.5 rounded-2xl border border-violet-400/30 bg-white/80 p-4 dark:bg-zinc-900/85">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-lg font-semibold text-zinc-950 dark:text-white">{selected.name}</span>
          <span className="text-[11px] text-violet-600 dark:text-violet-300">{tiers[selected.tier].label}</span>
        </div>
        <dl className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            ["Aggregate", selected.aggregate],
            ["Route", selected.route],
            ["Schema", selected.schema],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</dt>
              <dd className="mt-1 truncate text-xs text-zinc-800 dark:text-zinc-200">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[13px] leading-6 text-zinc-600 dark:text-zinc-400">{selected.note}</p>
      </div>
    </div>
  );
}
