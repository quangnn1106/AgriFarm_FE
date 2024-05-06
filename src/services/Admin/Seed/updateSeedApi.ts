import { UpdateSeedDto, Seed, Property } from "@/app/[locale]/(Dashboard)/(Admin)/seed/models/seed-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const updateSeedApi: (
    seedId: string | null,
    http: AxiosInstance | null,
    UpdateSeedDto?: UpdateSeedDto
) => Promise<HttpResponseCommon<Seed | undefined>> = async (
    seedId,
    http,
    UpdateSeedDto
) => {
    try {
        const res = await http?.put(`/material/farm-seeds/put`, UpdateSeedDto, {
            params: {
                id: seedId
            }
        });
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

export const updateSeedPropertyApi: (
    seedId: string | null,
    http: AxiosInstance | null,
    UpdateSeedPropertyDto?: Property[]
) => Promise<HttpResponseCommon<Seed | undefined>> = async (
    seedId,
    http,
    UpdateSeedPropertyDto
) => {
    try {
        const res = await http?.put(`seed/seed-props/put`, UpdateSeedPropertyDto, {
            params: {
                seedId: seedId
            }
        });
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