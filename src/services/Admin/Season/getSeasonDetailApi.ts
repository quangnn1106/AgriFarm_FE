/* eslint-disable react-hooks/rules-of-hooks */

import SeasonModelDetail, { Land, RiceVariety, Season, SeasonModel } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import getListSeasonApi from "./getSeasonsApi";
import { useSession } from "next-auth/react";
import UseAxiosAuth from "@/utils/axiosClient";
import { useState } from "react";
import { AxiosInstance } from "axios";
import HttpResponseCommon from "@/types/response";

const getSeasonDetailApi:(
    http?: AxiosInstance | null,
    seasonId?: string | null) => Promise<HttpResponseCommon<SeasonModelDetail  | [] | undefined>> = async (http, seasonId) => {

    try {
        const responseData = await http?.get(`/cult/seasons/get`, {
            params: {
              id: seasonId,
            }
            // headers: {
            //   pageSize: 4,
            //   pageNumber: 1
            // }
          });
          //console.log('response seasonDetail: ', responseData?.data.data);
        return responseData?.data;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
            
        }
    }
}
export default getSeasonDetailApi;