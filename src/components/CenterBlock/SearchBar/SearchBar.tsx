'use client'
import styles from '../CenterBlock.module.scss'

type SearchBarProps = {
	search: string
	setSearch: (value: string) => void
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
	return (
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
	)
}
