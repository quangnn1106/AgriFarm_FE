/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { SeasonModel } from "@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model";
import HttpResponseCommon from "@/types/response";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { AxiosInstance } from "axios";
import { NextIntlClientProvider, useTranslations } from 'next-intl';


export type UpdateSeasonDto = {
    id: string;
    title: string | null;
    description: string | null;
    startIn: string | null;
    endIn: string | null;
}
export const updateSeasonApi: (
    http: AxiosInstance | null,
    seasonId?: string,
    updateSeasonDto?: UpdateSeasonDto
) => Promise<HttpResponseCommon<SeasonModel | [] | undefined>> = async (
    http,
    seasonId,
    updateSeasonDto
) => {
    try {
        const res = await http?.put(`cult/seasons/put`, updateSeasonDto, {
            params: {
                id: seasonId
            }
        });
        console.log(res);
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




