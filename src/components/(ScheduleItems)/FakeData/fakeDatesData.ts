import { RECORD_ADDITION, USING_ADDITION } from "@/constants/additionType";
import { Addition } from "@/services/Admin/Activities/Payload/response/activities";





export const additionsData: Addition[] = [
  {
    id: "zsadasddkas-sadbsadnjsan",
    type: RECORD_ADDITION,
    data: {title: "abc", meta: "go"}
  },
  {
    id: "xasndjandkas-sadbsadnjsan",
    type: USING_ADDITION,
    data: {title: "xyz"}
  }
];
