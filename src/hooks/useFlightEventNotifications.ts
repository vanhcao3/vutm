import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import NotificationService from "@/utils/notification";

type FlightEventType =
     | "flight_authorization_proposal.created"
     | "flight_authorization_approval.created"
     | "flight_notification.created";

type FlightEventPayload = {
     type?: string;
     data?: {
          id?: string;
          name?: string;
     };
};

const EVENT_ENDPOINTS: string[] = [
     "wss://airtransys.site:9443/at-flight-authorization-test/ws/flight-authorization-proposals",
     "wss://airtransys.site:9443/at-flight-authorization-test/ws/flight-authorization-approvals",
     "wss://airtransys.site:9443/at-flight-authorization-test/ws/flight-notifications",
];

const EVENT_HANDLERS: Record<FlightEventType, (name?: string) => void> = {
     "flight_authorization_proposal.created": (name) => {
          NotificationService.success("Đề nghị cấp phép chuyến bay mới", name);
     },
     "flight_authorization_approval.created": (name) => {
          NotificationService.success("Phê duyệt chuyến bay mới", name);
     },
     "flight_notification.created": (name) => {
          NotificationService.success("Thông báo bay mới", name);
     },
};

export const useFlightEventNotifications = () => {
     const location = useLocation();
     const socketsRef = useRef<WebSocket[]>([]);
     const handledEventsRef = useRef<Set<string>>(new Set());

     useEffect(() => {
          if (location.pathname !== "/") {
               return;
          }

          const handledEvents = handledEventsRef.current;

          const handleMessage = (event: MessageEvent) => {
               try {
                    const payload: FlightEventPayload = JSON.parse(event.data);
                    const eventType = payload.type as FlightEventType;
                    if (!eventType) {
                         return;
                    }
                    const handler = EVENT_HANDLERS[eventType];
                    if (!handler) {
                         return;
                    }
                    const dataId = payload.data?.id || `${eventType}-${Date.now()}`;
                    const key = `${eventType}:${dataId}`;
                    if (handledEvents.has(key)) {
                         return;
                    }
                    handledEvents.add(key);
                    handler(payload.data?.name);
               } catch (_error) {
                    return;
               }
          };

          const sockets = EVENT_ENDPOINTS.map((url) => {
               const socket = new WebSocket(url);
               socket.onmessage = handleMessage;
               return socket;
          });

          socketsRef.current = sockets;

          return () => {
               sockets.forEach((socket) => {
                    socket.onmessage = null;
                    socket.close();
               });
               handledEventsRef.current.clear();
               socketsRef.current = [];
          };
     }, [location.pathname]);
};
