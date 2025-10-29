import { Track } from '@/types/track'
import { formatTime } from '@/utils/formatTime'
import Link from 'next/link'
import styles from './TrackItem.module.scss'

type Props = {
	track: Track
}

export const TrackItem = ({ track }: Props) => {
	return (
		<div className={styles.playlist__item}>
			<div className={styles.playlist__track}>
				<div className={styles.track__title}>
					<div className={styles.track__titleImage}>
						<svg className={styles.track__titleSvg}>
							<use xlinkHref='/Image/icon/sprite.svg#icon-note'></use>
						</svg>
					</div>
					<div className={styles.track__titleText}>
						<Link className={styles.track__titleLink} href={track.track_file}>
							{track.name} <span className={styles.track__titleSpan}></span>
						</Link>
					</div>
				</div>
				<div className={styles.track__author}>
					<Link className={styles.track__authorLink} href=''>
						{track.author}
					</Link>
				</div>
				<div className={styles.track__album}>
					<Link className={styles.track__albumLink} href=''>
						{track.album}
					</Link>
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
