import { Agenda, Every } from "@tsed/agenda";
import { Inject } from "@tsed/di";
import { Logger } from "@tsed/logger";
import { JobModel, JobsRepository } from "../../generated/prisma";
import { WorkMapper } from "../../mappers/WorkMapper";
import { WorkQueueManager } from "../../components";

@Agenda({ namespace: "schedule" })
export class JobService {
  @Inject() logger: Logger;
  @Inject() queueManager: WorkQueueManager;
  @Inject() workMapper: WorkMapper;
  @Inject() jobRepository: JobsRepository;

  @Every("10 minutes", { name: "work" })
  public async scheduleWork() {
    try {
      let jobs: JobModel[] = [];
      let skip = 0;
      do {
        jobs = await this.findJobs(skip);
        for (const job of jobs) {
          this.queueManager.enqueue(this.workMapper.toTransport(job));
        }
        skip += jobs.length;
      } while (jobs.length > 0);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async findJobs(skip: number): Promise<JobModel[]> {
    return this.jobRepository.findMany({
      take: 10,
      skip,
      include: {
        source: true,
        consume: {
          include: {
            lookup: true,
            parts: {
              include: {
                title: true,
                image: true,
                description: true,
                url: true
              }
            }
          }
        },
        report: {
          include: {
            title: true,
            image: true,
            description: true,
            url: true
          }
        }
      }
    });
  }
}
