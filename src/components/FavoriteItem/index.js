import styles from './style.module.css'
import { useReq } from '../../hooks/useReq'
import { useEffect, useState } from 'react'

export const FavoriteItem = (props) => {

    const {getReq, putReq} = useReq()
    const [plateData, setPlateData] = useState() 

    const getPlate = async() => {
        try {
            const response = await getReq('/plates/get/' + props.plate.plate_id)

            if (!response.ok) {
                console.log(response)
            } else {
                const jsonResponse = await response.json()
                setPlateData(jsonResponse.message.plate[0])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteFavorite = () => {
        props.handleDeleteFavorite(props.plate.plate_id)
    }

    useEffect(() => {
        getPlate()
    }, [])

    return <div className={styles.favoriteItemBox}>
        {plateData ? 
        <>
        <img className={styles.plateImg} src={'http://localhost:3003/images/' + plateData.image} onClick={() => {window.location.href=`/client/${plateData.id}`}}></img>
        <div className={styles.nameBox}>
            <div className={styles.topLine}>
                <h2>{plateData.name}</h2>
            </div>
            <button onClick={handleDeleteFavorite}>Remover dos favoritos</button>
        </div> 
        </>
        : <p>loading...</p>
        }
    </div>
}