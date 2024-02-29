
import { RiceVariety } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import fetchListRiceVarietyData from "./getRiceVarietyApi";

const fetchRiceVarietyDetails = async ( id : any): Promise<RiceVariety> => {
    try {
        const listRiceVariety = await fetchListRiceVarietyData();
        let item: RiceVariety = {};
        listRiceVariety.forEach(element => {
            if (element.id?.includes(id)) {
                item = element;
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
export default fetchRiceVarietyDetails;