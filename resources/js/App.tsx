import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { AppWrapper } from './components/common/PageMeta';
import { AxiosProvider } from './context/AxiosContext';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './router/routes.routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const App = () => {
    return (
        <AxiosProvider>
            <MantineProvider>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <Suspense>
                            <AppWrapper>
                                <ToastContainer />
                                <RouterProvider router={router}></RouterProvider>
                            </AppWrapper>
                        </Suspense>
                    </QueryClientProvider>
                </ThemeProvider>
            </MantineProvider>
        </AxiosProvider>
    );
};
