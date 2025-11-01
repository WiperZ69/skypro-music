'use client'
import { CenterBlock } from '../../../components/CenterBlock/CenterBlock'
import { useAppSelector } from '../../../store/store'

export default function Home() {
	const { FetchError, FetchIsLoading, allTracks } = useAppSelector(
		state => state.tracks,
	)
	return (
		<CenterBlock
			title={'Треки'}
			tracks={allTracks}
			error={FetchError}
			isLoading={FetchIsLoading}
		/>
	)
}
