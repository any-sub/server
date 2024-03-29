import { Controller, Inject } from "@tsed/di";
import { Get, Tags } from "@tsed/schema";
import { PathParams } from "@tsed/common";
import { JobStatesRepository } from "../../generated/prisma";

@Controller("/jobs/:jobId/state")
@Tags("State")
export class JobStateController {
  @Inject() jobStateRepo: JobStatesRepository;

  @Get()
  public getJobState(@PathParams("jobId") jobId: string) {
    return this.jobStateRepo.findMany({
      where: {
        jobId
      },
      orderBy: {
        created: "desc"
      }
    });
  }
}
