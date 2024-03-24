import {ActivityDescription} from "@/services/Admin/Activities/Payload/response/activities"

export interface CreateActivityForm {
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
