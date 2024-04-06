
const massList = ["kg"]
const volumeList = ["l", "ml"]

export function getUnitList(type: string){
    switch(type){
        case "farm-seeds":
            return massList
        case "farm-equipments":
            return ["item"]
        case "farm-pesticides":
            return volumeList
        case "farm-fertilizers":
            return massList
        default:
            return [""]
    }
}