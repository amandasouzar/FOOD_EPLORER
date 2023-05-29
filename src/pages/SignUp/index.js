import { InitialHeader } from "../../components/InitialHeader";
import { InitialForm } from "../../components/InitialForm";
import { InitialButtons } from "../../components/InitialButtons";
import { useState } from "react";

export const Signup = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [formWasTouched, setFormWasTouched] = useState(false);

  const handleFormValiditySignUp = (isValid, wasTouched) => {
    setFormIsValid(isValid);
    setFormWasTouched(wasTouched);
  };

  return (
    <div>
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
