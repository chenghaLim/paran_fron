// errorTypes.ts
export interface ErrorField {
    value: object;
    message: string;
}

export interface ExceptionResponseModel {
    code: string;
    message: string;
    errors: ErrorField[];
}

// 상태 인터페이스 정의
export interface ErrorState {
    currentError?: ExceptionResponseModel;
    errorHistory: ExceptionResponseModel[];
    isError: boolean;
    isGlobalLoading: boolean,
    globalerror: string | null;
}

// 초기 상태
export const initialErrorState: ErrorState = {
    currentError: {} as ExceptionResponseModel,
    errorHistory: [],
    isError: false,
    isGlobalLoading: false,
    globalerror: null
};