// fileTypes.ts
export enum FileType {
    USER = "user",
    ROOM = "room",
    ABOARD = "aBoard",
    GROUP_POST = "groupPost",
    BOOK = "book"
}
export interface FileModel {
    id?: string;
    type: FileType;
    path: string;
    refId: number
    uploadAt: Date;
}

export const defaultFile = (fileType: FileType, refId: number) => ({
    id: '파일이 없어요',
    type: fileType,
    path: process.env.NEXT_PUBLIC_IMAGE_DEFAULT || '/images/default.png',
    refId: refId,
    uploadAt:new Date(),
});

export interface FileDeleteModel {
    path: string;
}

export interface FileState {
    userFiles: FileModel[];
    roomFiles: FileModel[];
    aboardFiles: FileModel[];
    groupPostFiles: FileModel[];
    bookFiles: FileModel[];
    currentFile: FileModel | null;
    fileToDelete: FileDeleteModel | null;
    isLoading: boolean;
    error: string | null;
}

export const initialFileState: FileState = {
    userFiles: [],
    roomFiles: [],
    aboardFiles: [],
    groupPostFiles: [],
    bookFiles: [],
    currentFile: null,
    fileToDelete: null,
    isLoading: false,
    error: null
};