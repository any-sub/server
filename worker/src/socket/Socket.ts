import { Inject, Injectable } from "@tsed/di";
import { io, Socket } from "socket.io-client";
import { Logger } from "@tsed/logger";
import { SOCKET_URI } from "../config";

@Injectable()
export class SocketClient {
  @Inject() logger: Logger;

  private socket: Socket;

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        this.socket = io(SOCKET_URI);
      } else {
        this.socket.removeAllListeners();
      }

      this.socket.on("connect", () => {
        this.logger.info("Socket connected");
        resolve();
      });
      this.socket.on("disconnect", (reason, description) => {
        this.logger.warn(`Socket disconnected`);
        this.socket.close();
        reject({ reason, description });
      });
      this.socket.on("connect_error", (err) => {
        this.logger.warn("Socket connection error");
        this.socket.close();
        reject(err);
      });

      this.socket.connect();
    });
  }
}
