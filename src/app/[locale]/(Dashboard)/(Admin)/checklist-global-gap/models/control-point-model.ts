export type ControlPoint = {
    id: string | undefined,
    code: string | undefined,
    description: string | undefined,
    isAchieve: string | undefined,
    note: string | undefined,
    attachment: string | undefined,
    level: string | undefined
}

export type ControlPointGroup = {
    id: string | undefined,
    name: string | undefined,
    code: string | undefined,
    description: string | undefined,
    controlPointObjs : ControlPointGroupObj[] | undefined
}

export type ControlPointGroupObj = {
    id: string | undefined,
    name: string | undefined,
    code: string | undefined,
    description: string | undefined,
    controlPoints : ControlPoint[] | undefined
}

