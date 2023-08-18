import type { AppProps } from 'next/app';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../styles/globals.scss';
import 'primeicons/primeicons.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import { Provider } from 'react-redux';
import store from '@/src/store';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
