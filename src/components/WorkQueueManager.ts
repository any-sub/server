import { Inject, Injectable, OnInit } from "@tsed/di";
import { NoFreeWorkerAvailableError, WorkerManager } from "./WorkerManager";
import { Work } from "@any-sub/worker-transport";
import { Logger } from "@tsed/logger";

@Injectable()
export class WorkQueueManager implements OnInit {
  @Inject() workerManager: WorkerManager;
  @Inject() logger: Logger;

  private readonly queue: Work[] = [];

  public $onInit(): void {
    setInterval(() => {
      this.consumeQueue();
    }, 100);
  }

  public enqueue(work: Work) {
    const isNotQueued = this.queue.findIndex((q) => q.id === work.id) === -1;
    if (isNotQueued) {
      this.queue.push(work);
    }
  }

  private consumeQueue() {
    try {
      while (this.queue.length) {
        this.workerManager.requestWork(this.queue[0]);
        this.queue.splice(0, 1);
      }
    } catch (e) {
      if (!(e instanceof NoFreeWorkerAvailableError)) {
        this.logger.error(e);
      }
    }
  }
}
