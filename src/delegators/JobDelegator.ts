import { Inject, Injectable } from "@tsed/di";
import { JobsRepository } from "../generated/prisma";
import { Prisma } from "@prisma/client";
import { Job } from "../models";
import { JobMapper } from "../mappers/JobMapper";

@Injectable()
export class JobDelegator {
  @Inject() jobsRepo: JobsRepository;
  @Inject() jobMapper: JobMapper;

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

  public async getAll(opts: {
    skip?: number;
    take?: number;
    orderBy?: { name?: Prisma.SortOrder; created?: Prisma.SortOrder };
  }): Promise<Job[]> {
    return (
      await this.jobsRepo.findMany({
        take: 10,
        skip: 0,
        ...opts,
        include: this.fullJobInclude
      })
    ).map((jobModel) => this.jobMapper.toDomain(jobModel));
  }

  public async get(jobId: string) {
    return this.jobMapper.toDomain(
      await this.jobsRepo.findUnique({
        where: {
          id: jobId
        },
        include: this.fullJobInclude
      })
    );
  }

  public async create(job: Job) {
    return this.jobMapper.toDomain(
      await this.jobsRepo.create({
        data: this.jobMapper.toCreate(job),
        include: this.fullJobInclude
      })
    );
  }
}
