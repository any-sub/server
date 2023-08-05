import { WorkType } from "../../../generated/prisma";
import { Enum, Format, Property, Required } from "@tsed/schema";
import { JobSource } from "./JobSource";
import { JobConsume } from "./JobConsume";
import { JobReport } from "./JobReport";

export class Job {
  @Property(String)
  @Format("uuid")
  id: string;

  @Property(String)
  @Required()
  name: string;

  @Property(String)
  @Enum(WorkType)
  @Required()
  type: WorkType;

  @Property(JobSource)
  @Required()
  source: JobSource;

  @Property(JobConsume)
  @Required()
  consume: JobConsume;

  @Property(JobReport)
  @Required()
  report?: JobReport;
}
