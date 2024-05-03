import { ActivityLocation, ActivityResponse, Addition } from "@/services/Admin/Activities/Payload/response/activityResponse";
import React, { PropsWithChildren, useContext, useState } from "react";

interface IActivityBoundary{
    activity: ActivityResponse|null
    setActivity :(activity: ActivityResponse)=>void
    addition: Addition|null
    setAddition :(addition: Addition|null)=>void
    location :ActivityLocation|null
    setLocation : (location: ActivityLocation| null)=>void
    active:boolean,
    setActive: (active: boolean)=>void
}

const ActivityBoundaryContext = React.createContext<IActivityBoundary|null>(null)

const ActivityDetailBoundary=({ children }: PropsWithChildren<{}>) => {
    const [activity, setActivity] = useState<ActivityResponse | null>(null);
    const [addition, setAddition] = useState<Addition | null>(null);
    const [location, setLoaction] = useState<ActivityLocation| null>(null)
    const [active, setActive] =useState(false)

    return(
        <ActivityBoundaryContext.Provider value={{
            activity,
            setActivity,
            addition,
            setAddition,
            location,
            setLocation: setLoaction,
            active,
            setActive
        }}>
            {children}
        </ActivityBoundaryContext.Provider>
    )

}

const useActivityBoundary=()=>{
    const context = useContext(ActivityBoundaryContext)
  if (context === null) {
    throw new Error(
      "useActivityBoundary must be used within a ActivityBoundaryContext"
    )
  }
  return context
}

export {useActivityBoundary, ActivityDetailBoundary}