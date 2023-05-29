import { Link } from "react-router-dom";
import styles from "./style.module.css";

export const InitialButtons = (props) => {

  const handleFormSubmission = (event) => {
    // enviar para back
    // retornar credenciais?
}

  return (
    <div className={styles.buttonsDiv}>
      <button className={styles.redButton} onClick={handleFormSubmission} disabled={!props.formIsValid || !props.formWasTouched}>
        {props.SignUp ? "Criar conta" : "Entrar"}
      </button>
      <Link className={styles.linkDiv} to={props.path}>
        <button className={styles.clearButton}>
          {props.SignUp ? "Já tenho uma conta" : "Criar uma conta"}
        </button>
      </Link>
    </div>
  );
};
