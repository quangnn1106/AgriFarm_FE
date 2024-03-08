/* eslint-disable react-hooks/rules-of-hooks */

import { Land, RiceVariety, Season, SeasonModel } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import getListSeasonApi from "./getSeasonsApi";
import { useSession } from "next-auth/react";
import UseAxiosAuth from "@/utils/axiosClient";
import { useState } from "react";

const getSeasonDetailApi:( id : any) => Promise<SeasonModel> = async (id) => {
    // get id user
  const { data: session } = useSession();
  const sideId = session?.user.userInfo.siteId;
  const http = UseAxiosAuth();

  const [seasons, setSeasons] = useState<SeasonModel[]>([]);

    try {
        const responseData = await getListSeasonApi(sideId, http);
        setSeasons(responseData?.data as SeasonModel[]);
        let item: SeasonModel = {};
        seasons.forEach(element => {
            if (element.id == id) {
                item.id = element.id;
                item.title = element.description;
                item.startIn = element.startIn;
                item.endIn = element.endIn;
                item.description = element.description;
            }   
        });
        return item;
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