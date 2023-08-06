import { Inject, Injectable } from "@tsed/di";
import { JobsRepository } from "../generated/prisma";
import { Prisma } from "@prisma/client";
import { Job } from "../models";
import { JobMapper } from "../mappers/JobMapper";

@Injectable()
export class JobDelegator {
  @Inject() jobsRepo: JobsRepository;
  @Inject() jobMapper: JobMapper;

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
        where: {
          deleted: null
        }
      })
    ).map((jobModel) => this.jobMapper.toDomain(jobModel));
  }

  public async get(jobId: string) {
    return this.jobMapper.toDomain(
      await this.jobsRepo.findUnique({
        where: {
          id: jobId,
          deleted: null
        }
      })
    );
  }

  public async create(job: Job) {
    return this.jobMapper.toDomain(
      await this.jobsRepo.create({
        data: this.jobMapper.toModel(job)
      })
    );
  }

  public async delete(jobId: string) {
    const job = await this.get(jobId);
    if (job) {
      await this.jobsRepo.update({
        where: {
          id: jobId
        },
        data: {
          deleted: new Date()
        }
      });
    }
  }
}
