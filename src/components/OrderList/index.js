import styles from './style.module.css'
import { OrderItem } from '../OrderItem'

export const OrderList = () => {
    return <div className={styles.orderList}>
        <h1>Meu pedido</h1>
        <div className={styles.orderItens}>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
        </div>
        <h2 className={styles.price}>Total: R$130.90</h2>
        <button className={styles.redButton}>Avançar</button>
    </div>
}
