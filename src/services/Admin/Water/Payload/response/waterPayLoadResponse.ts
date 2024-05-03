import { Position } from "@/services/SuperAdmin/Site/payload/response/sites";

export interface WaterResponse {
  id: string;
  name: string;
  description: string;
  notes: string;
  positions: Position[];
}
