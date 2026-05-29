import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './style.module.scss';

interface DashboardCardProps {
    icon: IconDefinition,
    label: string,
    color: string,
    bgColor: string,
    numbers: number
}

export default function DashboardCard({ icon, label, color, bgColor, numbers }: DashboardCardProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.card_icon} style={{ background: bgColor }}>
                    <FontAwesomeIcon style={{ color: color }} icon={icon} />
                </div>
                <div className={styles.card_label}>{ label }</div>
                <div className={styles.card_numbers}>{ numbers }</div>
            </div>
        </>
    )
}