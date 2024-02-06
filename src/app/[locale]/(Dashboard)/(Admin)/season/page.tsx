'use client';

import { useState } from "react";
import SeasonTableComponent from "./component/Table/table";
import { SeasonModel } from "./models/season-model";



type Props = {};
const SeasonManagement = (props: Props) => {

    const [data, setData] = useState<SeasonModel[]>([]);
    const [loading, setLoading] = useState(false);

    const exampleData: SeasonModel[] = [];
    // for (let i = 0; i < 20; i++ ) {
    //     exampleData.push({
    //         id: "ID"+i,
    //         name: "Spring",
    //         startDate: "20/01/2024",
    //         endDate: "20/4/2024",
    //         status: "In progress",
    //         land: []
    //     })
    //     if (i == 20) {
    //         setLoading(false)
    //     }
    // }

    setData(exampleData);

    return (
        <><SeasonTableComponent data={data} loading={loading} />
        </>
    )
};
export default SeasonManagement;