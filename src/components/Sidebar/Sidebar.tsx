import Image from 'next/image'
import Link from 'next/link'
import styles from './Sidebar.module.scss'
import { SidebarPersonal } from './SidebarPersonal'

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<SidebarPersonal />
			<div className={styles.sidebar__block}>
				<div className={styles.sidebar__list}>
					<div className={styles.sidebar__item}>
						<Link className={styles.sidebar__link} href='/music/category/2'>
							<Image
								className={styles.sidebar__Image}
								src='/Image/playlist01.png'
								alt="day's playlist"
								width={250}
								height={170}
								priority
							/>
						</Link>
					</div>
					<div className={styles.sidebar__item}>
						<Link className={styles.sidebar__link} href='/music/category/3'>
							<Image
								className={styles.sidebar__Image}
								src='/Image/playlist02.png'
								alt="day's playlist"
								width={250}
								height={170}
							/>
						</Link>
					</div>
					<div className={styles.sidebar__item}>
						<Link className={styles.sidebar__link} href='/music/category/4'>
							<Image
								className={styles.sidebar__Image}
								src='/Image/playlist03.png'
								alt="day's playlist"
								width={250}
								height={170}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
