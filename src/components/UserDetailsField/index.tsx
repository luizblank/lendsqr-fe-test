import styles from './style.module.scss';

interface FieldProps {
    title: string,
    value: string
}

export default function UserDetailsField({ title, value }: FieldProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                <div className={styles.value}>{value}</div>
            </div>
        </>
    )
}