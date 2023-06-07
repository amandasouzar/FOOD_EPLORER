import { OrderRecordItem } from '../OrderRecordItem'
import styles from './style.module.css'

export const OrderRecordList = () => {
    return <div className={styles.orderRecordList}>
        <h1>Pedidos</h1>
        <div className={styles.itens}>
            <OrderRecordItem/>
            <OrderRecordItem/>
            <OrderRecordItem/>
        </div>
    </div>
}