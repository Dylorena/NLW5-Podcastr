import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';
import { PlayerContext } from '../../context/playerContext';
import 'rc-slider/assets/index.css';
import Styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';


export function Player() {
  const { episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    togglePlay,
    toggleLoop,
    toggleshuffle,
    setPlayingState,
    playPrevious,
    playNext,
    clearEpisode
  } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // o current é o valor da referência
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });

  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEpisodeEndend(){
    if(hasNext){
      playNext();
    } else {
      clearEpisode();
    }
  }

  return (
    <div className={Styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        {/* O trecho episode?.title = verifica se há episódio */}
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={Styles.currentEpisode}>
          <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={Styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )
      }

      <footer className={!episode ? Styles.empty : ''}>
        <div className={Styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          <div className={Styles.Slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }} />
            ) : (
              <div className={Styles.emptySlider} />
            )}

          </div>
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            // Essas funções onPlay e onPause, permitem que os controles sejam acessados pelo teclado do computador
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
            onEnded={handleEpisodeEndend}
            autoPlay
          />
        )}

        <div className={Styles.buttons}>
          <button type="button" disabled={!episode || episodeList.length === 1} onClick={toggleshuffle} className={isShuffling ? Styles.isActive : ''}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button type="button" className={Styles.playButton} disabled={!episode} onClick={togglePlay}>
            {isPlaying
              ? <img src="/pause.svg" alt="Pausar" />
              : <img src="/play.svg" alt="Tocar" />
            }

          </button>
          <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" onClick={() => toggleLoop()} disabled={!episode} className={isLooping ? Styles.isActive : ''}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div >
  );
}