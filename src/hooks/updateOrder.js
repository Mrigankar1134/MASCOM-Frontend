// hooks/useUpdateOrder.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/apiClient';

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation(
    async ({ orderId, updates }) => {
      const { data } = await apiClient.put(`/orders/${orderId}`, updates);
      return data;
    },
    {
      // Optimistic update:
      onMutate: async ({ orderId, updates }) => {
        await qc.cancelQueries(['orders', orderId]);

        const previous = qc.getQueryData(['orders', orderId]);
        qc.setQueryData(['orders', orderId], (old) => ({
          ...old,
          ...updates
        }));

        return { previous };
      },
      onError: (_err, _variables, context) => {
        qc.setQueryData(['orders', context.previous._id], context.previous);
      },
      onSettled: (_data, _error, { orderId }) => {
        qc.invalidateQueries(['orders', orderId]);
      }
    }
  );
}