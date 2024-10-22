import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { userService} from '@/app/service/user/user.service';
import { UserModel } from '@/app/model/user/user.model';
import { AppDispatch } from "@/lib/store"; 

export const useUser = (nickname: string) => {
    const queryClient = useQueryClient();
    const dispatch: AppDispatch = useDispatch();

    const { data: user, isLoading, error} = useQuery<UserModel, Error>(
        ['user', nickname],
        () => userService.findUserDetail(nickname, dispatch),
        {
            staleTime: 5 * 60 * 1000,
            onError: (error: Error) => {
                console.error('Error fetching user:', error.message);
            },
        }
    );

    const updateUserPassword = useMutation(
        (newPassword: string) => userService.modifyPassword(nickname, newPassword, dispatch),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['user', nickname]);
            },
            onError: (error: Error) => {
                console.error('Error updating password:', error.message);
            },
        }
    );

    return {
        user,
        isLoading,
        error,
        updateUserPassword: updateUserPassword.mutate,
    };
};