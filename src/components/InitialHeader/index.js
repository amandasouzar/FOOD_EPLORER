import { BigLogoHexagon } from '../../assets/BigLogoHexagon'
import styles from './style.module.css'

export const InitialHeader = () => {
    return <div className={styles.headerDiv}>
        <BigLogoHexagon className={styles.logo}></BigLogoHexagon>
        <h1>food explorer</h1>
    </div>
}