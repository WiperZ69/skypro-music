import styles from './LoadingTrackItem.module.scss'

export const LoadingTrackItem = () => {
	return (
		<div className={styles.loadingItem}>
			<div className={styles.loadingTrack}>
				<div className={styles.loadingTitle}>
					<div className={styles.loadingImage}></div>
					<div className={styles.loadingBlock}></div>
				</div>
				<div className={styles.loadingAuthor}></div>
				<div className={styles.loadingAlbum}></div>
				<div className={styles.loadingBox}>
					<div className={styles.loadingLike}></div>
					<div className={styles.loadingTime}></div>
				</div>
			</div>
		</div>
	)
}
