
export function getRole(num: number){
    switch(num){
        case 0:
            return""
        case 1:
            return"Assigner"
        case 2:
            return"Assignee"
        case 3:
            return"Inspector"
        default:
            return""
    }
}