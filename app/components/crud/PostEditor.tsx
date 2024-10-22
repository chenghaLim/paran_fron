"use client";
import { FileType } from '@/app/model/file/file.model';
import { GroupPostModel } from '@/app/model/group/group.model';
import { fileService } from '@/app/service/file/file.service';
import { groupPostService } from '@/app/service/group/groupPost.service';
import { getCurrentGroup, saveCurrentGroupPost } from '@/lib/features/group/group.slice';
import { getNickname } from '@/lib/features/users/user.slice';
import { useAppDispatch } from '@/lib/store';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';

export default function PostEditor() {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null); // 단일 파일
  const [selectedGroup, setSelectedGroup] = useState<string>('자유게시판');

  const group = useSelector(getCurrentGroup);
  const nickname = useSelector(getNickname);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //content change
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // title change
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file); // 첫 번째 파일 저장
      console.log('업로드된 파일:', file); // 파일 정보 로그 출력
    }
  };

  // submission
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page reload

    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (!group?.id || !nickname) {
      alert('그룹 정보가 없습니다.');
      return;
    }

    // Create
    const groupPost: GroupPostModel = {
      title,
      content,
      userGroupId: group.id,
      postCategory: selectedGroup,
      nickname: nickname
    };

    const response = await groupPostService.insert(groupPost, dispatch);

    if (imageFile && response?.id) {
      fileService.uploadFile(imageFile, FileType.GROUP_POST, response.id, dispatch);
    }
    dispatch(saveCurrentGroupPost(response))
    router.push(`/groups/board/detail/${response.id}`);
  };
  console.log(imageFile)
  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-6 max-w-2xl mx-auto">
      {/* Group/Board Selection */}
      <div>
        <label htmlFor="groupSelect" className="block text-sm font-medium text-gray-700 mb-2">
          카테고리
        </label>
        <select
          id="groupSelect"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        >
          {group?.nickname === nickname && <option value="공지 사항">공지 사항</option>}
          <option value="자유게시판">자유게시판</option>
        </select>
      </div>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          글 제목
        </label>
        <input
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 placeholder-gray-400 sm:text-base"
          placeholder="제목을 입력해주세요."
        />
      </div>

      {/* Content Text Area */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          글 내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          rows={6}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
          placeholder="내용을 입력해주세요."
        />
      </div>

      {/* Image Upload with Preview */}
      <div>
        <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">
          이미지 업로드
        </label>
        <input
          type="file"
          id="imageUpload"
          onChange={handleImageUpload}
          accept="image/*"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {imageFile && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">{imageFile.name}</p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit} 
        className="w-full py-3 px-4 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 transition-colors duration-300"
      >
        글 작성
      </button>
    </div>
  );
};