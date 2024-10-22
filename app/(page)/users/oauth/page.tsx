"use client"

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/store';
import { loginService } from '@/app/service/user/login.service';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/app/components/common/status/LoadingSpinner';

const OauthCallback = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // 컴포넌트가 로드될 때 handleOAuthCallback 자동 실행
    useEffect(() => {
        const executeOAuthCallback = async () => {
            try {
                console.log("OAuth 콜백 실행 중...");
                await loginService.handleOAuthCallback(dispatch); // OAuth 콜백 처리
                router.push("/"); // 성공 시 리디렉션할 경로
            } catch (error) {
                console.error("OAuth 처리 중 오류:", error);
                router.push("/login"); // 오류 발생 시 로그인 페이지로 이동
            }
        };

        executeOAuthCallback(); // useEffect 내부에서 함수 호출
    }, [dispatch, router]);

    return <LoadingSpinner />
};

export default OauthCallback;