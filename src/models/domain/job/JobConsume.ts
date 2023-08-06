import { Lookup } from "./Lookup";
import { ConsumeParts } from "./ConsumeParts";
import { Property } from "@tsed/schema";

export class JobConsume {
  @Property(Lookup)
  lookup?: Lookup;

  @Property(ConsumeParts)
  parts?: ConsumeParts;
}
