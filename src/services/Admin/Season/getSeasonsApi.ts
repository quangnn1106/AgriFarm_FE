import { SeasonModel } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";

const getListSeasonApi = async () => {
    try {
        const seasonList : SeasonModel[] = [];
        for (let i = 0; i < 4; i++) {
            seasonList.push({
              id: 'ID1' + i,
              name: 'Spring',
              startDate: '20/01/2024',
              endDate: '20/4/2024',
              status: 'Done',
              landID: ['ID1', 'ID2']
            });
            seasonList.push({
              id: 'ID2' + i,
              name: 'Spring',
              startDate: '20/01/2024',
              endDate: '20/4/2024',
              status: 'Cancel',
              landID: ['ID2', 'ID4']
            });
            seasonList.push({
              id: 'ID3' + i,
              name: 'Spring',
              startDate: '20/01/2024',
              endDate: '20/4/2024',
              status: 'Pending',
              landID: ['ID2', 'ID4']
            });
            seasonList.push({
              id: 'ID4' + i,
              name: 'Spring',
              startDate: '20/01/2024',
              endDate: '20/4/2024',
              status: 'In progress',
              landID: ['ID2', 'ID4']
            });
        }
        return seasonList;

    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}
export default getListSeasonApi;