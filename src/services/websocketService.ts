import { toast } from "react-toastify";
import { showOSNotification } from "@/utils/notification";

type MessageHandler = (message: any) => void;
type ConnectionHandler = (status: "connected" | "disconnected") => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private connectionHandlers: ConnectionHandler[] = [];
  private status: "connected" | "disconnected" = "disconnected";

  getStatus() {
    return this.status;
  }

  connect(token: string) {
    if (!token) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("http", "ws");
    const url = baseUrl + "/ws/connect?token=Bearer " + token;
    
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.status = "connected";
      this.notifyConnectionStatus("connected");
    };

    this.ws.onclose = () => {
      this.status = "disconnected";
      this.notifyConnectionStatus("disconnected");
      setTimeout(() => this.connect(token), 60 * 1000);
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const handlers = this.messageHandlers.get(message.type) || [];
      handlers.forEach((handler) => handler(message));
    };

    this.ws.onerror = (error) => {
      console.warn("WebSocket error:", error);
    };
  }

  private notifyConnectionStatus(status: "connected" | "disconnected") {
    this.connectionHandlers.forEach((handler) => handler(status));
  }

  onConnectionChange(handler: ConnectionHandler) {
    this.connectionHandlers.push(handler);
  }

  subscribe(messageType: string, handler: MessageHandler) {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, []);
    }
    this.messageHandlers.get(messageType)?.push(handler);
  }

  unsubscribe(messageType: string, handler: MessageHandler) {
    const handlers = this.messageHandlers.get(messageType) || [];
    this.messageHandlers.set(
      messageType,
      handlers.filter((h) => h !== handler)
    );
  }
}

export const wsService = new WebSocketService();
