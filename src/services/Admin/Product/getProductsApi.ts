import { Land, Product } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";
import { headers } from "next/headers";

export interface Pagination {
  CurrentPage: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}

const fetchListProductData: (
  http?: AxiosInstance | null,
  seasonId?: string | null,
  siteId?: string | null,
   
) => Promise<HttpResponseCommon<Product[]>> = async (http, seasonId, siteId) => {
      const res = await http?.get(`http://localhost/api/v1/cult/products/get`, {params: {
        seasonId: seasonId
      }, headers: {
        pageSize: 40
      }
  },
   );
      //console.log('response staffsService: ', res);
      return res?.data;
}

export default fetchListProductData;


