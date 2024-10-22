"use client";
import { useState, useMemo } from "react";
import SideBarTab from "./SideBarTab";
import ContentArea from "./ContentArea";
import { FaBook, FaSchool } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6"
import { MdGroups, MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/lib/features/users/user.slice";
import { getUserGroups } from "@/lib/features/group/group.slice";

const allTabs = [
  { name: "Groups", icon: <MdGroups />, label: "우리들의 모임" },
  { name: "Rooms", icon: <FaSchool />, label: "우리들의 공간" },
  { name: "Books", icon: <FaBook />, label: "우리들의 책" },
  { name: "Chats", icon: <MdMessage />, label: "참여중인 채팅보기" },
  { name: "MyGroups", icon: <FaUserGroup />, label: "참여중인 모임" }
];

export default function SideBar() {
  const [activeTab, setActiveTab] = useState("Groups")
  const user = useSelector(getCurrentUser)
  const userGroups = useSelector(getUserGroups)

  const tabs = useMemo(() => {
    // 사용자가 그룹에 참여 중이면 모든 탭을 표시
    if (userGroups.length > 0) {
      console.log(userGroups);
      return allTabs;
    } else {
      // 그룹에 참여하지 않았으면 Chats 탭을 제외
      return allTabs.filter(tab => tab.name !== "Chats" && tab.name !== "MyGroups");
    }
  }, [user]);

  return (
    <div>
      <div className="flex min-h-screen w-full">
        <aside id="default-sidebar" className="w-64 bg-green-100" aria-label="Sidebar">
          <div className="h-full overflow-y-auto px-3 py-4">
            <ul className="space-y-2 font-medium">
              {tabs.map((tab) => (
                <SideBarTab
                  key={tab.name}
                  tab={tab}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))}
            </ul>
          </div>
        </aside>
        <ContentArea activeTab={activeTab} />
      </div>
    </div>
  );
}