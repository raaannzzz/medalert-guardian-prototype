import type { DeviceStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const status: DeviceStatus = {
    id: "wearer_001",
    name: "Margaret Thompson",
    watchStatus: "Online",
    battery: 72,
    lastGpsUpdate: "2 minutes ago",
    lastKnownLocation: "Sydney NSW",
    fallDetection: "Active",
    updatedAt: new Date().toISOString(),
  };

  return Response.json(status, { headers: { "Cache-Control": "no-store" } });
}
