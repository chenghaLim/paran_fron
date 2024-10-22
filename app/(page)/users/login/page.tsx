"use client"

import { useState, useEffect, ReactEventHandler, useRef } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from '@/lib/store';
import { loginService } from '@/app/service/user/login.service';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/lib/features/users/user.slice';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const role = useSelector(getCurrentUser)?.role

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')
        try {
            await loginService.login(username, password, dispatch)
        } catch (err: any) {
            console.error('Login error:', err);
            setError('비밀번호가 다릅니다 다시 입력해주세요');
        } finally {
            setLoading(false);
        }
    };
    // login 로직 끝난 후로 추가하기
    useEffect(() => {
        if (!loading && role) {
            console.log("user 의 role 을 사용해볼게요", role)
            switch (role) {
                case "ROLE_ADMIN":
                    router.push('/admin')
                    break
                case "ROLE_SELLER":
                    router.push('/seller')
                    break
                default:
                    router.push('/')
            }
        }
    }, [role, router]);


    const moveToOath = () => {
        try {
            const result = loginService.oauth();
            console.log("result확인용", result);
            console.log("page부분",window.location.search)
            console.log("page부분끝",window.location.search)
        } catch (error) {
            console.error('로그인 실패:', error)
        }finally{
            router.push("/users/oauth")
        }
        // const oauth = loginService.handleOAuthCallback(dispatch)
        // console.log("확인용 : ", oauth)

    };


    return (
        <div className="mx-auto my-6 max-w-lg items-center rounded-lg border p-6 shadow">
            <form onSubmit={onSubmit}>
                <div className="mb-5">
                    <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900">
                        ID
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500"
                        placeholder="ID를 입력해주세요"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500"
                        placeholder="비밀번호"
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button
                    type="submit"
                    className="my-2 w-full rounded-lg border-2 border-green-400 bg-green-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    로그인
                </button>
                <button
                    type="button"
                    onClick={() => { router.push('/users/register') }}
                    className="my-2 w-full rounded-lg border-2 border-green-400 bg-green-400 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    회원가입
                </button>
            </form>
            <hr className="my-2" />

            <div className="mx-auto my-4 max-w-lg">
                <button
                    type="button"
                    className="mb-2 flex w-full items-center rounded-lg border-2 border-[#03c75a] bg-white px-5 py-2.5 text-sm font-medium text-[#03c75a] hover:bg-[#03c75a] hover:text-white"
                    onClick={() => moveToOath()}
                >
                    <Image
                        src="/assets/btnG.png"
                        alt="naver"
                        width={40} height={40}
                    />
                    <span className="mx-5">네이버로 로그인</span>
                </button>
            </div>
        </div>
    );
}
