import { putUserFullname, putUserPassword, postProfileImage } from '@/apis/userApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/querykey';

export const useMutateUser = userId => {
  const queryClient = useQueryClient();

  const putUserFullNameMutation = useMutation({
    mutationFn: putUserFullname,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.user.detail(userId),
      });
    },
  });

  const putUserPasswordMutation = useMutation({
    mutationFn: putUserPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.user.detail(userId),
      });
    },
  });

  const putUserImageMutation = useMutation({
    mutationFn: postProfileImage,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.user.detail(userId),
      });
    },
  });
  return { putUserFullNameMutation, putUserPasswordMutation, putUserImageMutation };
};
