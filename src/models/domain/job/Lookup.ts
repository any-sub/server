import { LookupMode } from "../../../generated/prisma";
import { Enum, Property, Required } from "@tsed/schema";

export class Lookup {
  @Property(String)
  @Enum(LookupMode)
  @Required()
  mode: LookupMode;

  @Property(String)
  @Required()
  value: string;
}
