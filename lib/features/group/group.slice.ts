// groupSlice.ts
import {
  GroupPostResponseModel,
  GroupResponseModel,
  initialGroupState,
  JoiningModel,
} from '@/app/model/group/group.model';
import { RootState } from '@/lib/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'group',
  initialState: initialGroupState,
  reducers: {
    saveGroups: (state, action: PayloadAction<GroupResponseModel[]>) => {
      state.groups = action.payload;
    },
    saveEnableGroups: (state, action: PayloadAction<GroupResponseModel[]>) => {
      state.enableGroups = action.payload;
    },
    saveLeaderGroups: (state, action: PayloadAction<GroupResponseModel[]>) => {
      state.leadergroups = action.payload;
    },
    saveGroupMembers: (state, action: PayloadAction<JoiningModel[]>) => {
      if (action.payload.length > 0) {
        const groupId = action.payload[0].groupId;
        state.groupMembers[groupId] = action.payload;
      }
    },
    saveGroupEnableMembers: (state, action: PayloadAction<JoiningModel[]>) => {
      if (action.payload.length > 0) {
        const groupId = action.payload[0].groupId;
        state.groupEnableMembers[groupId] = action.payload;
      }
    },
    saveUserGroups: (state, action: PayloadAction<GroupResponseModel[]>) => {
      state.userGroups = action.payload;
    },
    addGroup: (state, action: PayloadAction<GroupResponseModel>) => {
      state.groups.push(action.payload);
    },
    addEnableGroup: (state, action: PayloadAction<GroupResponseModel>) => {
      state.enableGroups.push(action.payload);
    },
    addGroupMember: (state, action: PayloadAction<JoiningModel>) => {
      const { groupId } = action.payload;
      if (!state.groupMembers[groupId]) {
        state.groupMembers[groupId] = [];
      }
      state.groupMembers[groupId].push(action.payload);
    },
    addGroupEnableMember: (state, action: PayloadAction<JoiningModel>) => {
      const { groupId } = action.payload;
      if (!state.groupEnableMembers[groupId]) {
        state.groupEnableMembers[groupId] = [];
      }
      state.groupEnableMembers[groupId].push(action.payload);
    },
    updateGroup: (state, action: PayloadAction<GroupResponseModel>) => {
      const index = state.groups.findIndex(group => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    deleteEnableGroup: (state, action: PayloadAction<number>) => {
      state.enableGroups = state.enableGroups.filter(group => group.id !== action.payload);
    },
    deleteGroupMember: (state, action: PayloadAction<{ groupId: number; nickname: string }>) => {
      const { groupId, nickname } = action.payload;
      if (state.groupMembers[groupId]) {
        state.groupMembers[groupId] = state.groupMembers[groupId].filter(user => user.nickname !== nickname);
      }
    },
    deleteGroupEnableMember: (state, action: PayloadAction<{ groupId: number; nickname: string }>) => {
      const { groupId, nickname } = action.payload;
      if (state.groupEnableMembers[groupId]) {
        state.groupEnableMembers[groupId] = state.groupEnableMembers[groupId].filter(user => user.nickname !== nickname);
      }
    },
    saveCurrentGroup: (state, action: PayloadAction<GroupResponseModel | null>) => {
      if (action.payload !== null) {
        state.currentGroup = action.payload;
      }
    },
    saveGroupPosts: (state, action: PayloadAction<GroupPostResponseModel[]>) => {
      state.groupPostsNotices = action.payload.filter(post => post.postCategory === '공지 사항');
      state.groupPostsGenerals = action.payload.filter(post => post.postCategory !== '공지 사항');
    },
    addGroupPost: (state, action: PayloadAction<GroupPostResponseModel>) => {
      switch (action.payload.postCategory) {
        case '공지 사항':
          state.groupPostsNotices.push(action.payload);
          break;
        case '자유 게시판':
          state.groupPostsGenerals.push(action.payload);
          break;
      }
    },
    updateGroupPost: (state, action: PayloadAction<GroupPostResponseModel>) => {

      const { id, postCategory } = action.payload;
      const updatePostList = (posts: GroupPostResponseModel[]) => {
        const index = posts.findIndex(post => post.id === id);
        if (index !== -1) {
          posts[index] = action.payload;
        }
      };

      switch (postCategory) {
        case '공지 사항':
          updatePostList(state.groupPostsNotices);
          break;
        case '자유 게시판':
          updatePostList(state.groupPostsGenerals);
          break;
      }
    },
    deleteGroupPost: (state, action: PayloadAction<{ id: number; postCategory: string }>) => {
      const { id, postCategory } = action.payload;
      switch (postCategory) {
        case '공지 사항':
          state.groupPostsNotices = state.groupPostsNotices.filter(post => post.id !== id);
          break;
        case '자유 게시판':
          state.groupPostsGenerals = state.groupPostsGenerals.filter(post => post.id !== id);
          break;
      }
    },
    saveCurrentGroupPost: (state, action: PayloadAction<GroupPostResponseModel | null>) => {
      state.currentGroupPost = action.payload;
    },
    saveLikedPosts: (state, action: PayloadAction<GroupPostResponseModel[]>) => {
      state.likePosts = action.payload;
    },
    addLikedPost: (state, action: PayloadAction<GroupPostResponseModel>) => {
      state.likePosts.push(action.payload)
    },
    deleteLikedPost: (state, action: PayloadAction<number>) => {
      state.likePosts = state.likePosts.filter(likePost => likePost.id !== action.payload);
    },
    saveLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    saveError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});
export const getGroupPosts = createSelector(
  (state: RootState) => state.group.groupPostsNotices,
  (state: RootState) => state.group.groupPostsGenerals,
  (groupPostsNotice, groupPostsGeneral) => ({
    groupPostsNotice,
    groupPostsGeneral,
  })
);
export const getGroups = (state: RootState) => state.group.groups;
export const getEnableGroups = (state: RootState) => state.group.enableGroups;
export const getLikedPosts = (state: RootState) => state.group.likePosts;
export const getUserGroups = (state: RootState) => state.group.userGroups;
export const getGroupMembers = (state: RootState) => state.group.groupMembers;
export const getGroupEnableMembers = (state: RootState) => state.group.groupEnableMembers;
export const getCurrentGroup = (state: RootState) => state.group.currentGroup;
export const getCurrentGroupPost = (state: RootState) => state.group.currentGroupPost;
export const getLeaderGroups = (state: RootState) => state.group.leadergroups;
export const getIsLoading = (state: RootState) => state.group.isLoading;
export const getError = (state: RootState) => state.group.error

export const {
  saveGroups,
  saveEnableGroups,
  saveUserGroups,
  saveLeaderGroups,
  saveGroupMembers,
  saveGroupEnableMembers,
  addGroupEnableMember,
  deleteGroupEnableMember,
  addGroupMember,
  deleteGroupMember,
  addGroup,
  addEnableGroup,
  deleteEnableGroup,
  updateGroup,
  deleteGroup,
  saveGroupPosts,
  addGroupPost,
  updateGroupPost,
  deleteGroupPost,
  saveCurrentGroup,
  saveCurrentGroupPost,
  saveLikedPosts,
  deleteLikedPost,
  addLikedPost,
  saveLoading,
  saveError,
} = groupSlice.actions;

export default groupSlice.reducer;
