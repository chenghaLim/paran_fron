export interface ReviewModel {
  id?: number; // 리뷰 ID (선택사항)
  rating: number; // 별점 (필수)
  content: string; // 리뷰 내용 (필수)
  nickname: string; // 작성자 (필수)
  createAt?: string; // 작성일 (선택사항, ISO 8601 형식)
  roomId: number; // 이용 공간 ID (필수)
  bookingId: number; // 예약 정보 ID (필수)
}

export interface ReviewUpdateModel {
  id: number; // 리뷰 ID (필수)
  rating: number; // 별점 (필수, 1~10 범위의 자연수)
  content: string; // 리뷰 내용 (필수)
}

// 상태 인터페이스 정의
export interface ReviewState {
  reviews: ReviewModel[];
  currentReview: ReviewModel | null;
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
export const initialReviewState: ReviewState = {
  reviews: [],
  currentReview: null,
  isLoading: false,
  error: null
};