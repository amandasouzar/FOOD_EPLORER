import styles from './style.module.css'

export const OrderItem = (props) => {
    return <div className={styles.orderItemBox}>
        <img src='#'></img>
        <div className={styles.infoBox}>
            <div className={styles.topLine}>
                <h2>x1</h2>
                <h2>Salada Radish</h2>
                <p>R$25.99</p>
            </div>
            <button>Excluir</button>
        </div>
    </div>
}