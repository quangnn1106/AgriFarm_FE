import { RiceVariety } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";


const fetchListRiceVarietyData = async () => {
    try {
        const riceVarietyList : RiceVariety[] = [];
        for (let i = 0; i < 2; i++) {
            riceVarietyList.push({
                id: 'IDA1',
                name: 'Tai Nguyen',
                type: 'Short',
                description: '3 months'
            });
            riceVarietyList.push({
                id: 'IDA2',
                name: 'ST25',
                type: 'Short',
                description: '3 months'
            });
            riceVarietyList.push({
                id: 'IDA3',
                name: 'Thom lai',
                type: 'Short',
                description: '2.5 months'
            });
            riceVarietyList.push({
                id: 'IDA'+i+3,
                name: 'ST24',
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