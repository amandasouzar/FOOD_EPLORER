import styles from './style.module.css'

export const OrderRecordItem = () => {
    return <div className={styles.orderRecordItem}>
        <div className={styles.topLine}>
            <p>0004</p>
            <p>Pendente</p>
            <p>20/05 às 18h00</p>
        </div>
        <div className={styles.platesList}>
            <ul>
                <li>
                    <p>1x</p>
                    <p>Salada Radish</p>
                </li>
                <li>
                    <p>1x</p>
                    <p>Salada Radish</p>
                </li>
                <li>
                    <p>1x</p>
                    <p>Salada Radish</p>
                </li>
                <li>
                    <p>1x</p>
                    <p>Salada Radish</p>
                </li>
            </ul>
        </div>
    </div>
}