import { RiceVariety } from "../models/season-model"

export type AddSeasonModel = {
    "name": string,
    "description" : string,
    "startDate" : string,
    "endDate": string,
    "Rice" : RiceVariety
}