import { UUID } from "crypto";

export type diseaseModel = {
    key : UUID,
    no: number;
    predictResult: string;
    description: string;
    feedback: string;
    date: string;
  };
  