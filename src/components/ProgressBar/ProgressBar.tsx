import { ChangeEvent, MouseEvent, TouchEvent } from 'react'
import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
	max: number
	value: number
	step: number
	readOnly: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onMouseDown?: (e: MouseEvent<HTMLInputElement>) => void
	onMouseUp?: (e: MouseEvent<HTMLInputElement>) => void
	onTouchStart?: (e: TouchEvent<HTMLInputElement>) => void
	onTouchEnd?: (e: TouchEvent<HTMLInputElement>) => void
}

export default function ProgressBar({
	max,
	value,
	step,
	readOnly,
	onChange,
	onMouseDown,
	onMouseUp,
	onTouchStart,
	onTouchEnd,
}: ProgressBarProps) {
	return (
		<input
			className={styles.styledProgressInput}
			type='range'
			min='0'
			max={max}
			value={value}
			step={step}
			onChange={onChange}
			readOnly={readOnly}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onTouchStart={onTouchStart}
			onTouchEnd={onTouchEnd}
		/>
	)
}
