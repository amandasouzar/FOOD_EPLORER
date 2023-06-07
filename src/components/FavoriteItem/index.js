import styles from './style.module.css'

export const FavoriteItem = (props) => {
    return <div className={styles.favoriteItemBox}>
        <img src='#'></img>
        <div className={styles.nameBox}>
            <div className={styles.topLine}>
                <h2>Salada Radish</h2>
            </div>
            <button>Remover dos favoritos</button>
        </div>
    </div>
}