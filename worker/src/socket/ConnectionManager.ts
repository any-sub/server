import { Inject, Injectable, ProviderScope, Scope } from "@tsed/di";
import { Logger } from "@tsed/logger";
import { SocketClient } from "./Socket";

@Injectable()
@Scope(ProviderScope.SINGLETON)
export class ConnectionManager {
  @Inject() logger: Logger;
  @Inject() client: SocketClient;

  private static RETRY_WAIT = 1000 * 1;
  private static MAX_RETRIES = 5;
  private retries = 0;

  public async connect() {
    try {
      await this.client.connect();
      this.retries = 0;
    } catch (err) {
      this.logger.error(err);
      await this.retry();
    }
  }

  private async retry() {
    if (++this.retries <= ConnectionManager.MAX_RETRIES) {
      this.logger.info(`Socket connection retrying attempt #${this.retries}`);
      await delay(ConnectionManager.RETRY_WAIT);
      await this.connect();
    } else {
      throw new MaxRetryReachedError();
    }
  }
}

async function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export class MaxRetryReachedError extends Error {}
