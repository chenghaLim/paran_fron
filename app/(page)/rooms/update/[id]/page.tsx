import RoomUpdate from "@/app/components/crud/RoomUpdate"
export default function Update() {
  return (
    <div>
      {/* 기존의 해당 데이터를 셀렉트해서 받아오면 update에 필요한 부분만 고칠 수 있도록 해야함. */}
      <RoomUpdate/>
    </div>
  )
}
