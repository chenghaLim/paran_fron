import React from 'react';

interface SideBarTabProps {
  tab: {
    name: string;
    icon: React.ReactNode;
    label: string;
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SideBarTab = ({ tab, activeTab, setActiveTab }: SideBarTabProps) => {
  return (
    <li>
      <button
        type="button"
        className={`group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-green-200 ${
          activeTab === tab.name
            ? "bg-green-200 text-green-600"
            : "border-transparent hover:border-gray-300 hover:text-gray-600"
        }`}
        onClick={() => setActiveTab(tab.name)}
      >
        {tab.icon}
        <span className="ms-3 flex-1 whitespace-nowrap">{tab.label}</span>
      </button>
    </li>
  );
};

export default SideBarTab;