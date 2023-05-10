import * as SocketIO from "socket.io";

export class Worker {
  private readonly _id: string;
  private _isBusy: boolean = false;

  constructor(private socket: SocketIO.Socket) {
    this._id = socket.id;
  }

  get id(): string {
    return this._id;
  }

  get isBusy(): boolean {
    return this._isBusy;
  }

  get isFree(): boolean {
    return !this.isBusy;
  }

  public release() {
    if (this.isFree) {
      // throw new WorkerNotWorkingError();
    }
    this._isBusy = false;
  }

  public requestWork(work: any) {
    if (this.isBusy) {
      throw new WorkerBusyError();
    }
    this._isBusy = true;
    this.socket.emit("work", work);
  }
}

export class WorkerBusyError extends Error {}

export class WorkerNotWorkingError extends Error {}
