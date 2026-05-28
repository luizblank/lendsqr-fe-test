import styles from './style.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    return (
        <>
            <div className={styles.container}>
                <img className={styles.logo} src="logo.svg" alt="lendsqr logo" />

                <div className={styles.searchbar}>
                    <input type="text" placeholder="Search for anything"/>
                    <button type='button'>
                        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
                    </button>
                </div>

                <div className={styles.menu}>
                    <a href="">Docs</a>

                    <button type='button' className={styles.notification_menu}>
                        <FontAwesomeIcon className={styles.icon} icon={faBell} />
                    </button>
                    
                    <div className={styles.profile}>
                        <img src="avatar.svg" alt="Profile picture" />
                        <span className={styles.name}>Adedeji</span>
                    </div>
                </div>
            </div>
        </>
    )
}