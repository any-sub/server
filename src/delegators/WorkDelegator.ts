import { Inject, Injectable } from "@tsed/di";
import { WorksRepository, WorkStatus } from "../generated/prisma";

@Injectable()
export class WorkDelegator {
  @Inject() workRepo: WorksRepository;

  public async cleanup() {
    await this.workRepo.updateMany({
      where: {
        status: WorkStatus.QUEUED
      },
      data: {
        status: WorkStatus.CANCELLED_ON_RESTART
      }
    });
  }
}
