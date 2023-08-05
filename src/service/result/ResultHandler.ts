import { Inject, Injectable } from "@tsed/di";
import { State } from "@any-sub/worker-transport";
import { Logger } from "@tsed/logger";
import { JobStateModel, JobStatesRepository, WorkModel, WorksRepository, WorkStatus } from "../../generated/prisma";
import { ResultUnit } from "@any-sub/worker-transport/src";

@Injectable()
export class ResultHandler {
  @Inject() logger: Logger;
  @Inject() workRepo: WorksRepository;
  @Inject() jobStateRepo: JobStatesRepository;

  public async handle(state: State) {
    const work = await this.findWorkJob(state);
    try {
      const existingState = await this.findExistingState(work, state);
      await this.createState(work, this.filterNewState(state, existingState));
      await this.updateWorkStatus(work, WorkStatus.FINISHED);
    } catch (handleError) {
      this.logger.error(`Failed to handle result for work "${work.id}"`, handleError);
      try {
        await this.updateWorkStatus(work, WorkStatus.FAILED, handleError.message);
      } catch (workStatusError) {
        this.logger.fatal(`Failed to set work "${work.id}" status to failed.`, workStatusError);
      }
    }
  }

  private async findWorkJob(state: State): Promise<WorkModel> {
    const work = await this.workRepo.findUnique({ where: { id: state.id } });
    if (!work) {
      throw new WorkNotFoundError(state.id);
    }
    return work;
  }

  private async findExistingState(work: WorkModel, state: State): Promise<JobStateModel[]> {
    return await this.jobStateRepo.findMany({
      where: {
        jobId: work.jobId,
        unitHash: {
          in: state.data.map((unit) => unit.hash)
        }
      }
    });
  }

  private filterNewState(state: State, existingState: JobStateModel[]) {
    return state.data.filter((unit) => !existingState.find((s) => unit.hash === s.unitHash));
  }

  private async createState(work: WorkModel, state: ResultUnit[]) {
    await this.jobStateRepo.collection.createMany({
      data: state.map((s) => ({
        jobId: work.jobId,
        unitHash: s.hash,
        title: s.title,
        description: s.description ?? "",
        image: s.image,
        url: s.url
      }))
    });
  }

  private async updateWorkStatus(work: WorkModel, status: WorkStatus, statusReason?: string) {
    return await this.workRepo.update({
      where: {
        id: work.id
      },
      data: {
        status,
        statusReason
      }
    });
  }
}

export class WorkNotFoundError extends Error {
  constructor(id: string) {
    super(`Work with ID "${id}" not found`);
  }
}
