import { Description, For, Format, Property } from "@tsed/schema";

export class Report {
  @Property(String)
  @Format("regex")
  match?: string;

  @Property(String)
  @Description("Handlebars template")
  template?: string;
}
