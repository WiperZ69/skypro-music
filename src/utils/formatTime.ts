export const formatTime = (seconds: number): string => {
	if (seconds < 0) seconds = 0
	const m = Math.floor(seconds / 60)
	const s = seconds % 60
	return `${m}:${s.toString().padStart(2, '0')}`
}

export const getTimePanel = (
	currentTime: number,
	totalTime: number | undefined,
) => {
	if (totalTime) {
		return `${formatTime(currentTime)} / ${formatTime(totalTime)}`
	}
}
