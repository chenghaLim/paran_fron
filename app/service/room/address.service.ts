import { AddressModel, AddressUpdateModel } from '@/app/model/room/address.model';
import { AppDispatch } from '@/lib/store';
import { addAddress, deleteAddress, saveAddresses, saveLoading, updateAddress } from '@/lib/features/room/address.slice';
import { addressAPI } from '@/app/api/generate/address.api';

// 주소 검색
const search = async (query: string, dispatch: AppDispatch): Promise<AddressModel[]> => {
  try {
    dispatch(saveLoading(true))
    const response = await addressAPI.search(query)
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
      throw new Error('주소 검색 중 오류 발생');
    }
  }
};

// 주소 등록
const insert = async (addressModel: AddressModel, dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(saveLoading(true))
    const response = await addressAPI.insert(addressModel)
    dispatch(addAddress(response.data))
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 저장 중 오류 발생');
    }
  }
};

// 주소 수정
const modify = async (addressModel: AddressUpdateModel, dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(saveLoading(true))
    const response = await addressAPI.modify(addressModel)
    dispatch(updateAddress(response.data))
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 수정 중 오류 발생');
    }
  }
};

// 주소 삭제
const drop = async (id: number, dispatch: AppDispatch): Promise<boolean> => {
  try {
    dispatch(saveLoading(true))
    const response = await addressAPI.drop(id)
    dispatch(deleteAddress(id))
    return response.data
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 삭제 중 오류 발생');
    }
  }
};

// 전체 주소 목록 조회
const findAll = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(saveLoading(true))
    const response = await addressAPI.findByAddresses();
    dispatch(saveAddresses(response.data))
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      //console.error('No Response:', error.request);
      //throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 목록 조회 중 오류 발생');
    }
  }
};

// 자체 주소 검색
const findByQuery = async (query: string, dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(saveLoading(true))
    const response = await addressAPI.findByQuery(query)
    dispatch(saveAddresses(response.data))
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 검색 중 오류 발생');
    }
  }
};

export const addressService = {
  insert, modify, drop,
  findAll, findByQuery,
  search
}