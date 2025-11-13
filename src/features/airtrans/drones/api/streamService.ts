import { StreamApiData, StreamApiResponse } from "../types/stream";

export type EnsureStreamParams = {
    apiBase?: string;
    droneId: string;
    droneName: string;
    rtspSource: string;
    userId: string;
};

async function getStreamByDroneId(apiBase: string, droneId: string, userId: string) {
    const res = await fetch(`${apiBase}/streams-by-drone-id?drone-id=${encodeURIComponent(droneId)}`, {
        headers: {"X-UserId": userId},
        // credentials: "include",
    });

    const json: StreamApiResponse = await res.json();
    return json;
}

async function createStream(apiBase: string, body: {name: string; source: string; droneId: string}, userId: string) {
    const res = await fetch(`${apiBase}/streams`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-UserId": userId,
        },
        body: JSON.stringify(body),
        // credentials: "include",
    });
    if(!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Create stream failed: ${res.status} ${txt}`)
    }
}

export async function ensureStream({
    apiBase = "",
    droneId,
    droneName,
    rtspSource,
    userId,
}: EnsureStreamParams): Promise<StreamApiData> {
    const res1 = await getStreamByDroneId(apiBase, droneId, userId);
    if(res1.status === "success" && res1.data) return res1.data;

    if(res1.status === "error" && res1.code === 404) {
        await createStream(apiBase, {name: droneName, source: rtspSource, droneId: droneId}, userId);
        const res2 = await getStreamByDroneId(apiBase, droneId, userId);
        if(res2.status === "success" && res2.data) return res2.data;
        throw new Error (res2.message || "Get stream after create failed");
    }

    throw new Error(res1?.message || "Get stream failed");
}