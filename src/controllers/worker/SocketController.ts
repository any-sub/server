import { Controller, Inject } from "@tsed/di";
import { WorkerSocketService } from "../../service";

@Controller("/")
export class SocketController {
  @Inject() workerService: WorkerSocketService;
}
