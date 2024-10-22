const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
    return defaultValue;
  }
  return value;
}

const requests = {
  fetRegister: '/register',
  fetchLogin: "/login",
  fetchLogout: "/logout",
  fetchUsers: process.env.NEXT_PUBLIC_USER_URL as string,
  fetchRooms: process.env.NEXT_PUBLIC_ROOM_URL as string,
  fetchFiles: process.env.NEXT_PUBLIC_FILE_URL as string,
  fetchChats: process.env.NEXT_PUBLIC_CHAT_URL as string,
  fetchGroups: process.env.NEXT_PUBLIC_GROUP_URL as string,
  fetchComments: process.env.NEXT_PUBLIC_COMMENT_URL as string,
  fetchReissue: "/reissue",
  fetchOAuth: process.env.NEXT_PUBLIC_OAUTH_URL as string
}

export default requests;