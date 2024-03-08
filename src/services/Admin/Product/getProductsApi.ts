import { Land, Product } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

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
    try {
      const res = await http?.get(`/cult/products/get`, {
        params: {
          siteId: siteId,
          seasonId: seasonId
        }
        // headers: {
        //   pageSize: 4,
        //   pageNumber: 1
        // }
      });
      console.log('response staffsService: ', res);
      console.log(http);
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

// const fetchListProductData: (
//     seasonId?: string | null, 
//   ) => Promise<Product[]> = async (seasonId) => {
//     try {
//       const productList: Product[] = [];


//      if (seasonId == '658a0871-9a10-429b-94e0-fe9abc557982') {
//       console.log("Dung dieu kien")
//       productList.push({
//         id: '0a85bf2f-11b4-4311-be1e-13eace17820f',
//         name: 'Seed 02 (Land 01)',
//         totalQuantity: 4,
//         land: {
//           id: '4bbed319-8215-43cc-ac6f-41facdb1892e',
//           name: 'Land 01',
//         },
//         seed: {
//           id: 'e60d3ec5-dd7e-4b3a-9a27-40e35d7152bd',
//           name: 'Seed 02'
//         },
//         season: {
//           id: '658a0871-9a10-429b-94e0-fe9abc557982',
//           name: 'Spring'
//         }
//       });
//       productList.push({
//         id: '8f542d88-ae0a-4d80-bde2-2f96835a7dc3',
//         name: 'Seed 01 (Land 01)',
//         totalQuantity: 4,
//         land: {
//           id: '4bbed319-8215-43cc-ac6f-41facdb1892e',
//           name: 'Land 01',
//         },
//         seed: {
//           id: 'fbd4062d-8c46-4540-bfa2-ee836fc80887',
//           name: 'Seed 02'
//         },
//         season: {
//           id: '658a0871-9a10-429b-94e0-fe9abc557982',
//           name: 'Spring'
//         }
//       });
//       productList.push({
//         id: 'b0814c5e-a62c-4e03-b03b-7ad2961d4366',
//         name: 'Seed 02 (Land 02)',
//         totalQuantity: 4,
//         land: {
//           id: '2cfd18cb-6418-4f00-9a82-2d5a55246b7d',
//           name: 'Land 02',
//         },
//         seed: {
//           id: 'e60d3ec5-dd7e-4b3a-9a27-40e35d7152bd',
//           name: 'Seed 02'
//         },
//         season: {
//           id: '658a0871-9a10-429b-94e0-fe9abc557982',
//           name: 'Spring'
//         }
//       });
//      } 
//       return productList;

//     } catch (error: unknown) {
//         // Assert the type of error to be an instance of Error
//         if (error instanceof Error) {
//             throw new Error(`Error calling API: ${error.message}`);
//         } else {
//             throw new Error(`Unknown error occurred: ${error}`);
//         }
//     }
// }

export default fetchListProductData;


