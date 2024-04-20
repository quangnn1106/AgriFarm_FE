
export type landDef = {
    value: string;
    label: string;
};

export type diseaseDiagnosticDef = {
    plantDiseaseId: string;
    description: string;
    feedback: string;
    location: string;
    createBy: string;
    landId: string;
}

export type plantDiseaseDef = {
    diseaseName: string;
    preventiveMeasures: string;
    symptoms: string;
    cause: string;
    suggest: string;
    feedback: string;
}

export type siteWarningDef = {
    siteId: string;
    siteLocation: string;
    notiDistance: number;
}

export type WarningDiseaseDef = {
    siteId: string;
    distance: string;
    diseaseName: string;
}

