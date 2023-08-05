import { Report } from "./Report";
import { Property } from "@tsed/schema";

export class JobReport {
  @Property(Report)
  title: Report;

  @Property(Report)
  description: Report;

  @Property(Report)
  image: Report;

  @Property(Report)
  url: Report;
}
