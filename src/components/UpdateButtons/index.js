import styles from './style.module.css'
import { Snackbar, Alert } from "@mui/material";
import { useState } from 'react';
import { useReq } from '../../hooks/useReq';

export const UpdateButtons = (props) => {

    const [snackbarMessage, setSnackbarMessage] = useState()

    const {deleteReq} = useReq()

    const handleDeletePlate = async() => {

        try {
            const response = await deleteReq('/plates/delete/' + props.plate_id)

            if (!response.ok) {
                console.log(response)
            } else {
                const jsonResponse = await response.json()
                setSnackbarMessage({message: jsonResponse.message, severity: 'success'});
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
        open={snackbarMessage}
        onClose={() => {
          setSnackbarMessage();
        }}
        autoHideDuration={3000}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <Alert severity={snackbarMessage && snackbarMessage.severity}>
          {snackbarMessage && snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
}