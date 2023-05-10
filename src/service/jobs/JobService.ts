import { Agenda, Every } from "@tsed/agenda";
import { Inject } from "@tsed/di";
import { WorkerManager } from "../../components";
import { Logger } from "@tsed/logger";

@Agenda({ namespace: "schedule" })
export class JobService {
  @Inject() logger: Logger;
  @Inject() workerManager: WorkerManager;

  @Every("5 seconds", { name: "work" })
  async scheduleWork() {
    try {
      this.workerManager.requestWork(new Date());
    } catch (err) {
      this.logger.info(err);
    }
  }
}
