import React, { useState } from "react";
import { FaReply } from "react-icons/fa";

interface Comment {
  id: number;
  nickname: string;
  content: string;
  depth: number;
}

interface CommentBlockProps {
  open: boolean;
}

export default function CommentBlock({ open: initialOpen }: CommentBlockProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, nickname: "파란땅콩", content: "너무 유익한 내용이에요!", depth: 0 },
    { id: 2, nickname: "나는파란악마", content: "동의합니다..", depth: 1 },
    { id: 3, nickname: "파란몽땅", content: "좋은정보 감사합니다!!", depth: 0 },
    { id: 4, nickname: "댓글러", content: "더 자세히 알려주세요!", depth: 2 },
  ]);
  const [replyTo, setReplyTo] = useState<number | null>(null); // 답글 대상 ID
  const [newComment, setNewComment] = useState<string>("");

  const toggleComments = () => setIsOpen(!isOpen);

  const handleReply = (id: number) => {
    setReplyTo((prev) => (prev === id ? null : id)); // 같은 댓글의 입력창 열고 닫기
  };

  const handleSubmit = () => {
    if (newComment.trim() === "") return;

    const depth = replyTo !== null ? comments.find((c) => c.id === replyTo)?.depth! + 1 : 0;

    const newCommentData = {
      id: comments.length + 1,
      nickname: "사용자", // 사용자 정보 (예시)
      content: newComment,
      depth,
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
    setReplyTo(null); // 입력창 닫기
  };

  return (
    <div className="mt-4 bg-green-50 rounded-lg">
      <button
        onClick={toggleComments}
        className="w-full p-4 flex justify-between items-center text-lg font-semibold"
      >
        댓글
        <svg
          className={`size-3 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4">
          {/* 상단 댓글 입력창 */}
          <div className="mb-4 flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg"
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500"
            >
              작성
            </button>
          </div>

          {/* 댓글 리스트 */}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-2 px-4 py-2 bg-white rounded flex flex-col "
              style={{ paddingLeft: `${comment.depth * 20}px` }} // depth에 따른 들여쓰기
            >
              <div className="flex px-6">
                {comment.depth > 0 && (
                  <div className="flex items-center justify-center">
                    <FaReply className="text-gray-400 rotate-180" />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{comment.nickname}</p>
                  <p>{comment.content}</p>
                  <button
                    className="text-sm text-green-500 hover:underline mt-2"
                    onClick={() => handleReply(comment.id)}
                  >
                    답글
                  </button>
                </div>
              </div>

              {/* 대댓글 입력창 */}
              {replyTo === comment.id && (
                <div className="mt-2 flex items-center px-6 space-x-4">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="대댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    작성
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
