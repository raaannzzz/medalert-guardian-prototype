"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  AlertCircle,
  BatteryMedium,
  Clock,
  Loader2,
  MapPin,
  PersonStanding,
  Phone,
  RefreshCw,
  ShieldCheck,
  Watch,
} from "lucide-react";
import type { DeviceStatus } from "@/lib/types";
import { StatusDot } from "./StatusBar";
import { LocationMap } from "./LocationMap";

const ENDPOINT = "/api/device/margaret";

async function fetchStatus(): Promise<DeviceStatus> {
  const res = await fetch(ENDPOINT, { cache: "no-store" });
  if (!res.ok) throw new Error(`Status request failed (${res.status})`);
  return (await res.json()) as DeviceStatus;
}

function checkedLabel(checkedAt: number, now: number) {
  const minutes = Math.floor((now - checkedAt) / 60_000);
  if (minutes < 1) return "Checked just now";
  return `Checked ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

const panel = "rounded-[28px] border border-line bg-white";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-xl bg-blue-100 ${className}`} />;
}

function DetailRow({ icon, label, children, last }: { icon: ReactNode; label: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={`flex items-center gap-[18px] py-6 ${last ? "" : "border-b border-line-soft"}`}>
      <div aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-blue-50 text-blue">
        {icon}
      </div>
      <div className="flex grow flex-col gap-0.5">
        <div className="text-[16px] font-medium text-ink-2">{label}</div>
        {children}
      </div>
    </div>
  );
}

function StatusValue({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div className={`flex items-center gap-2.5 text-[22px] font-semibold ${ok ? "text-green" : "text-red-text"}`}>
      <StatusDot className={ok ? "" : "!bg-red"} />
      {children}
    </div>
  );
}

