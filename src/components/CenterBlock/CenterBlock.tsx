'use client'

import { data } from '@/data/data'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { TrackItem } from '../TrackItem/TrackItem'
import styles from './CenterBlock.module.scss'

type FilterType = 'author' | 'year' | 'genre' | null

export const CenterBlock = () => {
	const [search, setSearch] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [activeFilter, setActiveFilter] = useState<FilterType>(null)

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

	const uniqueYears = useMemo(
		() =>
			Array.from(new Set(data.map(track => track.release_date.split('-')[0]))),
		[],
	)

	const uniqueGenres = useMemo(
		() => Array.from(new Set(data.flatMap(track => track.genre))),
		[],
	)

	const currentFilterList = useMemo(() => {
		switch (activeFilter) {
			case 'author':
				return uniqueAuthors
			case 'year':
				return uniqueYears
			case 'genre':
				return uniqueGenres
			default:
				return []
		}
	}, [activeFilter, uniqueAuthors, uniqueYears, uniqueGenres])

	return (
		<div className={styles.centerblock}>
			{/* Поиск */}
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

				<div
					className={classNames(styles.filter__button, {
						[styles.active]: activeFilter === 'author',
					})}
					onClick={() =>
						setActiveFilter(activeFilter === 'author' ? null : 'author')
					}
				>
					исполнителю
				</div>

				<div
					className={classNames(styles.filter__button, {
						[styles.active]: activeFilter === 'year',
					})}
					onClick={() =>
						setActiveFilter(activeFilter === 'year' ? null : 'year')
					}
				>
					году выпуска
				</div>

				<div
					className={classNames(styles.filter__button, {
						[styles.active]: activeFilter === 'genre',
					})}
					onClick={() =>
						setActiveFilter(activeFilter === 'genre' ? null : 'genre')
					}
				>
					жанру
				</div>
				{activeFilter && (
					<div className={styles.filter__list}>
						{currentFilterList.map((item, idx) => (
							<div key={`${item}-${idx}`}>{item}</div>
						))}
					</div>
				)}
			</div>

			{/* Контент */}
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
