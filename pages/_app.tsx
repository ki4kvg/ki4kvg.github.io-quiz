import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { NhostClient, NhostProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'

export const nhost = new NhostClient({
    subdomain: "pczebmvrovjkvzfofmvz",
    region: "eu-central-1",
    graphqlUrl: 'https://pczebmvrovjkvzfofmvz.hasura.eu-central-1.nhost.run/v1/graphql',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
      <NhostProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <Component {...pageProps} />
        </NhostApolloProvider>
      </NhostProvider>
  )
}
