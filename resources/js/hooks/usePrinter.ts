import { AlertToast } from '@/components/alertToast/AlertToast';
import { useServicePrinter } from '@/Services/printer/useServicePrinter';
import { useCallback, useEffect, useState } from 'react';

export const usePrinter = (ventaId: number) => {
  const [printing, setPrinting] = useState(false);
  const { refetch, isLoading } = useServicePrinter(ventaId);

  const handleTicket = useCallback(async () => {
    setPrinting(true);
    const { data } = await refetch();
    if (data) {
      setPrinting(false);
    }

    if (!data) {
      AlertToast({
        type: 'error',
        message: 'Error al imprimir el ticket',
      });
    }
  }, [refetch]);

  useEffect(() => {
    if (!isLoading) {
      setPrinting(false);
    }
  }, [isLoading]);

  return { printing, setPrinting, handleTicket };
};
