import {ActivityDescription} from "@/types/activities"

export interface CreateForm {
  title: string;
  duration: string[];
  unit: string;
  type: string;
  descriptions: ActivityDescription[];
  workers: string[];
  inspectors: string[];
  locationId: string;
  seasonId: string;
  addition: any;
}
