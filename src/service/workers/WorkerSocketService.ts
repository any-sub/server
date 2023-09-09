import { Args, Input, IO, Nsp, Socket, SocketService } from "@tsed/socketio";
import * as SocketIO from "socket.io";
import { Inject } from "@tsed/di";
import { WorkerManager } from "../../components";
import { Worker } from "../../models";
import { Logger } from "@tsed/logger";
import { ResultHandler } from "../result/ResultHandler";
import { StateParser, WorkErrorParser } from "@any-sub/worker-transport";
import { WorkDelegator } from "../../delegators/WorkDelegator";

@SocketService("/workers")
export class WorkerSocketService {
  @Inject() logger: Logger;
  @Inject() workerManager: WorkerManager;
  @Inject() workDelegator: WorkDelegator;
  @Inject() resultHandler: ResultHandler;
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
  public async handleResult(@Args(0) dataStr: string, @Socket socket: Socket) {
    try {
      this.workerManager.release(socket.id);
      const data = JSON.parse(dataStr);
      try {
        await this.resultHandler.handle(StateParser.parse(data));
      } catch (e) {
        if (data.id) {
          await this.workDelegator.fail(data.id, "RESULT_HANDLE_ERROR");
        }
        this.workerManager.release(socket.id);
        this.logger.warn(e);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Input("error")
  public async handleError(@Args(0) data: string, @Socket socket: Socket) {
    try {
      const error = WorkErrorParser.parse(JSON.parse(data));
      if (error.id) {
        await this.workDelegator.fail(error.id, error.code);
      }
      this.workerManager.release(socket.id);
      this.logger.warn(error?.message ?? error.code);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
