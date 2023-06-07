import styles from './style.module.css'
import { Snackbar } from "@mui/material";
import { useState } from 'react';
import { useReq } from '../../hooks/useReq';

export const UpdateButtons = (props) => {

    const [snackbarMessage, setSnackbarMessage] = useState()

    const {deleteReq} = useReq()

    const handleDeletePlate = async() => {

        try {
            const response = await deleteReq('http://localhost:3003/plates/delete/' + props.plate_id)

            if (!response.ok) {
                console.log(response)
            } else {
                const jsonResponse = await response.json()
                setSnackbarMessage(jsonResponse.message)
                setTimeout(() => {
                    window.location.href = '/admin/home'
                }, 3000)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return <div className={styles.buttonsDiv}>
        <button type='button' className={styles.deleteButton} onClick={handleDeletePlate}>Excluir prato</button>
        <button className={styles.updateButton}>Salvar alterações</button>
        <Snackbar
          open={snackbarMessage ? true : false}
          onClose={() => {
            setSnackbarMessage();
          }}
          autoHideDuration={3000}
          message={snackbarMessage}
        ></Snackbar>
    </div>
}