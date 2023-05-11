import { Agenda, Every } from "@tsed/agenda";
import { Inject } from "@tsed/di";
import { WorkerManager } from "../../components";
import { Logger } from "@tsed/logger";
import { WorkParser } from "@any-sub/worker-transport";

@Agenda({ namespace: "schedule" })
export class JobService {
  @Inject() logger: Logger;
  @Inject() workerManager: WorkerManager;

  @Every("5 seconds", { name: "work" })
  async scheduleWork() {
    try {
      this.workerManager.requestWork(WorkParser.parse({ id: "4ea57865-ef03-4bac-94a0-8fb93fcf5bff", type: "http" }));
    } catch (err) {
      this.logger.debug(err);
    }
  }
}
