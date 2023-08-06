import { Injectable } from "@tsed/di";
import { JobModel } from "../generated/prisma";
import { ConsumeParts, Job, JobConsume, JobReport, JobSource, Lookup, Report } from "../models";

@Injectable()
export class JobMapper {
  public toDomain(model: JobModel): Job;
  public toDomain(model: JobModel | null | undefined): Job | null;
  public toDomain(model: JobModel | null | undefined): Job | null {
    if (!model) {
      return null;
    }

    const job = new Job();
    job.id = model.id;
    job.type = model.type;
    job.name = model.name;

    job.source = new JobSource();
    job.source.type = model.sourceType;
    job.source.location = model.sourceLocation;

    job.consume = new JobConsume();
    if (model.consumeMode && model.consumeValue) {
      job.consume.lookup = new Lookup();
      job.consume.lookup.mode = model.consumeMode;
      job.consume.lookup.value = model.consumeValue;
    }
    job.consume.parts = new ConsumeParts();
    if (model.consumeTitleMode && model.consumeTitleValue) {
      job.consume.parts.title = new Lookup();
      job.consume.parts.title.mode = model.consumeTitleMode;
      job.consume.parts.title.value = model.consumeTitleValue;
    }
    if (model.consumeDescriptionMode && model.consumeDescriptionValue) {
      job.consume.parts.description = new Lookup();
      job.consume.parts.description.mode = model.consumeDescriptionMode;
      job.consume.parts.description.value = model.consumeDescriptionValue;
    }
    if (model.consumeImageMode && model.consumeImageValue) {
      job.consume.parts.image = new Lookup();
      job.consume.parts.image.mode = model.consumeImageMode;
      job.consume.parts.image.value = model.consumeImageValue;
    }
    if (model.consumeUrlMode && model.consumeUrlValue) {
      job.consume.parts.url = new Lookup();
      job.consume.parts.url.mode = model.consumeUrlMode;
      job.consume.parts.url.value = model.consumeUrlValue;
    }
    job.report = new JobReport();
    if (model.reportTitleMatch || model.reportTitleTemplate) {
      job.report.title = new Report();
      job.report.title.match = model.reportTitleMatch ?? undefined;
      job.report.title.template = model.reportTitleTemplate ?? undefined;
    }
    if (model.reportDescriptionMatch || model.reportDescriptionTemplate) {
      job.report.description = new Report();
      job.report.description.match = model.reportDescriptionMatch ?? undefined;
      job.report.description.template = model.reportDescriptionTemplate ?? undefined;
    }
    if (model.reportImageMatch || model.reportImageTemplate) {
      job.report.image = new Report();
      job.report.image.match = model.reportImageMatch ?? undefined;
      job.report.image.template = model.reportImageTemplate ?? undefined;
    }
    if (model.reportUrlMatch || model.reportUrlTemplate) {
      job.report.url = new Report();
      job.report.url.match = model.reportUrlMatch ?? undefined;
      job.report.url.template = model.reportUrlTemplate ?? undefined;
    }

    return job;
  }

  public toModel(job: Job): JobModel {
    const model = new JobModel();
    model.type = job.type;
    model.name = job.name;

    model.sourceType = job.source.type;
    model.sourceLocation = job.source.location;
    model.consumeMode = job.consume.lookup?.mode ?? null;
    model.consumeValue = job.consume.lookup?.value ?? null;
    model.consumeTitleMode = job.consume.parts?.title?.mode ?? null;
    model.consumeTitleValue = job.consume.parts?.title?.value ?? null;
    model.consumeDescriptionMode = job.consume.parts?.description?.mode ?? null;
    model.consumeDescriptionValue = job.consume.parts?.description?.value ?? null;
    model.consumeImageMode = job.consume.parts?.image?.mode ?? null;
    model.consumeImageValue = job.consume.parts?.image?.value ?? null;
    model.consumeUrlMode = job.consume.parts?.url?.mode ?? null;
    model.consumeUrlValue = job.consume.parts?.url?.value ?? null;
    model.reportTitleMatch = job.report?.title.match ?? null;
    model.reportTitleTemplate = job.report?.title.template ?? null;
    model.reportDescriptionMatch = job.report?.description.match ?? null;
    model.reportDescriptionTemplate = job.report?.description.template ?? null;
    model.reportImageMatch = job.report?.image.match ?? null;
    model.reportImageTemplate = job.report?.image.template ?? null;
    model.reportUrlMatch = job.report?.url.match ?? null;
    model.reportUrlTemplate = job.report?.url.template ?? null;

    return model;
  }
}
