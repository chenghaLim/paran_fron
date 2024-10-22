import { AccountCancelModel, AccountModel, AccountResultModel } from '@/app/model/room/account.model';
import { AppDispatch } from '@/lib/store';
import { ANONYMOUS, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import { saveLoading } from '@/lib/features/room/account.slice';
import { accountAPI } from '@/app/api/generate/account.api';

const load = async (dispath: AppDispatch): Promise<TossPaymentsPayment> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.load();
    return response.payment({ customerKey: ANONYMOUS });
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 로드 중 오류 발생');
    }
  }
}
// 결제 정보 저장
const insert = async (model: AccountResultModel, dispath: AppDispatch): Promise<boolean> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.insert(model);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 저장 중 오류 발생');
    }
  }
};

// 결제 취소
const modify = async (model: AccountCancelModel, dispath: AppDispatch): Promise<boolean> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.modify(model)
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 취소 중 오류 발생');
    }
  }
};

// 주문번호로 결제 정보 조회
const findByOrderId = async (orderId: string, dispath: AppDispatch): Promise<string> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.findByOrderId(orderId)
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 정보 조회 중 오류 발생');
    }
  }
};



// 예약 정보로 결제 정보 조회
const findByBooking = async (bookingId: number, dispath: AppDispatch): Promise<AccountModel> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.findByBooking(bookingId);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 정보 조회 중 오류 발생');
    }
  }
};
// 소모임 정보로 결제 리스트 조회
const findByGroup = async (groupId: number, page: number, size: number, dispath: AppDispatch): Promise<AccountModel[]> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.findByGroup(groupId, page, size);
    console.log('findByGroup: ' + response.data);
    return response.data.content;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 정보 조회 중 오류 발생');
    }
  }
};
// 공간 정보로 결제 리스트 조회
const findByRoom = async (roomId: number, page: number, size: number, dispath: AppDispatch): Promise<AccountModel[]> => {
  try {
    dispath(saveLoading(true))
    const response = await accountAPI.findByRoom(roomId, page, size)
    return response.data.content;
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('결제 정보 조회 중 오류 발생');
    }
  }
};
export const accountService = {
  load, insert, modify,
  findByOrderId, findByBooking, findByGroup, findByRoom
}