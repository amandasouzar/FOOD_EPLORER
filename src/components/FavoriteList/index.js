import styles from './style.module.css'
import { FavoriteItem } from '../FavoriteItem'

export const Favoritelist = () => {
    return <div className={styles.favoriteList}>
        <h1>Meus favoritos</h1>
        <div className={styles.favoriteItens}>
            <FavoriteItem/>
            <FavoriteItem/>
            <FavoriteItem/>
        </div>
    </div>
}