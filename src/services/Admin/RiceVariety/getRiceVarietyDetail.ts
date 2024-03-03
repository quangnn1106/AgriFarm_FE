
import { Land, RiceVariety } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import fetchListRiceVarietyData from "./getRiceVarietyApi";

const fetchRiceVarietyDetails:( id : any) => Promise<RiceVariety> = async (id) => {
    try {
        const listRiceVariety = await fetchListRiceVarietyData();
        let item: RiceVariety = {
            "id":"",
            "name":"",
            "description":"",
            "type":""};
        listRiceVariety.forEach(element => {
            if (element.id == id) {
                item.id = element.id;
                item.name = element.name;
                item.type = element.type;
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
export default fetchRiceVarietyDetails;