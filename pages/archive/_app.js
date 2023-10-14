// note from Ethan: import '@/' not working properly in replit workspaces

import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
