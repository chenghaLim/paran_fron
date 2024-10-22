// 모델 정의
export interface RoomModel {
    title: any;
    id?: number; // 공간 ID (선택적)
    name: string; // 공간 이름 (필수)
    maxPeople: number; // 최대 이용 정원 (필수, 양수)
    price: number; // 이용 금액 (필수, 양수, 1시간당 금액)
    opened: boolean; // 오픈된 공간 여부 (필수)
    openTime: string; // 가게 여는 시간 (HH:mm 형식의 문자열, 필수)
    closeTime: string; // 가게 마지막 이용 시간 (HH:mm 형식의 문자열, 필수)
    createdAt?: string; // 등록일 (선택적, ISO 형식의 문자열)
    enabled?: boolean; // 공간 승인 여부 (선택적)
    nickname: string; // 등록자 닉네임 (필수)
}

export interface RoomUpdateModel {
    id: number; // 공간 ID (필수)
    name: string; // 공간 이름 (필수)
    maxPeople: number; // 최대 이용 정원 (필수, 양수)
    price: number; // 이용 금액 (필수, 양수, 1시간당 금액)
    opened: boolean; // 오픈된 공간 여부 (필수)
    openTime: string; // 가게 여는 시간 (HH:mm 형식의 문자열, 필수)
    closeTime: string; // 가게 마지막 이용 시간 (HH:mm 형식의 문자열, 필수)
}

export interface RoomWTimeModel {
    id: number; // 공간 ID
    name: string; // 공간 이름
    maxPeople: number; // 최대 이용 정원
    price: number; // 1시간당 이용 금액
    opened: boolean; // 오픈된 공간 여부
    openTime: string; // 가게 여는 시간 (HH:mm 형식의 문자열)
    closeTime: string; // 가게 마지막 이용 시간 (HH:mm 형식의 문자열)
    createdAt: string; // 등록일 (ISO 형식의 문자열)
    enabled: boolean; // 승인 여부
    nickname: string; // 등록자 닉네임
    times: TimeModel[]; // 공간 이용 시간 (시간에 관련된 모델이 필요할 경우 수정 가능)
}

export interface TimeModel {
    id: number; //시간 ID
    date: string; // 이용일
    time: string; // 이용 시간
}

// 상태 인터페이스 정의
interface RoomState {
    rooms: RoomModel[];
    roomsMap: RoomModel[];
    enabledRoomByNickname: RoomModel[];
    disabledRoomByNickname: RoomModel[];
    disabledRooms: RoomModel[];
    roomsLiked: RoomModel[];
    enabledrooms: RoomModel[];
    notEnabledrooms: RoomModel[];
    currentRoom: RoomModel | null;
    isLoading: boolean;
    error: string | null;
}

// 초기 상태
export const initialRoomState: RoomState = {
    rooms: [],
    roomsMap: [],
    enabledRoomByNickname: [],
    disabledRoomByNickname: [],
    disabledRooms: [],
    roomsLiked: [],
    enabledrooms: [],
    notEnabledrooms: [],
    currentRoom: null,
    isLoading: false,
    error: null
};