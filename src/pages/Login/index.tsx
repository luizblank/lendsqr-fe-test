import styles from  './style.module.scss';
import Field from "../../components/Field";

export default function Login() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.design_section}>
                    <img className={styles.logo} src="logo.svg" alt="lendsqr logo" />
                    <img src="design.svg" alt="Person design" />
                </div>

                <div className={styles.login_section}>
                    <div className={styles.info}>
                        <h1>Welcome!</h1>
                        <h3>Enter details to login</h3>

                        <form action="/dashboard" method="get">
                            <Field placeholder="Email" type="email"/>
                            <Field placeholder="Password" type="password"/>
                            <a className={styles.forgot_password} href="/">FORGOT PASSWORD?</a>

                            <button className={styles.login_button} type='submit'>LOG IN</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}