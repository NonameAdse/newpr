import { ReactElement, ReactNode, useState } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout from '@/components/layout'

import '@/styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const path = useRouter()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)

  return (
    // <Provider store={store}>
    //   <SessionProvider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
    //   </SessionProvider>
    // </Provider>
  )
}

export default App
