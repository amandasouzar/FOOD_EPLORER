import { useContext } from "react"
import { OrderContext } from "../context/OrderContext"

export const useOrder = () => {
     const context = useContext(OrderContext)

     if (!context) {
        throw new Error('É necessário um context ativo.')
     } 

     return context
}