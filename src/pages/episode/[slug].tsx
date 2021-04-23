import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './slug.module.scss';

type Episode = {
  id: number;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image width={700} height={160} src={episode.thumbnail} alt={episode.title} objectFit="cover" />
        <button type="button">
          <img src="/play.svg" alt="Tocar" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  );
}

// A statics path será obrigatória nesse contexto por estamos gerando páginas SSG de páginas dinâmicas (pois estamos usando um arquivo [].tsx)
// Quando se passa vazio o que determina o comportamento de uma página dinâmica é o fallback
// Se paths estiverem vazio e o fallback for false e o usuário acessar a page ele retornará error404
// Se paths estiverem vazio e o fallback for true e o usuário acessar a page ele tentará acessar as infos da api pelo lado client
// Se paths estiverem vazio e o fallback for blocking e o usuário acessar a page ele aguardará a page ser carregada no node pra dps mostrar no client ja carregada
// 
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params; // pegar os parâmetros pelo contexto
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    thumbnail: data.thumbnail,
    description: data.description,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
  }

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  }
}