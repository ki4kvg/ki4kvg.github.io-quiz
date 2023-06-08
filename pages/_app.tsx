import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { NhostClient, NhostProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'

export const nhostClient = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    graphqlUrl: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <NhostProvider nhost={nhostClient}>
        <NhostApolloProvider nhost={nhostClient}>
          <Component {...pageProps} />
        </NhostApolloProvider>
      </NhostProvider>
  )
}
