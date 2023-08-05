import { LookupMode, SourceType, WorkType } from "../../../generated/prisma";

export class Job {
  id: UUID;
  name: string;
  type: WorkType;
  source: JobSource;
  consume: JobConsume;
  report?: JobReport;
}

export class JobSource {
  type: SourceType;
  location: string;
}

export class JobConsume {
  lookup: Lookup;
  parts: ConsumeParts;
}

export class Lookup {
  mode: LookupMode;
  value: string;
}

export class ConsumeParts {
  title: Lookup;
  description: Lookup;
  image: Lookup;
  url: Lookup;
}

export class JobReport {
  title: Report;
  description: Report;
  image: Report;
  url: Report;
}

export class Report {
  match?: string;
  template?: string;
}
