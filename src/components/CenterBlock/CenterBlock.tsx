'use client'

import { data } from '@/data/data'
import { setTracks } from '@/store/features/trackSlice'
import { useAppDispatch } from '@/store/store'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { TrackItem } from '../TrackItem/TrackItem'
import styles from './CenterBlock.module.scss'

type FilterType = 'author' | 'year' | 'genre' | null

type FilterItem = string | { name: string; value: string }

const FilterButton = ({
	filterName,
	label,
	activeFilter,
	setActiveFilter,
	items,
}: {
	filterName: FilterType
	label: string
	activeFilter: FilterType
	setActiveFilter: (filter: FilterType) => void
	items: FilterItem[]
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

							return (
								<div
									key={`${displayText}-${idx}`}
									className={styles.filter__list_item}
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

export const CenterBlock = () => {
	const [search, setSearch] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [activeFilter, setActiveFilter] = useState<FilterType>(null)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (data.length > 0) {
			dispatch(setTracks(data))
		}
	}, [dispatch])

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search)
		}, 300)

		return () => {
			clearTimeout(handler)
		}
	}, [search])

	const filteredTracks = data.filter(
		track =>
			track.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
			track.author.toLowerCase().includes(debouncedSearch.toLowerCase()),
	)

	const uniqueAuthors = useMemo(
		() => Array.from(new Set(data.map(track => track.author))),
		[],
	)

	const uniqueGenres = useMemo(
		() => Array.from(new Set(data.flatMap(track => track.genre))),
		[],
	)

	const dateOptions = [
		{ name: 'Сначала новые', value: 'desc' },
		{ name: 'Сначала старые', value: 'asc' },
		{ name: 'По умолчанию', value: 'default' },
	]

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

			<h2 className={styles.centerblock__h2}>Треки</h2>

			<div className={styles.centerblock__filter}>
				<div className={styles.filter__title}>Искать по:</div>
				<FilterButton
					filterName='author'
					label='исполнителю'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					items={uniqueAuthors}
				/>
				<FilterButton
					filterName='year'
					label='году выпуска'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					items={dateOptions}
				/>
				<FilterButton
					filterName='genre'
					label='жанру'
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
					items={uniqueGenres}
				/>
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
					{filteredTracks.length > 0 ? (
						filteredTracks.map(track => (
							<TrackItem key={track._id} track={track} />
						))
					) : (
						<div className={styles.noResults}>Ничего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
