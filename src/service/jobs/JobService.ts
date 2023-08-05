import { Agenda, Every } from "@tsed/agenda";
import { Inject } from "@tsed/di";
import { Logger } from "@tsed/logger";
import { WorksRepository, WorkStatus } from "../../generated/prisma";
import { WorkMapper } from "../../mappers/WorkMapper";
import { WorkQueueManager } from "../../components";
import { WorkJob } from "./WorkJob";
import { JobDelegator } from "../../delegators/JobDelegator";
import { Job } from "../../models";

@Agenda({ namespace: "schedule" })
export class JobService {
  @Inject() logger: Logger;
  @Inject() queueManager: WorkQueueManager;
  @Inject() workMapper: WorkMapper;
  @Inject() jobDelegator: JobDelegator;
  @Inject() worksRepo: WorksRepository;

  @Every("10 minutes", { name: "work" })
  public async scheduleWork() {
    try {
      let jobs: Job[] = [];
      let skip = 0;
      do {
        jobs = await this.jobDelegator.getAll({ skip });
        for (const job of jobs) {
          const work = await this.createWork(job);
          await this.setWorkStatus(work, this.queueManager.enqueue(work));
        }
        skip += jobs.length;
      } while (jobs.length > 0);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async createWork(job: Job): Promise<WorkJob> {
    const transportWork = this.workMapper.toTransport(job);
    await this.worksRepo.create({
      data: {
        id: transportWork.work.id,
        jobId: transportWork.id
      }
    });
    return transportWork;
  }

  private async setWorkStatus(work: WorkJob, queued: boolean) {
    const status = queued ? WorkStatus.QUEUED : WorkStatus.FAILED_TO_QUEUE;
    await this.worksRepo.update({
      where: {
        id: work.work.id
      },
      data: {
        status
      }
    });
  }
}
