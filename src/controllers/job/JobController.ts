import { Controller, Inject } from "@tsed/di";
import { Delete, Format, Get, Post, Returns, Summary, Tags } from "@tsed/schema";
import { JobDelegator } from "../../delegators/JobDelegator";
import { Job } from "../../models";
import { BodyParams, PathParams } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";

@Controller("/jobs")
@Tags("Job")
export class JobController {
  @Inject() jobDelegator: JobDelegator;

  @Get()
  @Summary("Get all jobs")
  @Returns(200, Array).Of(Job)
  public async getJobs() {
    return await this.jobDelegator.getAll({
      orderBy: {
        name: "asc"
      }
    });
  }

  @Post()
  @Summary("Create a job")
  @Returns(200, Job)
  public async createJob(@BodyParams() job: Job) {
    return await this.jobDelegator.create(job);
  }

  @Get("/:jobId")
  @Returns(200, Job)
  public async getJob(@PathParams("jobId") @Format("uuid") jobId: string) {
    const job = await this.jobDelegator.get(jobId);
    if (!job) {
      throw new NotFound(`Job with ID "${jobId}" not found.`);
    }
    return job;
  }

  @Delete("/:jobId")
  @Returns(200, Job)
  public async deleteJob(@PathParams("jobId") @Format("uuid") jobId: string) {
    await this.jobDelegator.delete(jobId);
  }
}
