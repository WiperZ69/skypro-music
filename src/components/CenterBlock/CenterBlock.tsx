'use client'

import { setTracks } from '@/store/features/trackSlice'
import { useAppDispatch } from '@/store/store'
import { Track } from '@/types/track'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { TrackItem } from '../TrackItem/TrackItem'
import styles from './CenterBlock.module.scss'

type FilterType = 'author' | 'year' | 'genre' | null
type FilterItem = string | { name: string; value: string }

type CenterBlockProps = {
	tracks: Track[]
	error?: string
	isLoading?: boolean
	categoryName?: string
}

const FilterButton = ({
	filterName,
	label,
	activeFilter,
	setActiveFilter,
	items,
	onSelect,
	selectedValue,
}: {
	filterName: FilterType
	label: string
	activeFilter: FilterType
	setActiveFilter: (filter: FilterType) => void
	items: FilterItem[]
	onSelect: (filterName: FilterType, value: string) => void
	selectedValue: string | null
}) => {
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

export const CenterBlock = ({
	tracks,
	error,
	isLoading,
	categoryName,
}: CenterBlockProps) => {
	const [search, setSearch] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [activeFilter, setActiveFilter] = useState<FilterType>(null)
	const [selectedFilters, setSelectedFilters] = useState<{
		author: string | null
		genre: string | null
		year: string | null
	}>({
		author: null,
		genre: null,
		year: null,
	})

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (tracks.length > 0) {
			dispatch(setTracks(tracks))
		}
	}, [dispatch, tracks])

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedSearch(search), 300)
		return () => clearTimeout(handler)
	}, [search])

	const uniqueAuthors = useMemo(
		() => Array.from(new Set(tracks.map(track => track.author))),
		[tracks],
	)

	const uniqueGenres = useMemo(
		() => Array.from(new Set(tracks.flatMap(track => track.genre))),
		[tracks],
	)

	const dateOptions = [
		{ name: 'Сначала новые', value: 'desc' },
		{ name: 'Сначала старые', value: 'asc' },
		{ name: 'По умолчанию', value: 'default' },
	]

	const filteredTracks = useMemo(() => {
		let result = [...tracks]

		if (debouncedSearch) {
			result = result.filter(
				track =>
					track.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
					track.author.toLowerCase().includes(debouncedSearch.toLowerCase()),
			)
		}

		if (selectedFilters.author) {
			result = result.filter(track => track.author === selectedFilters.author)
		}

		if (selectedFilters.genre) {
			result = result.filter(track =>
				track.genre.includes(selectedFilters.genre!),
			)
		}

		if (selectedFilters.year === 'desc') {
			result = result.sort((a, b) =>
				b.release_date.localeCompare(a.release_date),
			)
		} else if (selectedFilters.year === 'asc') {
			result = result.sort((a, b) =>
				a.release_date.localeCompare(b.release_date),
			)
		}

		return result
	}, [tracks, debouncedSearch, selectedFilters])

	const handleSelect = (filterName: FilterType, value: string) => {
		if (!filterName) return
		setSelectedFilters(prev => ({
			...prev,
			[filterName]: prev[filterName] === value ? null : value,
		}))
	}

	const handleResetFilters = () => {
		setSelectedFilters({ author: null, genre: null, year: null })
		setActiveFilter(null)
		setSearch('')
		setDebouncedSearch('')
	}

	return (
		<div className={styles.centerblock}>
			<div className={styles.centerblock__search}>
				<svg className={styles.search__svg}>
					<use xlinkHref='/Image/icon/sprite.svg#icon-search'></use>
				</svg>
				<input
					className={styles.search__text}
					type='search'
					placeholder='Поиск'
					name='search'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>

			<h2 className={styles.centerblock__h2}>{categoryName || 'Треки'}</h2>

			<div className={styles.centerblock__filter}>
				<div className={styles.filter__title}>Искать по:</div>

				<FilterButton
					filterName='author'
					label='исполнителю'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					items={uniqueAuthors}
					onSelect={handleSelect}
					selectedValue={selectedFilters.author}
				/>

				<FilterButton
					filterName='year'
					label='году выпуска'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					items={dateOptions}
					onSelect={handleSelect}
					selectedValue={selectedFilters.year}
				/>

				<FilterButton
					filterName='genre'
					label='жанру'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					items={uniqueGenres}
					onSelect={handleSelect}
					selectedValue={selectedFilters.genre}
				/>

				<div className={styles.filter__reset} onClick={handleResetFilters}>
					Сбросить
				</div>
			</div>

			<div className={styles.centerblock__content}>
				<div className={styles.content__title}>
					<div className={classNames(styles.playlistTitle__col, styles.col01)}>
						Трек
					</div>
					<div className={classNames(styles.playlistTitle__col, styles.col02)}>
						Исполнитель
					</div>
					<div className={classNames(styles.playlistTitle__col, styles.col03)}>
						Альбом
					</div>
					<div className={classNames(styles.playlistTitle__col, styles.col04)}>
						<svg className={styles.playlistTitle__svg}>
							<use xlinkHref='/Image/icon/sprite.svg#icon-watch'></use>
						</svg>
					</div>
				</div>

				<div className={styles.content__playlist}>
					{isLoading && (
						<div className={styles.loading}>Загрузка треков...</div>
					)}

					{error && <div className={styles.error}>{error}</div>}

					{!isLoading && !error && filteredTracks.length > 0
						? filteredTracks.map(track => (
								<TrackItem key={track._id} track={track} />
							))
						: !isLoading &&
							!error &&
							tracks.length > 0 && (
								<div className={styles.noResults}>Ничего не найдено</div>
							)}
				</div>
			</div>
		</div>
	)
}
