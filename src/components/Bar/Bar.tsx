'use client'

import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useLikeTrack } from '../../app/hooks/useLikeTracks'
import {
	playNext,
	playPrev,
	setIsPlay,
	setVolume,
	toggleRepeat,
	toggleShuffle,
} from '../../store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './Bar.module.scss'

export const Bar = () => {
	const currentTrack = useAppSelector(state => state.tracks.currentTrack)
	const isPlay = useAppSelector(state => state.tracks.isPlay)
	const dispatch = useAppDispatch()
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const isRepeat = useAppSelector(state => state.tracks.isRepeat)
	const isShuffle = useAppSelector(state => state.tracks.isShuffle)
	const volume = useAppSelector(state => state.tracks.volume)
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const [isLoadedTrack, setIsLoadedTrack] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [isSeeking, setIsSeeking] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [prevVolume, setPrevVolume] = useState(0.5)
	const { toggleLike, isLike } = useLikeTrack(currentTrack || null)

	useEffect(() => {
		if (!audioRef.current) return
		if (!currentTrack) return

		audioRef.current.volume = volume
		if (isPlay) {
			audioRef.current.play().catch(err => console.log('Play error:', err))
		} else {
			audioRef.current.pause()
		}
	}, [currentTrack, isPlay, volume])

	const togglePlay = () => {
		if (!audioRef.current) return

		if (isPlay) {
			audioRef.current.pause()
			dispatch(setIsPlay(false))
		} else {
			audioRef.current.play()
			dispatch(setIsPlay(true))
		}
	}

	const onToggleShuffle = () => {
		dispatch(toggleShuffle())
	}
	const toggleMute = () => {
		if (isMuted) {
			dispatch(setVolume(prevVolume))
			setIsMuted(false)
		} else {
			setPrevVolume(volume)
			dispatch(setVolume(0))
			setIsMuted(true)
		}
	}

	const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value) / 100
		dispatch(setVolume(value))
		if (value > 0 && isMuted) setIsMuted(false)
		if (value === 0 && !isMuted) setIsMuted(true)
		if (value > 0) setPrevVolume(value)
	}

	useEffect(() => {
		if (currentTrack) {
			setIsLoadedTrack(false)
		}
	}, [currentTrack])

	const onTimeUpdate = () => {
		if (audioRef.current && !isSeeking) {
			setCurrentTime(audioRef.current.currentTime)
		}
	}

	const onSeekStart = () => {
		if (!isLoadedTrack) return
		setIsSeeking(true)
	}

	const onSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isLoadedTrack) return
		const value = Number(e.target.value)
		setCurrentTime(value)
	}

	const onSeekEnd = () => {
		if (!isLoadedTrack) return
		if (audioRef.current) {
			audioRef.current.currentTime = currentTime
		}
		setIsSeeking(false)
	}

	const onLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration)
			setIsLoadedTrack(true)
		}
	}

	const onEnded = () => {
		if (isRepeat) {
			audioRef.current?.play()
		} else {
			dispatch(playNext())
		}
	}

	const handleLikeClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (!currentTrack) return

		if (isAuthenticated) {
			toggleLike()
		} else {
			toast.info('Чтобы лайкнуть трек необходимо зарегистрироваться')
		}
	}

	if (!currentTrack) return <></>

	return (
		<div className={styles.bar}>
			<audio
				className={styles.audio}
				ref={audioRef}
				controls
				src={currentTrack?.track_file}
				loop={isRepeat}
				onTimeUpdate={onTimeUpdate}
				onLoadedMetadata={onLoadedMetadata}
				onEnded={onEnded}
			></audio>
			<div className={styles.bar__content}>
				<ProgressBar
					max={duration || 0}
					value={currentTime}
					readOnly={!isLoadedTrack}
					step={0.01}
					onChange={onSeekChange}
					onMouseDown={onSeekStart}
					onMouseUp={onSeekEnd}
					onTouchStart={onSeekStart}
					onTouchEnd={onSeekEnd}
				/>
				<div className={styles.bar__playerBlock}>
					<div className={classNames(styles.bar__player, styles.player)}>
						<div className={styles.player__controls}>
							<div
								className={styles.player__btnPrev}
								onClick={() => dispatch(playPrev())}
							>
								<svg className={styles.player__btnPrevSvg}>
									<use xlinkHref='/Image/icon/sprite.svg#icon-prev'></use>
								</svg>
							</div>
							<div
								className={classNames(styles.player__btnPlay, styles.btn, {
									[styles.disabled]: !isLoadedTrack,
								})}
								onClick={isLoadedTrack ? togglePlay : undefined}
							>
								{isPlay ? (
									<svg className={styles.player__btnPauseSvg}>
										<use xlinkHref='/Image/icon/sprite.svg#icon-pause'></use>
									</svg>
								) : (
									<svg className={styles.player__btnPlaySvg}>
										<use xlinkHref='/Image/icon/sprite.svg#icon-play'></use>
									</svg>
								)}
							</div>
							<div
								className={styles.player__btnNext}
								onClick={() => dispatch(playNext())}
							>
								<svg className={styles.player__btnNextSvg}>
									<use xlinkHref='/Image/icon/sprite.svg#icon-next'></use>
								</svg>
							</div>
							<div
								className={classNames(styles.player__btnRepeat, styles.btnIcon)}
								onClick={() => dispatch(toggleRepeat())}
							>
								<svg
									className={classNames(styles.player__btnRepeatSvg, {
										[styles.repeat]: isRepeat,
									})}
								>
									<use xlinkHref='/Image/icon/sprite.svg#icon-repeat'></use>
								</svg>
							</div>
							<div
								className={classNames(
									styles.player__btnShuffle,
									styles.btnIcon,
								)}
								onClick={onToggleShuffle}
							>
								<svg
									className={classNames(styles.player__btnShuffleSvg, {
										[styles.shuffleActive]: isShuffle,
									})}
								>
									<use xlinkHref='/Image/icon/sprite.svg#icon-shuffle'></use>
								</svg>
							</div>
						</div>

						<div
							className={classNames(styles.player__trackPlay, styles.trackPlay)}
						>
							<div className={styles.trackPlay__contain}>
								<div className={styles.trackPlay__image}>
									<svg className={styles.trackPlay__svg}>
										<use xlinkHref='/Image/icon/sprite.svg#icon-note'></use>
									</svg>
								</div>
								<div className={styles.trackPlay__author}>
									<Link className={styles.trackPlay__authorLink} href=''>
										{currentTrack?.name}
									</Link>
								</div>
								<div className={styles.trackPlay__album}>
									<Link className={styles.trackPlay__albumLink} href=''>
										{currentTrack?.author}
									</Link>
								</div>
							</div>

							<div className={styles.trackPlay__dislike}>
								<div
									className={classNames(styles.trackPlay__like)}
									onClick={handleLikeClick}
								>
									<svg
										className={`${styles.trackPlay__likeSvg} ${isLike ? styles.liked : ''} ${isAuthenticated ? '' : styles.dislike}`}
									>
										<use
											xlinkHref={`/Image/icon/sprite.svg#${isAuthenticated ? 'icon-like' : 'icon-dislike'}`}
										></use>
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.bar__volumeBlock}>
						<div className={styles.volume__content}>
							<div className={styles.volume__image} onClick={toggleMute}>
								<svg className={styles.volume__svg}>
									<use
										xlinkHref={`/Image/icon/sprite.svg#${isMuted || volume === 0 ? 'icon-mute' : 'icon-volume'}`}
									></use>
								</svg>
							</div>
							<div className={classNames(styles.volume__progress, styles.btn)}>
								<input
									className={classNames(
										styles.volume__progressLine,
										styles.btn,
									)}
									type='range'
									name='range'
									value={volume * 100}
									onChange={onChangeVolume}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
