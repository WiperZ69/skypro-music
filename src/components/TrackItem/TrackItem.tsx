'use client'

import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { Track } from '@/types/track'
import { formatTime } from '@/utils/formatTime'
import styles from './TrackItem.module.scss'

type Props = {
	track: Track
}

export const TrackItem = ({ track }: Props) => {
	const dispatch = useAppDispatch()
	const currentTrack = useAppSelector(state => state.tracks.currentTrack)
	const isPlay = useAppSelector(state => state.tracks.isPlay)

	const onClickTrack = () => {
		if (currentTrack?._id === track._id) {
			dispatch(setIsPlay(!isPlay))
		} else {
			dispatch(setCurrentTrack(track))
			dispatch(setIsPlay(true))
		}
	}

	return (
		<div className={styles.playlist__item} onClick={onClickTrack}>
			<div className={styles.playlist__track}>
				<div className={styles.track__title}>
					<div className={styles.track__titleImage}>
						{currentTrack?._id === track._id ? (
							isPlay ? (
								<span className={styles.track__circle}></span>
							) : (
								<span className={styles.track__circleStatic}></span>
							)
						) : (
							<svg className={styles.track__titleSvg}>
								<use xlinkHref='/Image/icon/sprite.svg#icon-note'></use>
							</svg>
						)}
					</div>
					<div className={styles.track__titleText}>
						<span className={styles.track__titleLink}>{track.name}</span>
					</div>
				</div>
				<div className={styles.track__author}>
					<span className={styles.track__authorLink}>{track.author}</span>
				</div>
				<div className={styles.track__album}>
					<span className={styles.track__albumLink}>{track.album}</span>
				</div>
				<div className={styles.track__time}>
					<svg className={styles.track__timeSvg}>
						<use xlinkHref='/Image/icon/sprite.svg#icon-like'></use>
					</svg>
					<span className={styles.track__timeText}>
						{formatTime(track.duration_in_seconds)}
					</span>
				</div>
			</div>
		</div>
	)
}
