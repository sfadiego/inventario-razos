import { useServicePrinter } from '@/Services/printer/useServicePrinter';
import { useCallback, useState } from 'react';

export const usePrinter = (ventaId: number) => {
  const [printing, setPrinting] = useState(false);
  const { refetch } = useServicePrinter(ventaId);
  const handleTicket = useCallback(async () => {
    setPrinting(true);
    const { data } = await refetch();
    if (data) {
      setPrinting(false);
    }
  }, [refetch]);
  
  return { printing, setPrinting, handleTicket };
};
