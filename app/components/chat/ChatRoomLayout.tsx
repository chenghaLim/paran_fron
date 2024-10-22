import React, { ReactNode } from 'react';

interface ChatRoomLayoutProps {
  children: ReactNode;
  togglePopUp: () => void;
  leaveChat: () => void;
  roomId: string;
}

export default function ChatRoomLayout ({
  children,
  togglePopUp,
  leaveChat,
  roomId
}: ChatRoomLayoutProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="relative w-full">
      <div className="fixed left-0 top-0 min-h-screen w-full">
        <div id="chatHead" className="mt-1 flex justify-end bg-gray-100 text-black opacity-90">
          <button
            type="button"
            onClick={togglePopUp}
            className="mb-1 me-2 rounded-full bg-green-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <svg
              className="size-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"></path>
              <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"></path>
            </svg>
          </button>
          <button
            onClick={leaveChat}
            className="mb-1 me-2 rounded-full bg-red-700 px-3 py-1.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            X
          </button>
        </div>
        <div className="flex h-dvh justify-center rounded-lg bg-gray-100">
          <section className="relative w-1/5 bg-green-500">
            {childrenArray[0]} {/* MyChatList */}
            {childrenArray[1]} {/* PeopleList */}
            {childrenArray[2]} {/* MyProfile */}
          </section>

          <article className="flex w-4/5 flex-col">
            <div className="w-full">
              {childrenArray[3]} {/* ChatPage */}
            </div>
          </article>
        </div>
      </div>
      </div>
   );
};
