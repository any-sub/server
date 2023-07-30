import { Args, Input, IO, Nsp, Socket, SocketService } from "@tsed/socketio";
import * as SocketIO from "socket.io";
import { Inject } from "@tsed/di";
import { WorkerManager } from "../../components";
import { Worker } from "../../models";
import { Logger } from "@tsed/logger";

@SocketService("/workers")
export class WorkerSocketService {
  @Inject() logger: Logger;
  @Inject() workerManager: WorkerManager;
  @IO() io: SocketIO.Server;
  @Nsp nsp: SocketIO.Namespace;

  // noinspection JSUnusedGlobalSymbols
  $onConnection(@Socket socket: SocketIO.Socket) {
    try {
      this.logger.debug(`Socket ${socket.id} connected`);
      this.workerManager.attach(new Worker(socket));
    } catch (e) {
      this.logger.error(e);
    }
  }

  // noinspection JSUnusedGlobalSymbols
  $onDisconnect(@Socket socket: SocketIO.Socket) {
    try {
      this.logger.debug(`Socket ${socket.id} disconnected`);
      this.workerManager.detach(socket.id);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Input("result")
  public handleResult(@Args(0) data: string, @Socket socket: Socket) {
    try {
      this.workerManager.release(socket.id);
      this.logger.info(data);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Input("error")
  public handleError(@Args(0) error: any, @Socket socket: Socket) {
    try {
      this.workerManager.release(socket.id);
      this.logger.error(error);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
