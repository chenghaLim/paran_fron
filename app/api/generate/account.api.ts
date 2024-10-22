import { AccountCancelModel, AccountModel, AccountResultModel } from "@/app/model/room/account.model";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import api from "../axios";
import requests from "../requests";

export const accountAPI = {
    load() { return loadTossPayments("test_ck_mBZ1gQ4YVX9QGM06mRNRrl2KPoqN"); },

    insert(model: AccountResultModel) { return api.post<boolean>(requests.fetchRooms + '/accounts', model); },

    findByOrderId(orderId: string) { return api.get<string>(requests.fetchRooms + '/accounts', { params: { orderId }, }); },

    modify(model: AccountCancelModel) { return api.put<boolean>(requests.fetchRooms + '/accounts', model); },

    findByBooking(bookingId: number) { return api.get<AccountModel>(requests.fetchRooms + `/accounts/${bookingId}`); },

    findByGroup(groupId: number, page: number, size: number) { return api.get<Page<AccountModel>>(requests.fetchRooms + `/accounts/group/${groupId}`, { params: { page, size } }); },

    findByRoom(roomId: number, page: number, size: number) { return api.get<Page<AccountModel>>(requests.fetchRooms + `/accounts/room/${roomId}`, { params: { page, size } }); },

}