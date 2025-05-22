import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'flatpickr/dist/flatpickr.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import 'swiper/swiper-bundle.css';
import { AppWrapper } from './components/common/PageMeta';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { router } from './router/routes.routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AppWrapper>
                    <RouterProvider router={router}></RouterProvider>
                </AppWrapper>
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>,
);
