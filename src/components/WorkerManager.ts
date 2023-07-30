import { Injectable } from "@tsed/di";
import { Worker } from "../models";
import { Work } from "@any-sub/worker-transport";

@Injectable()
export class WorkerManager {
  private workers: Map<string, Worker> = new Map();

  public attach(worker: Worker) {
    this.workers.set(worker.id, worker);
  }

  public detach(workerId: string) {
    this.workers.delete(workerId);
  }

  public release(workerId: string) {
    this.workers.get(workerId)?.release();
  }

  public requestWork(work: Work) {
    for (const [, worker] of this.workers) {
      if (worker.isFree) {
        return worker.requestWork(work);
      }
    }
    throw new NoFreeWorkerAvailableError();
  }
}

export class NoFreeWorkerAvailableError extends Error {}
