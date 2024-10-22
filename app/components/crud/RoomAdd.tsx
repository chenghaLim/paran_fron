"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../common/Alert";
import { useAppDispatch } from "@/lib/store";

export default function RoomAdd() {
  const [formData, setFormData] = useState({
    name: '',
    maxPeople: '',
    opened: false,
    startDate:'',
    endDate: '',
    openTime: '00:00',
    closeTime: '24:00',
    price: '',
    enabled: false,
    nickname: ''
  });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? value === 'true' : value
    }));
  };

  const handleTimeChange = (timeType: 'openTime' | 'closeTime', part: 'hour' | 'minute', value: string) => {
    setFormData(prevState => {
      const [hour, minute] = prevState[timeType].split(':');
      const newTime = part === 'hour' ? `${value}:${minute}` : `${hour}:${value}`;
      return { ...prevState, [timeType]: newTime };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    // roomService.save(formData, dispatch);
  };

  const goBack = () => {
    router.back();
  };

  const onCreate = () => {
    setIsOpen(true);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  const TimeSelector = ({ label, timeType }: { label: string, timeType: 'openTime' | 'closeTime' }) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <div className="flex space-x-2">
        <select
          value={formData[timeType].split(':')[0]}
          onChange={(e) => handleTimeChange(timeType, 'hour', e.target.value)}
          className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 px-6 py-3"
        >
          {hours.map(hour => (
            <option key={hour} value={hour}>{hour} : 00</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto bg-green-50 my-8 rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">공간 이름</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="공간의 이름을 적어주세요" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>

        <div className="mb-4">
          <label htmlFor="maxPeople" className="block mb-2 text-sm font-medium text-gray-900">정원 수</label>
          <input type="number" id="maxPeople" name="maxPeople" value={formData.maxPeople} onChange={handleChange} className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">공유 오피스인가요?</label>
          <div className="flex items-center mb-2">
            <input type="radio" id="aloneYes" name="opened" value="true" checked={formData.opened === true} onChange={handleChange} className="size-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2 " />
            <label htmlFor="aloneYes" className="ml-2 text-sm font-medium text-gray-900">네</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="aloneNo" name="opened" value="false" checked={formData.opened === false} onChange={handleChange} className="size-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500  focus:ring-2" />
            <label htmlFor="aloneNo" className="ml-2 text-sm font-medium text-gray-900">아니오</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">이용 기간</label>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">시작 날짜</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900">종료 날짜</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
                className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
            </div>
          </div>
        </div>



        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">이용가능 시간</label>
          <span className="text-sm my-2 text-blue-600">00 시는 오전 12시입니다 이용에 착오없으시길 바랍니다</span>
          <div className="flex items-center space-x-4">
            <TimeSelector label="시작 시간" timeType="openTime" />
            <TimeSelector label="종료 시간" timeType="closeTime" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">이용 금액</label>
          <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="시간당 이용금액을 적어주세요" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>

        <button type="submit" onClick={onCreate} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">등록하기</button>
        <button type="button" onClick={goBack} className="text-gray-900 bg-green-50 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-2 border-green-600 text-center">뒤로가기</button>
      </form>
      <Alert message={'등록되었습니다.'} isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
    </div>
  )
}