import { ReactNode } from 'react'
import styles from './layout.module.css'
interface AuthLayoutProps {
	children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.containerEnter}>
					<div className={styles.modal__block}>{children}</div>
				</div>
			</div>
		</div>
	)
}
