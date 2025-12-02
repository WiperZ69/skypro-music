'use client'

import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { setTracks } from '../../store/features/trackSlice'
import { useAppDispatch } from '../../store/store'
import { Track } from '../../types/track'
import { LoadingTrackItem } from '../LoadingTrackItem/LoadingTrackItem'
import { TrackItem } from '../TrackItem/TrackItem'
import styles from './CenterBlock.module.scss'
import { FilterPanel } from './FilterPanel/FilterPanel'
import { SearchBar } from './SearchBar/SearchBar'

type FilterType = 'author' | 'year' | 'genre' | null

type CenterBlockProps = {
	tracks: Track[]
	error?: string | null
	isLoading?: boolean
	categoryName?: string
	title: string
}

export const CenterBlock = ({
	tracks,
	error,
	isLoading,
	title,
}: CenterBlockProps) => {
	const [search, setSearch] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [activeFilter, setActiveFilter] = useState<FilterType>(null)
	const [selectedFilters, setSelectedFilters] = useState({
		author: null as string | null,
		genre: null as string | null,
		year: null as string | null,
	})

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (tracks.length > 0) dispatch(setTracks(tracks))
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
			const q = debouncedSearch.toLowerCase()
			result = result.filter(
				track =>
					track.name.toLowerCase().includes(q) ||
					track.author.toLowerCase().includes(q),
			)
		}
		if (selectedFilters.author)
			result = result.filter(track => track.author === selectedFilters.author)
		if (selectedFilters.genre)
			result = result.filter(track =>
				track.genre.includes(selectedFilters.genre!),
			)
		if (selectedFilters.year === 'desc')
			result.sort((a, b) => b.release_date.localeCompare(a.release_date))
		else if (selectedFilters.year === 'asc')
			result.sort((a, b) => a.release_date.localeCompare(b.release_date))

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
			<SearchBar search={search} setSearch={setSearch} />
			<h2 className={styles.centerblock__h2}>
				{title || <div className={styles.centerblock__loadingTitle}></div>}
			</h2>

			<FilterPanel
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				selectedFilters={selectedFilters}
				onSelect={handleSelect}
				onReset={handleResetFilters}
				uniqueAuthors={uniqueAuthors}
				uniqueGenres={uniqueGenres}
				dateOptions={dateOptions}
			/>

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
						<div className={styles.loadingList}>
							{Array.from({ length: 10 }).map((_, i) => (
								<LoadingTrackItem key={i} />
							))}
						</div>
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