export function GuardianDashboard() {
  const [data, setData] = useState<DeviceStatus | null>(null);
  const [load, setLoad] = useState<"loading" | "ready" | "error">("loading");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [checkedAt, setCheckedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let active = true;
    fetchStatus()
      .then((d) => {
        if (!active) return;
        setData(d);
        setCheckedAt(Date.now());
        setLoad("ready");
      })
      .catch(() => active && setLoad("error"));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(id);
  }, []);

  const refresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    setRefreshFailed(false);
    try {
      const d = await fetchStatus();
      const t = Date.now();
      setData(d);
      setCheckedAt(t);
      setNow(t);
      setLoad("ready");
    } catch {
      if (data) setRefreshFailed(true);
      else setLoad("error");
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, data]);

  const refreshButton = (label: string) => (
    <button
      type="button"
      onClick={refresh}
      disabled={refreshing}
      aria-busy={refreshing}
      className="btn-tonal h-[52px] w-full cursor-pointer px-[22px] text-[17px] disabled:cursor-wait min-[900px]:w-auto"
    >
      {refreshing ? (
        <Loader2 size={22} strokeWidth={2} className="animate-spin" aria-hidden="true" />
      ) : (
        <RefreshCw size={22} strokeWidth={1.8} aria-hidden="true" />
      )}
      {refreshing ? "Refreshing…" : label}
    </button>
  );

  /* ---------- loading ---------- */
  if (load === "loading") {
    return (
      <div aria-busy="true">
        <p role="status" className="sr-only">Loading Margaret’s status…</p>
        <section className={`${panel} flex flex-col gap-7 p-5 min-[900px]:p-10`}>
          <div className="flex items-center gap-4">
            <Skeleton className="size-14 !rounded-full" />
            <Skeleton className="h-6 w-56" />
          </div>
          <div className="flex items-center gap-7">
            <Skeleton className="size-[88px] shrink-0 !rounded-full max-[899px]:hidden" />
            <div className="flex w-full flex-col gap-3">
              <Skeleton className="h-12 w-full max-w-[560px]" />
              <Skeleton className="h-6 w-64" />
            </div>
          </div>
        </section>
        <div className="mt-6 grid gap-6 min-[900px]:grid-cols-[7fr_5fr]">
          <Skeleton className="h-[360px] !rounded-[28px]" />
          <Skeleton className="h-[360px] !rounded-[28px]" />
        </div>
      </div>
    );
  }

  /* ---------- error (nothing loaded) ---------- */
  if (load === "error" || !data) {
    return (
      <section role="alert" className={`${panel} flex flex-col items-start gap-6 p-5 min-[900px]:p-10`}>
        <div className="flex items-center gap-5">
          <div aria-hidden="true" className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-red-50 text-red">
            <AlertCircle size={36} strokeWidth={1.7} />
          </div>
          <div>
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.01em] min-[900px]:text-[36px]">
              We couldn’t load Margaret’s status.
            </h1>
            <p className="mt-2 text-[18px] text-ink-2">Check your connection and try again.</p>
          </div>
        </div>
        {refreshButton("Try again")}
      </section>
    );
  }

  /* ---------- ready ---------- */
  const safe = data.watchStatus === "Online" && data.fallDetection === "Active";
  const online = data.watchStatus === "Online";
  const fallOn = data.fallDetection === "Active";
  const first = data.name.split(" ")[0];

  return (
    <>
      <section
        aria-labelledby="status-heading"
        className={`${panel} grid gap-8 p-5 min-[900px]:grid-cols-[1fr_auto] min-[900px]:p-10`}
      >
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-center gap-4">
            <div aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-blue-100 text-[20px] font-bold text-blue-dark">
              {initials(data.name)}
            </div>
            <div className="text-[22px] font-semibold">{data.name}</div>
            <span
              className={`inline-flex h-[34px] items-center gap-2 rounded-full px-3.5 text-[16px] font-semibold ${online ? "bg-green-50 text-green" : "bg-red-50 text-red-text"}`}
            >
              <StatusDot className={`!size-[9px] ${online ? "" : "!bg-red"}`} />
              {data.watchStatus}
            </span>
          </div>

          <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-7">
            <div
              aria-hidden="true"
              className={`flex size-[72px] shrink-0 items-center justify-center rounded-full min-[900px]:size-[88px] ${safe ? "bg-green-50 text-green-icon" : "bg-red-50 text-red"}`}
            >
              {safe ? <ShieldCheck size={44} strokeWidth={1.7} /> : <AlertCircle size={44} strokeWidth={1.7} />}
            </div>
            <div className="flex flex-col gap-3">
              <h1
                id="status-heading"
                className="max-w-[640px] text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] min-[900px]:text-[48px]"
              >
                {safe ? `${first} is connected and protected.` : `${first}’s watch needs attention.`}
              </h1>
              <p className="text-[20px] text-ink-2">
                {safe ? "All systems normal · No attention needed" : "Check the watch and fall detection status below."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-[900px]:items-end">
          {refreshButton("Refresh Status")}
          <p role="status" className="text-[16px] text-ink-2">
            {refreshFailed ? (
              <span className="font-medium text-red-text">Couldn’t refresh. Showing the last status.</span>
            ) : (
              checkedAt !== null && checkedLabel(checkedAt, now)
            )}
          </p>
        </div>
      </section>

      <div className="grid gap-6 min-[900px]:grid-cols-[7fr_5fr]">
        <section aria-label="Location" className={`${panel} flex flex-col overflow-hidden`}>
          <div className="relative min-h-[260px] grow bg-panel min-[900px]:min-h-[300px]">
            <LocationMap />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[15px] font-medium text-ink-2">
              Illustrative view
            </span>
          </div>
          <div className="flex items-center gap-[18px] border-t border-line px-6 py-6 min-[900px]:px-8 min-[900px]:py-7">
            <div aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-blue-50 text-blue">
              <MapPin size={24} strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-[16px] font-medium text-ink-2">Last known location</div>
              <div className="text-[26px] font-semibold">{data.lastKnownLocation}</div>
            </div>
          </div>
        </section>

        <section aria-label="Watch and safety details" className={`${panel} flex flex-col justify-between px-6 py-2 min-[900px]:px-8`}>
          <DetailRow icon={<Watch size={24} strokeWidth={1.8} />} label="Watch status">
            <StatusValue ok={online}>{data.watchStatus}</StatusValue>
          </DetailRow>
          <DetailRow icon={<BatteryMedium size={24} strokeWidth={1.8} />} label="Battery">
            <div className="flex items-center gap-4">
              <div className="text-[22px] font-semibold">{data.battery}%</div>
              <div
                role="img"
                aria-label={`Battery ${data.battery} percent`}
                className="ml-auto h-2.5 w-[120px] overflow-hidden rounded-full bg-[#e3eaf5]"
              >
                <div className="h-full rounded-full bg-blue" style={{ width: `${data.battery}%` }} />
              </div>
            </div>
          </DetailRow>
          <DetailRow icon={<PersonStanding size={24} strokeWidth={1.8} />} label="Fall detection">
            <StatusValue ok={fallOn}>{data.fallDetection}</StatusValue>
          </DetailRow>
          <DetailRow icon={<Clock size={24} strokeWidth={1.8} />} label="Last GPS update" last>
            <div className="text-[22px] font-semibold">{data.lastGpsUpdate}</div>
          </DetailRow>
        </section>
      </div>

      <p className="mt-2 flex items-center justify-center gap-2.5 text-[16px] text-ink-2">
        <Phone size={20} strokeWidth={1.8} className="shrink-0 text-blue" aria-hidden="true" />
        <span>
          Need help? Call MedAlert on <a href="tel:+61272275833" className="font-semibold text-ink">02 7227 5833</a>
        </span>
      </p>
    </>
  );
}
