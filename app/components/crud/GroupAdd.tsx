"use client"
import { useRouter } from "next/navigation";
import CategorySelect from "../common/CategorySelect";
import Alert from "../common/Alert";
import { useState } from "react";
import { useAppDispatch } from "@/lib/store";
import { groupService } from "@/app/service/group/group.service";
import { getCurrentUser, getNickname } from "@/lib/features/users/user.slice";
import { useSelector } from "react-redux";
import { GroupModel } from "@/app/model/group/group.model";

export default function GroupAdd() {
    const route = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch()
    const [groupName, setGroupName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [groupDetails, setGroupDetails] = useState("");
    const nickname = useSelector(getNickname)

    const handleCategoryChange = (selectedCategory: string) => {
        setCategoryName(selectedCategory);
    };


    const createGroup = () => {
        {
            !nickname && (
                <Alert message="로그인 후 재접속 바랍니다" isOpen={isOpen} onClose={() => { }} />
            )
        }
        if (nickname) {
            const groupModel: GroupModel = {
                name: groupName,
                categoryName: categoryName,
                detail: groupDetails,
                nickname: nickname,
            };
            groupService.insert(groupModel, dispatch)
            route.push('/')
        }
    }

    return (
        <>
            <div className="max-w-lg mx-auto p-6 my-8 bg-green-50 rounded-lg">
                <div>
                    <label htmlFor="groupName">모임방 이름</label>
                    <input
                        type="text"
                        placeholder="소모임의 이름을 적어주세요"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 my-2"
                    />
                </div>
                <CategorySelect onChange={handleCategoryChange} value={categoryName} />
                <div>
                    <label htmlFor="details">모임설명</label>
                    <input
                        type="text"
                        placeholder="소모임의 설명을 적어주세요"
                        id="details"
                        value={groupDetails}
                        onChange={(e) => setGroupDetails(e.target.value)}
                        className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 my-2"
                    />
                </div>
                <div>
                    <button type="button" onClick={createGroup} className="p-2 bg-green-400 rounded-lg text-white">모임
                        개설하기
                    </button>
                    <button type="button" onClick={() => { route.back() }} className="p-2 mx-2 bg-green-400 rounded-lg text-white">취소하기
                    </button>
                </div>
                <div>
                </div>
            </div>
            <Alert message={'모임이 개설이 요청되었습니다.'} isOpen={isOpen} onClose={() => {
                setIsOpen(false)
            }} />
        </>
    )
}
