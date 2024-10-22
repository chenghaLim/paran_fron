"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';

// 동적 임포트 컴포넌트의 타입 정의
type DynamicComponentProps = {
  active: boolean;
  onSelect: () => void;
};

const GroupRow = dynamic<DynamicComponentProps>(() => import("./GroupRow"), { ssr: false });
const RoomRow = dynamic<DynamicComponentProps>(() => import("./RoomRow"), { ssr: false });
const BookRow = dynamic<DynamicComponentProps>(() => import("./BookRow"), { ssr: false });

// 탭 설정에 대한 타입 정의
type TabKey = 'Groups' | 'Rooms' | 'Books';

type TabConfig = {
  [key in TabKey]: {
    label: string;
    component: React.ComponentType<DynamicComponentProps>;
  };
};

const tabConfig: TabConfig = {
  Groups: { label: "소모임", component: GroupRow },
  Rooms: { label: "공간", component: RoomRow },
  Books: { label: "도서", component: BookRow },
};

type TabButtonProps = {
  initialTab?: TabKey;
};

export default function TabButton({ initialTab }: TabButtonProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab || "Groups");

  const handleTabClick = useCallback((tab: TabKey): void => {
    setActiveTab(tab);
  }, []);

  const renderActiveContent = useMemo((): JSX.Element | null => {
    const ActiveComponent = tabConfig[activeTab]?.component;
    return ActiveComponent ? <ActiveComponent active={true} onSelect={() => {}} /> : null;
  }, [activeTab]);

  const tabButtons = useMemo((): JSX.Element[] => (
    Object.entries(tabConfig).map(([key, { label }]) => (
      <li key={key} className="me-2">
        <button
          type="button"
          className={`inline-block rounded-t-lg border-b-2 p-4 ${
            activeTab === key
              ? "border-green-600 text-green-600"
              : "border-transparent hover:border-gray-300 hover:text-gray-600"
          }`}
          onClick={() => handleTabClick(key as TabKey)}
        >
          {label}
        </button>
      </li>
    ))
  ), [activeTab, handleTabClick]);

  return (
    <>
      <div className="mb-4 border-b border-gray-200 text-center text-sm font-medium text-gray-500">
        <ul className="-mb-px flex flex-wrap">
          {tabButtons}
        </ul>
      </div>
      <ul>
        {renderActiveContent}
      </ul>
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: TabButtonProps }> {
  return {
    props: {
      initialTab: "Groups",
    },
  };
}