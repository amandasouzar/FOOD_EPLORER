import styles from './style.module.css'
import { QuantityButton } from '../QuantityButton'
import {CartLogo} from '../../assets/CartLogo'
import { useState } from 'react'


export const OrderPlateButtons = (props) => {

    const price = props.plateData.price
    const [quantity, setQuantity] = useState()

    const handleQuantity = (quantity) => {
        setQuantity(quantity)
    }

    const handleAddToOrder = async() => {
        const admin_id = props.plateData.admin_id

        try {
            const response = await fetch('http://localhost:3003/orders/create/' + admin_id + '/2', {
                method: "POST",
                headers: {
                    "COntent-Type" : "application/json"
                },
                body: JSON.stringify({
                    
                })
            })
        } catch (err) {
            console.log(err)
        }
    }

    return <div className={styles.buttons}>
        <QuantityButton handleQuantity={handleQuantity} />
        <button className={styles.orderButton}>
            <CartLogo className={styles.cartImg}/>
            <p>pedir - R${price * quantity}</p>
        </button>
    </div>
}