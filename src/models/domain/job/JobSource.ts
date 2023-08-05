import { SourceType } from "../../../generated/prisma";
import { Enum, Format, Property, Required } from "@tsed/schema";

export class JobSource {
  @Property(String)
  @Enum(SourceType)
  @Required()
  type: SourceType;

  @Property(String)
  @Format("uri")
  @Required()
  location: string;
}
