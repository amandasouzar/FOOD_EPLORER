import { InitialHeader } from "../../components/InitialHeader";
import { InitialForm } from "../../components/InitialForm";
import { useState } from "react";

import styles from "./style.module.css"

export const Signup = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [formWasTouched, setFormWasTouched] = useState(false);

  const handleFormValiditySignUp = (isValid, wasTouched) => {
    setFormIsValid(isValid);
    setFormWasTouched(wasTouched);
  };

  return (
    <div className={styles.accessDiv}>
      <InitialHeader />
        <InitialForm
          SignUp={true}
          LogIn={false}
          handleFormValiditySignUp={handleFormValiditySignUp}
          path="/"
          formIsValid={formIsValid}
          formWasTouched={formWasTouched}
        />
    </div>
  );
};
