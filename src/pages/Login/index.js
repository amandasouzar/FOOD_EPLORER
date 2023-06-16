import { InitialHeader } from "../../components/InitialHeader";
import { InitialForm } from "../../components/InitialForm";
import { useState } from "react";

import styles from './style.module.css'

export const Login = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [formWasTouched, setFormWasTouched] = useState(false);

  const handleFormValidityLogIn = (isValid, wasTouched) => {
    setFormIsValid(isValid);
    setFormWasTouched(wasTouched);
  };

  return (
    <div className={styles.accessDiv}>
      <InitialHeader />
      <InitialForm 
        SignUp={false}
        LogIn={true}
        path="/signup"
        handleFormValidityLogIn={handleFormValidityLogIn}
        formIsValid={formIsValid}
        formWasTouched={formWasTouched}
      />
    </div>
  );
};
