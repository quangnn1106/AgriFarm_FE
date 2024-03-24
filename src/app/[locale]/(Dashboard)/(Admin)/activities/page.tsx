"use client"

import ActivityList from "@/components/(ScheduleItems)/ActivityList/activityList";
import { useAppSelector } from "@/redux/hooks";
import { getActivitiesService } from "@/services/Admin/Activities/activityService";
import { ActivityResponse } from "@/services/Admin/Activities/Payload/response/activities";
import UseAxiosAuth from "@/utils/axiosClient";
import { Select } from "antd";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";


const ActivityListPage = (props: any) => {
    const [activities, setActivities] = useState<ActivityResponse[] | []>([]);
    const http = UseAxiosAuth();
    const [seasons, setSeasons] = useState([
        {
          label: "Fall",
          value: "33177d84-7368-40d4-882d-8d7fc00ff32b",
        },
        { 
          label: "Spring",
          value: "9929dad3-61ae-49c7-a398-7995357dca1e",
        }
      ]);

    const [selectedSeason, setSelectedSeason] = useState<string>(seasons[1].value)
  
    const [isFetching, setIsFetching] = useState<boolean>(true);
  
    const fetchActivities = async (http: AxiosInstance, seasonId: string) => {
      try {
        console.log("Fetching data..");
        const responseData = await getActivitiesService(seasonId, http);
        console.log("Data here: ", responseData);
        setActivities(responseData?.data as ActivityResponse[]);
        setIsFetching(false);
      } catch (error) {
        console.error("Error calling API activities:", error);
      }
    };
  
    useEffect(() => {
      fetchActivities(http, selectedSeason);
    }, [http, selectedSeason]);
  
  
    const LIMIT = 5;
    const page = props?.searchParams?.page ?? 1;
  
    //const data = activitiesData;
  
    return (
      <>
        <Select
            options={seasons}
            style={{width: '100%', backgroundColor : 'green'}}
            defaultValue={selectedSeason}
            onChange={(e)=>setSelectedSeason(e)}
        >
            
        </Select>
        <ActivityList list={activities} isFetching={isFetching} />
      </>
    );
  };
  
  export default ActivityListPage;