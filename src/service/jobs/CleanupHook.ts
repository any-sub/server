import { Inject, Service } from "@tsed/di";
import { OnReady } from "@tsed/common";
import { WorkDelegator } from "../../delegators/WorkDelegator";

@Service()
export class CleanupHook implements OnReady {
  @Inject() workDelegator: WorkDelegator;

  public async $onReady() {
    await this.workDelegator.cleanup();
  }
}
