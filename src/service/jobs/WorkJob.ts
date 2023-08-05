import { Work } from "@any-sub/worker-transport";

export type WorkJob = {
  id: UUID;
  work: Work;
};
