import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR, });

  return (
    <header className={Styles.HeaderContainer}>
      <img src="/logo.svg" alt="Podcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}