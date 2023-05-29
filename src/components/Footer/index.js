import styles from './style.module.css'
import { FooterHexagonLogo } from '../../assets/FooterHexagonLogo'

export const Footer = () => {
    return <div className={styles.footer}>
        <div className={styles.logoBox}>
            <FooterHexagonLogo className={styles.footerLogo}/>
            <p className={styles.footerTitle}>food explorer</p>
        </div>
        <div className={styles.rigthBox}>
            <p className={styles.footerText}>2023 - Todos os direitos reservados</p>
        </div>
    </div>
}