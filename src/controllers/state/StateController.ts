import { Controller, Inject } from "@tsed/di";
import { Get, Tags } from "@tsed/schema";
import { JobStatesRepository } from "../../generated/prisma";

@Controller("/states")
@Tags("State")
export class StateController {
  @Inject() jobStateRepo: JobStatesRepository;

  @Get()
  public getAllStateUpdates() {
    return this.jobStateRepo.findMany({
      orderBy: {
        created: "desc"
      }
    });
  }
}
