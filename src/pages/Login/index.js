import { InitialHeader } from "../../components/InitialHeader";
import { InitialForm } from "../../components/InitialForm";
import { InitialButtons } from "../../components/InitialButtons";
import { useState } from "react";

export const Login = () => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [formWasTouched, setFormWasTouched] = useState(false);

  const handleFormValidityLogIn = (isValid, wasTouched) => {
    setFormIsValid(isValid);
    setFormWasTouched(wasTouched);
  };

  return (
    <div>
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
