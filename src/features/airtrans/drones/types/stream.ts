export type StreamApiData = {
    streamId: string;
    hlsUrl: string;
    hlsPath: string;
    jwt: string;
    streamName: string;
}

export type StreamApiResponse = 
| {
    status: "success";
    timestamp: string;
    message?: string;
    code?: number;
    data: StreamApiData;
}
| {
    status: "error";
    timestamp: string;
    message?: string;
    code?: number;
    data: null;
}