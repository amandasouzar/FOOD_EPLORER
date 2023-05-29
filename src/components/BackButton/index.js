import styles from './style.module.css'
import {PointingIcon} from '../../assets/PointingIcon'

export const BackButton = () => {
    return <div className={styles.backButton}>
        <PointingIcon className={styles.backImg}/>
        <h2>Voltar</h2>
    </div>
}