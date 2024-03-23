import SeasonModelDetail from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model"
import HttpResponseCommon from "@/types/response"
import { http } from "@/utils/config"
import { AxiosInstance } from "axios"


export interface CreateSeasonDto {
    title: string
    description: string
    startIn: string
    endIn: string
    cultivationDetail: CultivationDetail[]
  }
  
  export interface CultivationDetail {
    land: Land
    seed: Seed
  }
  
  export interface Land {
    id: string
    name: string
  }
  
  export interface Seed {
    id: string
    name: string
  }
  
export const createSeasonApi: (
    http: AxiosInstance | null,
    createSeasonDto?: CreateSeasonDto
) => Promise<HttpResponseCommon<SeasonModelDetail | undefined>> = async (
    http,
    createSeasonDto
) => {
    try {
        const res = await http?.post(`cult/seasons/post`, createSeasonDto);
        return res?.data;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
            
        }
    }
}