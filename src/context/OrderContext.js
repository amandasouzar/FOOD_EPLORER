import { createContext } from "react";

export const OrderContext = createContext({
    quantity: 0,
    setQuantity: () => {}
})