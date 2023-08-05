import { Injectable } from "@tsed/di";
import { Work, WorkParser } from "@any-sub/worker-transport";
import { v4 as uuid } from "uuid";
import { WorkJob } from "../service";
import { Job } from "../models";

@Injectable()
export class WorkMapper {
  public toTransport(job: Job): WorkJob {
    return {
      id: job.id,
      work: WorkParser.parse({
        id: uuid(),
        type: job.type,
        source: job.source,
        consume: job.consume,
        report: job.report
      } as Work)
    };
  }
}
