"use client";
import NaverMap from "./NaverMap";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/store";
import { saveLoading } from "@/lib/features/room/address.slice";
import { addressService } from "@/app/service/room/address.service";
import { roomService } from "@/app/service/room/room.service";

export default function Map() {
  const dispatch = useAppDispatch()
  const [query, setQuery] = useState("")
  useEffect(() => {
    roomService.findAllMap(dispatch)
    addressService.findAll(dispatch)
    dispatch(saveLoading(false))
  }, [dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  function search() {
    addressService.findByQuery(query, dispatch)
    dispatch(saveLoading(false))
  }


  return (
    <div id="map-wrap" className="relative">
      <span
        className="w-200 min-h-60 bg-green-100"
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "0",
          width: "100%",
          height: "400px",
          zIndex: "-999",
        }}
      ></span>
      <div className="flex w-full justify-center">
        <div className="mx-3 h-[46rem] w-[30%] rounded-lg border bg-white p-6 shadow ">
          <h1 className="text-2xl font-bold ">원하시는 정보를 검색해주세요!</h1>
          <p className="mt-2 text-base">정보를 남겨주시면 친절하게 도와드리겠습니다.</p>
          <div className="group relative z-0 my-8 w-full">
            <input
              type="text"
              name="floating_address"
              id="floating_address"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label
              htmlFor="floating_address"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
            >
              주소를 입력해주세요
            </label>
          </div>
          {/* <div className="group relative z-0 mb-5 w-full">
            <input
              type="text"
              name="floating_detail"
              id="floating_detail"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_detail"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-400 rtl:peer-focus:translate-x-1/4"
            >
              상세주소
            </label>
          </div> */}
          <button
            onClick={search}
            className="w-full rounded-lg bg-green-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 sm:w-auto"
          >
            검색
          </button>
        </div>
        <div>
          <NaverMap />
        </div>
      </div>
    </div>
  );
}
