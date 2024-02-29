import { Land } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";



const fetchListLandData = async () => {
    try {
        const landList : Land[] = [];
        for (let i =0; i<4; i++) {
            landList.push({
              id: 'ID' + i,
              name: 'LandA',
              square: '38',
              description: 'ABC',
              riceVarietyID : 'IDA1'
            });
          }
          landList.push({
            id: 'IDX',
            name: 'LandX',
            square: '38',
            description: 'ABC',
            riceVarietyID : 'IDA2'
          })

        return landList;

    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}
export default fetchListLandData;