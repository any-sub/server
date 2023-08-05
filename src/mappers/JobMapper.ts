import { Injectable } from "@tsed/di";
import { JobModel } from "../generated/prisma";
import { ConsumeParts, Job, JobConsume, JobReport, JobSource, Lookup, Report } from "../models/domain/job/Job";

@Injectable()
export class JobMapper {
  public toDomain(model: JobModel): Job {
    const job = new Job();
    job.id = model.id;
    job.type = model.type;
    // job.name = model.name;

    job.source = new JobSource();
    job.source.type = model.source.type;
    job.source.location = model.source.location;

    job.consume = new JobConsume();
    if (model.consume.lookup) {
      job.consume.lookup = new Lookup();
      job.consume.lookup.mode = model.consume.lookup.mode;
      job.consume.lookup.value = model.consume.lookup.value;
    }
    job.consume.parts = new ConsumeParts();
    if (model.consume.parts.title) {
      job.consume.parts.title = new Lookup();
      job.consume.parts.title.mode = model.consume.parts.title.mode;
      job.consume.parts.title.value = model.consume.parts.title.value;
    }
    if (model.consume.parts.description) {
      job.consume.parts.description = new Lookup();
      job.consume.parts.description.mode = model.consume.parts.description.mode;
      job.consume.parts.description.value = model.consume.parts.description.value;
    }
    if (model.consume.parts.image) {
      job.consume.parts.image = new Lookup();
      job.consume.parts.image.mode = model.consume.parts.image.mode;
      job.consume.parts.image.value = model.consume.parts.image.value;
    }
    if (model.consume.parts.url) {
      job.consume.parts.url = new Lookup();
      job.consume.parts.url.mode = model.consume.parts.url.mode;
      job.consume.parts.url.value = model.consume.parts.url.value;
    }

    if (model.report) {
      job.report = new JobReport();
      if (model.report.title) {
        job.report.title = new Report();
        job.report.title.match = model.report.title.match ?? undefined;
        job.report.title.template = model.report.title.template ?? undefined;
      }
      if (model.report.description) {
        job.report.description = new Report();
        job.report.description.match = model.report.description.match ?? undefined;
        job.report.description.template = model.report.description.template ?? undefined;
      }
      if (model.report.image) {
        job.report.image = new Report();
        job.report.image.match = model.report.image.match ?? undefined;
        job.report.image.template = model.report.image.template ?? undefined;
      }
      if (model.report.url) {
        job.report.url = new Report();
        job.report.url.match = model.report.url.match ?? undefined;
        job.report.url.template = model.report.url.template ?? undefined;
      }
    }

    return job;
  }
}
