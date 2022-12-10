import { Inject, Injectable } from "@tsed/di";
import { SingleHtmlElementLookupModel } from "../generated/prisma";
import { SelectorType } from "../models/domain/lookup/Lookup";
import { SingleHtmlElementLookup } from "../models/domain/lookup/SingleHtmlElementLookup";
import { LookupMapper } from "./LookupMapper";

@Injectable()
export class SingleHtmlElementLookupMapper {
  @Inject() private lookupMapper: LookupMapper;

  public toDomain(model: SingleHtmlElementLookupModel): SingleHtmlElementLookup {
    const lookup = this.lookupMapper.toDomain(new SingleHtmlElementLookup(), model.meta);
    lookup.url = model.url;
    lookup.selector = model.selector;
    lookup.selectorType = model.selectorType as SelectorType;
    lookup.expression = model.expression ? new RegExp(model.expression) : undefined;
    return lookup;
  }
}
