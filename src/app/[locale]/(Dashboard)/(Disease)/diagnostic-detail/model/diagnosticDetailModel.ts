import { UUID } from "crypto";

export type diagnosticDetailModel = {
    predictResult: string;
    description: string;
    feedback: {
        status: string,
        content: string
    };
    date: string;
    location: string;
    userId: UUID;
};
