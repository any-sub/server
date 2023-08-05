import { Inject, Injectable } from "@tsed/di";
import { JobModel, JobsRepository } from "../generated/prisma";

@Injectable()
export class JobDelegator {
  @Inject() jobsRepo: JobsRepository;

  private readonly fullJobInclude = {
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
  };

  public async findJobs(opts: { skip?: number; take?: number }): Promise<JobModel[]> {
    return this.jobsRepo.findMany({
      take: 10,
      skip: 0,
      ...opts,
      include: this.fullJobInclude
    });
  }
}
