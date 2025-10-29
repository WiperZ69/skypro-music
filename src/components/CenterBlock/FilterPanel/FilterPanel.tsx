'use client'

import styles from '../CenterBlock.module.scss'
import { FilterButton } from './FilterButton'

type FilterType = 'author' | 'year' | 'genre' | null
type FilterItem = string | { name: string; value: string }

type FilterPanelProps = {
	activeFilter: FilterType
	setActiveFilter: (filter: FilterType) => void
	selectedFilters: {
		author: string | null
		genre: string | null
		year: string | null
	}
	onSelect: (filterName: FilterType, value: string) => void
	onReset: () => void
	uniqueAuthors: string[]
	uniqueGenres: string[]
	dateOptions: FilterItem[]
}

export const FilterPanel = ({
	activeFilter,
	setActiveFilter,
	selectedFilters,
	onSelect,
	onReset,
	uniqueAuthors,
	uniqueGenres,
	dateOptions,
}: FilterPanelProps) => {
	return (
		<div className={styles.centerblock__filter}>
			<div className={styles.filter__title}>Искать по:</div>

			<FilterButton
				filterName='author'
				label='исполнителю'
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				items={uniqueAuthors}
				onSelect={onSelect}
				selectedValue={selectedFilters.author}
			/>

			<FilterButton
				filterName='year'
				label='году выпуска'
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				items={dateOptions}
				onSelect={onSelect}
				selectedValue={selectedFilters.year}
			/>

			<FilterButton
				filterName='genre'
				label='жанру'
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				items={uniqueGenres}
				onSelect={onSelect}
				selectedValue={selectedFilters.genre}
			/>

			<div className={styles.filter__reset} onClick={onReset}>
				Сбросить
			</div>
		</div>
	)
}
