"use client"
import { RegisterModel } from "@/app/model/user/user.model"
import { userService } from "@/app/service/user/user.service"
import { useAppDispatch } from "@/lib/store"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"


export default function Register() {
  const dispatch = useAppDispatch()
  const route = useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState<RegisterModel>({
    username: '',
    password: '',
    passwordcheck: '',
    nickname: '',
    name: '',
    tel: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [isSeller, setIsSeller] = useState(false);

  const handleSellerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSeller(e.target.checked);
  };

  const onSubmit = () => {
    console.log(formData);
    userService.insertUser(formData, isSeller, dispatch);
    route.push("/users/login")
  }

  return (
    <div className="my-6 py-40">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-2xl">파란만장 서비스와 함께해요!</h1>
        <div className="mb-5 flex items-center space-x-4 p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
          <input
            type="checkbox"
            id="isSeller"
            checked={isSeller}
            onChange={handleSellerChange}
            className="h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded"
          />
          <label htmlFor="isSeller" className="text-lg text-gray-900">
            <span className="font-medium">Seller</span>로 등록하시겠습니까?
          </label>
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="username"
            id="username"
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label
            htmlFor="username"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400"
          >
            ID
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400  rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            비밀번호
          </label>
        </div>
        {/* 비밀번호 맞는지 확인 폼 */}
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="passwordcheck"
            id="passwordcheck"
            onChange={handleChange}
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0"
            placeholder=" "
            required
          />
          <label
            htmlFor="passwordcheck"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-focus:top-2  peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            비밀번호 확인
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="nickname"
            id="nickname" onChange={handleChange}
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
            required
          />
          <label
            htmlFor="nickname"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            닉네임
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
            name="tel"
            id="tel"
            onChange={handleChange}
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
            placeholder=" "
            required
          />
          <label
            htmlFor="tel"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Tel: (123-3456-7890)
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="name"
            id="name" onChange={handleChange}
            className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0 "
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            이름
          </label>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="w-full rounded-lg bg-green-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 sm:w-auto"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}