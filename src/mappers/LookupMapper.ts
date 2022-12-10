import { Injectable } from "@tsed/di";
import { LookupMetaModel } from "../generated/prisma";
import { Lookup } from "../models/domain/lookup/Lookup";

@Injectable()
export class LookupMapper {
  public toDomain<T extends Lookup>(lookup: T, model: LookupMetaModel): T {
    lookup.name = model.name;
    lookup.enabled = model.enabled;
    lookup.frequency = model.frequency;
    return lookup;
  }
}
