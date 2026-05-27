import { useState } from 'react';
import styles from './style.module.scss';

interface FieldProps {
    placeholder: string,
    type: string
}

export default function Field({ placeholder, type }: FieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className={styles.wrapper}>
                <input placeholder={placeholder} type={!showPassword ? type : 'text'} id={type}/>
                { type == 'password' &&
                    <button onClick={() => setShowPassword(!showPassword)} type='button' className={styles.show_button}>{!showPassword ? "SHOW" : "HIDE"}</button>
                }
            </div>
        </>
    )
}