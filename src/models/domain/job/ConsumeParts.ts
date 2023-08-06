import { Lookup } from "./Lookup";
import { Property } from "@tsed/schema";

export class ConsumeParts {
  @Property(Lookup)
  title?: Lookup;

  @Property(Lookup)
  description?: Lookup;

  @Property(Lookup)
  image?: Lookup;

  @Property(Lookup)
  url?: Lookup;
}
