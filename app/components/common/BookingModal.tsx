import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Alert from "./Alert";
import { useSelector } from "react-redux";
import { getCurrentRoom } from "@/lib/features/room/room.slice";
import { useAppDispatch } from "@/lib/store";
import { BookingModel } from "@/app/model/room/bookings.model";
import { bookingService } from "@/app/service/room/booking.service";
import { TimeModel } from "@/app/model/room/room.model";
import { timeService } from "@/app/service/room/time.service";
import { getLeaderGroups } from "@/lib/features/group/group.slice";
import { GroupResponseModel } from "@/app/model/group/group.model";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

export default function BookingModal({ id, isOpen, onClose }: BookingModalProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const room = useSelector(getCurrentRoom);
  const leaderGroup = useSelector(getLeaderGroups)
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<BookingModel>({
    enabled: false,
    date: '',
    usingTime: [],
    roomId: room?.id || 0,
    groupId: 0
  });
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [times, setTimes] = useState<TimeModel[]>([])

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);

    if (id) {
      timeService.findByRoom(id, dispatch).then(data => {
        console.log("타임서비스 공간으로 찾기: ", data)
        if (data && data.length > 0) {
          setTimes(data)
          setMaxDate(data[data.length - 1].date)
        }
      })
    }
  }, []);

  const groupedTimes = times.reduce((acc: Record<string, TimeModel[]>, time) => {
    const { date } = time;
    if (!acc[date]) {
      acc[date] = []; // Create new array for this date if it doesn't exist
    }
    acc[date].push(time);
    return acc;
  }, {});

  if (!isOpen) return null;

  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      groupId: Number(value)
    }));
    console.log(formData)
  };
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      date: e.target.value,
      usingTime: []
    }));
    setIsDateSelected(true);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (!isTimeSlotDisabled(value, formData.date)) {
      setFormData(prevState => ({
        ...prevState,
        usingTime: checked
          ? [...prevState.usingTime, value]
          : prevState.usingTime.filter(item => item !== value)
      }));
    }
  };

  const isTimeSlotDisabled = (time: string, date: string) => {
    const now = new Date();
    const slotDateTime = new Date(`${date}T${time}`);
    return slotDateTime <= now;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    bookingService.save(formData, dispatch)
    setAlertMessage("예약 되었습니다.");
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    router.push('/booking');
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const timeSlots = groupedTimes[formData.date]?.map(time => time.time) || [];


  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative max-h-full w-full max-w-lg p-4">
          <div className="relative rounded-lg bg-white shadow">
            <ModalHeader onClose={onClose} />
            <ModalBody
              formData={formData}
              handleGroupChange={handleGroupChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              handleSubmit={handleSubmit}
              timeSlots={timeSlots}
              isDateSelected={isDateSelected}
              minDate={minDate}
              maxDate={maxDate}
              leaderGroup={leaderGroup}
            />
          </div>
        </div>
      </div>
      <Alert
        message={alertMessage}
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
      />
      <Alert
        message="예약신청내역으로 이동하시겠습니까?"
        isOpen={isConfirmOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        showConfirm={true}
      />
    </>
  );
}

const ModalHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
      <h3 className="text-xl font-semibold text-gray-900">
        예약하기
      </h3>
      <button
        type="button"
        onClick={onClose}
        className="end-2.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
      >
        <svg className="size-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span className="sr-only">닫기</span>
      </button>
    </div>
  );
}

function ModalBody({
  formData,
  handleDateChange,
  handleTimeChange,
  handleSubmit,
  handleGroupChange,
  timeSlots,
  isDateSelected,
  minDate,
  maxDate,
  leaderGroup
}: {
  formData: BookingModel;
  handleGroupChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  isDateSelected: boolean;
  minDate: string;
  maxDate: string;
  timeSlots: string[];
  leaderGroup: GroupResponseModel[];
}) {
  return (
    <div className="p-4 md:p-5">
      <form className="space-y-4" action="#" onSubmit={handleSubmit}>
        <input
          type="date"
          value={formData.date}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 text-sm leading-none text-gray-900 focus:border-green-500 focus:ring-green-500"
        />
        {formData.date && <span className="text-green-600">예약가능 날짜 입니다.</span>}
        {isDateSelected && (
          <TimeSlots
            timeSlots={timeSlots}
            handleChange={handleTimeChange}
            selectedTimes={formData.usingTime}
            selectedDate={formData.date}
          />
        )}
        <select
          id="leaderGroup"
          value={formData.groupId}
          onChange={handleGroupChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 text-sm leading-none text-gray-900 focus:border-green-500 focus:ring-green-500"
        >
          <option value={0}>그룹 선택</option> {/* 기본 선택지 */}
          {leaderGroup.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          disabled={!isDateSelected || formData.usingTime.length === 0}
        >
          예약 신청하기
        </button>
        <div className="text-sm font-medium text-green-700 hover:underline">
          요청이 수락되면 알려드릴게요!^^
        </div>
      </form >
    </div >
  );
}

function TimeSlots({ handleChange, selectedTimes, selectedDate, timeSlots }: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedTimes: string[];
  selectedDate: string;
  timeSlots: string[];
}) {
  const isTimeSlotDisabled = (time: string, date: string) => {
    const now = new Date();
    const slotDateTime = new Date(`${date}T${time}`);
    return slotDateTime <= now;
  };

  return (
    <ul className="grid grid-cols-6 gap-6">
      {
        timeSlots.map((time) => (
          <li key={time}>
            <input
              type="checkbox"
              id={`time${time}`}
              name="time"
              value={time}
              onChange={handleChange}
              checked={selectedTimes.includes(time)}
              className="peer hidden"
            />
            <label
              htmlFor={`time${time}`}
              className="cursor-pointer rounded-lg border-2 border-green-200 bg-white p-2 text-center text-green-500 hover:bg-green-500 hover:text-green-600  peer-checked:border-green-600 peer-checked:text-green-600"
            >
              {time}
            </label>
          </li>
        ))
      }

    </ul >
  );
}