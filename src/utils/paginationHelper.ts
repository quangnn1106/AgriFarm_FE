
import { PaginationResponse } from "@/types/pagination"
import { AxiosResponse } from "axios"

export const getPaginationResponse:(response: AxiosResponse)=>PaginationResponse =(response)=>{
    const page = JSON.parse(response.headers["x-pagination"])??null

    return page
}