import { Inject, Injectable, OnInit } from "@tsed/di";
import { NoFreeWorkerAvailableError, WorkerManager } from "./WorkerManager";
import { Logger } from "@tsed/logger";
import { WorkJob } from "../service";

@Injectable()
export class WorkQueueManager implements OnInit {
  @Inject() workerManager: WorkerManager;
  @Inject() logger: Logger;

  private readonly queue: WorkJob[] = [];

  public $onInit(): void {
    setInterval(() => {
      this.consumeQueue();
    }, 100);
  }

  public enqueue(workJob: WorkJob): boolean {
    const isNotQueued = this.queue.findIndex((q) => q.id === workJob.id) === -1;
    if (isNotQueued) {
      this.queue.push(workJob);
      return true;
    }
    return false;
  }

  private consumeQueue() {
    try {
      while (this.queue.length) {
        this.workerManager.requestWork(this.queue[0].work);
        this.queue.splice(0, 1);
      }
    } catch (e) {
      if (!(e instanceof NoFreeWorkerAvailableError)) {
        this.logger.error(e);
      }
    }
  }
}
