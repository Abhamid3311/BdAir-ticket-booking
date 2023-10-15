import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return <SessionProvider session={pageProps.session}>
    <Provider store={store}> {getLayout(<Component {...pageProps} />)}</Provider>
  </SessionProvider>

}