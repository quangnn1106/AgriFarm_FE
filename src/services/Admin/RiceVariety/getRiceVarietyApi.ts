
import { Seed } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const fetchListRiceVarietyData: (
    siteId?: string | null,
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<Seed[]>> = async (siteId, http) => {
    try {
        const res = await http?.get(`/seed/farm-seeds/get`, {
            params: {
              siteId: siteId
            }
        });
        // const riceVarietyList : RiceVariety[] = [];
        // for (let i = 0; i < 10; i++) {
        //     riceVarietyList.push({
        //         id: 'IDA'+i,
        //         name: 'Tai Nguyen',
        //         stock: 20,
        //         description: 'Bạn hãy trồng lúa này trong 3 tháng, sẽ được hạt gạo thơm, dẻo ngon nhất Việt Nam'
        //     });
        // }
        // return riceVarietyList;
        return res?.data;

    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}
export default fetchListRiceVarietyData;