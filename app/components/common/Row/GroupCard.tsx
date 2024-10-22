import React from "react";
import { useAppDispatch } from "@/lib/store";
import { useRouter } from "next/navigation";
import { saveCurrentGroup } from "@/lib/features/group/group.slice";

interface GroupCardProps {
  group: any; 
  active: boolean;
  onSelect: () => void;
}

const GroupCard = ({ group, active, onSelect }: GroupCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickToDetail = () => {
    dispatch(saveCurrentGroup(group));
    router.push(`/groups/${group.id}`);
  };

  return (
    <>
      <li
        className={`max-w-sm my-2 list-none rounded-lg border border-gray-200 bg-white shadow ${active ? 'ring-2 ring-green-500' : ''
          }`}
        onClick={onSelect}
      >
        <div className="p-5">
          <h5 className={`mb-2 text-lg font-medium tracking-tight ${active ? 'text-green-600' : 'text-gray-900'
            }`}>
            {group.name || "Group Title"}
          </h5>
          <p className="mb-3 text-sm font-medium text-gray-700">
            {group.detail || "Group Content"}
          </p>
          <div className="w-full">
            <span className="text-xs bg-green-400 p-1 text-white rounded-full my-4">
              {group.categoryName}
            </span>
          </div>
          <button
            onClick={onClickToDetail}
            className={`mt-5 inline-flex w-full items-center rounded-lg p-3 text-sm font-medium text-white ${active ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 hover:bg-green-500'
              }`}
          >
            상세보기
            <svg
              className="ms-2 size-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </li>
    </>
  );
};

export default GroupCard;