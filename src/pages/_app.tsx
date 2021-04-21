import { Header } from '../components/Header';
import '../styles/globas.scss';
import styles from '../styles/app.module.scss';
import { Player } from '../components/Player';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
