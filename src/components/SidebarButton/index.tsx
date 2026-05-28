import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.module.scss';

interface SidebarButtonProps {
    icon: IconDefinition,
    label: string,
    active?: boolean
}

export default function SidebarButton({ icon, label, active = false }: SidebarButtonProps) {
    return(
        <>
            <button className={`${styles.sidebar_button} ${active ? styles.active : ''}`} type='button'>
                <FontAwesomeIcon className={styles.icon} icon={icon} />
                <span>{label}</span>
            </button>
        </>
    )
}