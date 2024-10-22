"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from 'react-query-devtools'

export default function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24 ,
        staleTime: 5 * 60 * 1000, // 5분, 데이터의 refresh를 결정함
        // cacheTime: 10 * 60 * 1000, // 10분, 데이터의 수명을 결정함
      },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false}/> */}
    </QueryClientProvider>

  )
}
