export enum ItemModeValue {
    SINGLE_CHOICE = 1,
    MULTI_CHOICE = 2,
    TEXT = 3,
    PHOTOS = 4
}

export const ItemMode: {[key: number]: string} = {
    [ItemModeValue.SINGLE_CHOICE]: "Single choice",
    [ItemModeValue.MULTI_CHOICE]: "Multi choice",
    [ItemModeValue.TEXT]: "Text",
    [ItemModeValue.PHOTOS]: "Photos"
};
