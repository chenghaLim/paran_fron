// 인터페이스 정의
export interface AccountModel {
  orderId: string;        // 주문 번호
  amount: number;         // 결제 금액
  amountTaxFree: number;  // 비과세금액
  orderName: string;      // 상품명
  groupId: number;        // 소모임 ID (결제한 주체)
  roomId: number;         // 공간 ID (사용처)
  bookingId: number;      // 예약 ID
  usePoint: number;       // 사용한 포인트
  canceled: boolean;      // 취소 여부
  reason: string;         // 취소 사유
  createAt: string;       // 결제 일자
}

export interface AccountResultModel {
  orderId: string;        // 주문 번호
  paymentKey: string;     // 결제 번호
  amount: number;         // 결제 금액
  orderName: string;      // 상품명
  groupId: number;        // 소모임 ID (결제한 주체)
  roomId: number;         // 공간 ID (사용처)
  bookingId: number;      // 예약 ID
  usePoint: number;       // 사용한 포인트
}

export interface AccountCancelModel {
  paymentKey: string;     // 결제 번호
  cancelReason: string;   // 취소 사유
}
export interface AmountModel {
  currency: string;
  value: number;
}

// 상태 인터페이스 정의
interface AccountState {
  accounts: AccountModel[];
  currentAccount: AccountModel | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
export const initialAccountState: AccountState = {
  accounts: [],
  currentAccount: null,
  isLoading: false,
  error: null
};
