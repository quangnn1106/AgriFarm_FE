import { Position } from './sites';

export interface MarkerDisease {
  plantDiseaseId: string;
  landId: string;
  diseaseName: string;
  location: PositionString;
}

export interface MarkerDiseaseParseNum {
  plantDiseaseId: string;
  landId: string;
  diseaseName: string;
  location: {
    lat: number;
    lon: number;
  };
}

export interface PositionString {
  lat: string | '';
  lon: string | '';
}
