import styles from './style.module.css'
import {PlatesCarousel} from '../PlatesCarousel'

export const CategoriesList = (props) => {
    return <div className={styles.categoriesList}>
        <h1>Nome da categoria</h1>
        <PlatesCarousel/>
    </div>
}