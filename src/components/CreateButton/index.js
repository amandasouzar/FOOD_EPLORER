import styles from './style.module.css'

export const CreateButton = () => {
    return <div className={styles.buttonDiv}>
        <button className={styles.button}>
            Salvar prato
        </button>
    </div>
}