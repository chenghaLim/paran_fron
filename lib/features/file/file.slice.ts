// fileSlice.ts
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFileState, FileModel, FileDeleteModel, FileType } from '../../../app/model/file/file.model';
import { RootState } from '../../store';  // RootState는 store에서 정의된 타입이어야 함

const fileSlice = createSlice({
    name: 'file',
    initialState: initialFileState,
    reducers: {
        // 여러 파일을 저장 (타입별로 분리해서 저장)
        saveFiles: (state, action: PayloadAction<FileModel[]>) => {
            state.userFiles = action.payload.filter(file => file.type === FileType.USER);
            state.roomFiles = action.payload.filter(file => file.type === FileType.ROOM);
            state.aboardFiles = action.payload.filter(file => file.type === FileType.ABOARD);
            state.groupPostFiles = action.payload.filter(file => file.type === FileType.GROUP_POST);
            state.bookFiles = action.payload.filter(file => file.type === FileType.BOOK);
        },
        // 현재 파일을 저장
        saveCurrentFile: (state, action: PayloadAction<FileModel | null>) => {
            state.currentFile = action.payload;
        },
        // 삭제할 파일을 저장
        saveFileToDelete: (state, action: PayloadAction<FileDeleteModel | null>) => {
            state.fileToDelete = action.payload;
        },

        // 새로운 파일 추가 (타입별로 추가)
        addFile: (state, action: PayloadAction<FileModel>) => {
            switch (action.payload.type) {
                case FileType.USER:
                    state.userFiles.push(action.payload);
                    break;
                case FileType.ROOM:
                    state.roomFiles.push(action.payload);
                    break;
                case FileType.ABOARD:
                    state.aboardFiles.push(action.payload);
                    break;
                case FileType.GROUP_POST:
                    state.groupPostFiles.push(action.payload);
                    break;
                case FileType.BOOK:
                    state.bookFiles.push(action.payload);
                    break;
            }
        },
        // 파일 제거 (path와 타입으로 파일을 찾아서 제거)
        removeFile: (state, action: PayloadAction<{ path: string; type: FileType }>) => {
            const { path, type } = action.payload;
            switch (type) {
                case FileType.USER:
                    state.userFiles = state.userFiles.filter(file => file.path !== path);
                    break;
                case FileType.ROOM:
                    state.roomFiles = state.roomFiles.filter(file => file.path !== path);
                    break;
                case FileType.ABOARD:
                    state.aboardFiles = state.aboardFiles.filter(file => file.path !== path);
                    break;
                case FileType.GROUP_POST:
                    state.groupPostFiles = state.groupPostFiles.filter(file => file.path !== path);
                    break;
                case FileType.BOOK:
                    state.bookFiles = state.bookFiles.filter(file => file.path !== path);
                    break;
            }
        },
        // 특정 파일 업데이트 (ID와 타입으로 파일을 찾아 업데이트)
        updateFile: (state, action: PayloadAction<FileModel>) => {
            const { id, type } = action.payload;
            const updateFileList = (files: FileModel[]) => {
                const index = files.findIndex(file => file.id === id);
                if (index !== -1) {
                    files[index] = action.payload;
                }
            };

            switch (type) {
                case FileType.USER:
                    updateFileList(state.userFiles);
                    break;
                case FileType.ROOM:
                    updateFileList(state.roomFiles);
                    break;
                case FileType.ABOARD:
                    updateFileList(state.aboardFiles);
                    break;
                case FileType.GROUP_POST:
                    updateFileList(state.groupPostFiles);
                    break;
                case FileType.BOOK:
                    updateFileList(state.bookFiles);
                    break;
            }
        },
        // 로딩 상태 업데이트
        upLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        // 에러 상태 저장
        endError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});
const selectFileState = (state: RootState) => state.file;
// Selectors
export const getFiles = createSelector(
    [selectFileState],
    (fileState) => ({
      userFiles: fileState.userFiles,
      roomFiles: fileState.roomFiles,
      aboardFiles: fileState.aboardFiles,
      groupPostFiles: fileState.groupPostFiles,
      bookFiles: fileState.bookFiles,
    })
  );
export const getCurrentFile = (state: RootState) => state.file.currentFile;
export const getFileToDelete = (state: RootState) => state.file.fileToDelete;
export const getLoading = (state: RootState) => state.file.isLoading;
export const getError = (state: RootState) => state.file.error;

export const {
    saveFiles,
    saveCurrentFile,
    saveFileToDelete,
    addFile,
    removeFile,
    updateFile,
    upLoading,
    endError,
} = fileSlice.actions;

export default fileSlice.reducer;