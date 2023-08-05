import { Injectable } from "@tsed/di";
import { JobModel } from "../generated/prisma";
import { ConsumeParts, Job, JobConsume, JobReport, JobSource, Lookup, Report } from "../models";
import { Prisma } from ".prisma/client";
import { partMapper } from "../utils/TypeUtils";

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
    job.source.type = model.source.type;
    job.source.location = model.source.location;

    job.consume = new JobConsume();
    if (model.consume.lookup) {
      job.consume.lookup = new Lookup();
      job.consume.lookup.mode = model.consume.lookup.mode;
      job.consume.lookup.value = model.consume.lookup.value;
    }
    job.consume.parts = new ConsumeParts();
    partMapper((part) => {
      const modelPart = model.consume.parts[part];
      if (modelPart) {
        job.consume.parts[part] = new Lookup();
        job.consume.parts[part].mode = modelPart.mode;
        job.consume.parts[part].value = modelPart.value;
      }
    });

    if (model.report) {
      const jobReport = (job.report = new JobReport());
      partMapper((part) => {
        const reportPart = model.report?.[part];
        if (reportPart) {
          jobReport.title = new Report();
          jobReport.title.match = reportPart.match ?? undefined;
          jobReport.title.template = reportPart.template ?? undefined;
        }
      });
    }

    return job;
  }

  public toCreate(job: Job): Prisma.JobCreateInput {
    return {
      name: job.name,
      type: job.type,
      source: {
        create: {
          type: job.source.type,
          location: job.source.location
        }
      },
      consume: {
        create: {
          lookup: job.consume.lookup
            ? {
                create: {
                  mode: job.consume.lookup.mode,
                  value: job.consume.lookup.value
                }
              }
            : {},
          parts: job.consume.parts
            ? {
                create: {
                  ...partMapper((part) => {
                    return job.consume.parts[part]
                      ? {
                          create: {
                            mode: job.consume.parts[part].mode,
                            value: job.consume.parts[part].value
                          }
                        }
                      : {};
                  })
                }
              }
            : {}
        }
      },
      report: job.report
        ? {
            create: {
              ...partMapper((part) => {
                return job.report?.[part]
                  ? {
                      create: {
                        match: job.report[part].match,
                        template: job.report[part].template
                      }
                    }
                  : {};
              })
            }
          }
        : {}
    };
  }
}
