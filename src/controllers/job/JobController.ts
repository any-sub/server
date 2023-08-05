import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import { JobDelegator } from "../../delegators/JobDelegator";
import { JobMapper } from "../../mappers/JobMapper";

@Controller("/job")
export class JobController {
  @Inject() jobDelegator: JobDelegator;
  @Inject() jobMapper: JobMapper;

  @Get()
  public async getJobs() {
    return (
      await this.jobDelegator.findJobs({
        // orderBy: {
        //   name: "asc"
        // }
      })
    ).map((jobModel) => this.jobMapper.toDomain(jobModel));
  }
}
