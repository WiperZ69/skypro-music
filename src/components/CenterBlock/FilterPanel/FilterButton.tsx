'use client'

import classNames from 'classnames'
import styles from '../CenterBlock.module.scss'

type FilterType = 'author' | 'year' | 'genre' | null
type FilterItem = string | { name: string; value: string }

type FilterButtonProps = {
	filterName: FilterType
	label: string
	activeFilter: FilterType
	setActiveFilter: (filter: FilterType) => void
	items: FilterItem[]
	onSelect: (filterName: FilterType, value: string) => void
	selectedValue: string | null
}

export const FilterButton = ({
	filterName,
	label,
	activeFilter,
	setActiveFilter,
	items,
	onSelect,
	selectedValue,
}: FilterButtonProps) => {
	const isActive = activeFilter === filterName

	return (
		<div className={styles.filter__button_wrapper}>
			<div
				className={classNames(styles.filter__button, {
					[styles.active]: isActive,
				})}
				onClick={() => setActiveFilter(isActive ? null : filterName)}
			>
				{label}
			</div>

			{isActive && (
				<div className={styles.filter__list}>
					<div className={styles.filter__box}>
						{items.map((item, idx) => {
							const displayText = typeof item === 'string' ? item : item.name
							const value = typeof item === 'string' ? item : item.value
							const isSelected = selectedValue === value

							return (
								<div
									key={`${value}-${idx}`}
									className={classNames(styles.filter__list_item, {
										[styles.selected]: isSelected,
									})}
									onClick={() => onSelect(filterName, value)}
								>
									{displayText}
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}
