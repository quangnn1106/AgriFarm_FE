import { RiceVariety } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";


const fetchListRiceVarietyData = async () => {
    try {
        const riceVarietyList : RiceVariety[] = [];
        for (let i = 0; i < 10; i++) {
            riceVarietyList.push({
                id: 'IDA'+i,
                name: 'Tai Nguyen',
                type: 'Short',
                description: '3 months'
            });
        }
        return riceVarietyList;

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