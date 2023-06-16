import { useState } from "react";
import { InitialButtons } from "../InitialButtons";
import styles from "./style.module.css";

export const InitialForm = (props) => {
  const [wasTouchedName, setWasTouchedName] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [name, setName] = useState('');

  const [wasTouchedEmail, setWasTouchedEmail] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [email, setEmail] = useState('');


  const [wasTouchedPass, setWasTouchedPass] = useState(false);
  const [passIsValid, setPassIsValid] = useState(true);
  const [pass, setPass] = useState('');


  const blurHandlerName = (event) => {
    setWasTouchedName(true);

    if (event.target.value === "") {
      setNameIsValid(false);
    } else {
      setNameIsValid(true);
      setName(event.target.value)
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const blurHandlerEmail = (event) => {
    setWasTouchedEmail(true);

    if (validateEmail(event.target.value) == false) {
      setEmailIsValid(false);
      return;
    }
    if (event.target.value === "") {
      setEmailIsValid(false);
      return;
    }

    setEmailIsValid(true);
    setEmail(event.target.value)
  };

  const blurHandlerPass = (event) => {
    setWasTouchedPass(true);

    if (event.target.value === "" || event.target.value.length < 6) {
      setPassIsValid(false);
    } else {
      setPassIsValid(true);
      setPass(event.target.value)
    }
  };

  if (props.SignUp) {
    if (
      nameIsValid &&
      emailIsValid &&
      passIsValid &&
      wasTouchedName &&
      wasTouchedEmail &&
      wasTouchedPass
    ) {
      props.handleFormValiditySignUp(true, true);
    } else {
      props.handleFormValiditySignUp(false, true);
    }
  }
  if (!props.SignUp) {
    if (emailIsValid && passIsValid && wasTouchedEmail && wasTouchedPass) {
      props.handleFormValidityLogIn(true, true);
    } else {
      props.handleFormValidityLogIn(false, true);
    }
  }

  return (
    <form className={styles.formDiv}>
      <h1 className={styles.desktopTitle}>{props.SignUp ? 'Crie sua conta' : 'Faça login'}</h1>
      {props.SignUp && (
        <label className={styles.label}>
          Seu nome
          <input
            type="text"
            placeholder="Exemplo: Maria da Silva"
            className={styles.input}
            onBlur={blurHandlerName}
          ></input>
          {!nameIsValid && wasTouchedName && props.SignUp && (
            <p className={styles.error}>Campo obrigatório</p>
          )}
        </label>
      )}
      {(props.SignUp || props.LogIn) && (
        <>
          <label className={styles.label}>
            Email
            <input
              type="email"
              placeholder="Exemplo: exemplo@exemplo.com.br"
              className={styles.input}
              onBlur={blurHandlerEmail}
            ></input>
            {!emailIsValid && wasTouchedEmail && (
              <p className={styles.error}>Digite um email válido</p>
            )}
          </label>
          <label className={styles.label}>
            Senha
            <input
              type="password"
              placeholder="Minimo de seis caracteres"
              className={styles.input}
              onBlur={blurHandlerPass}
            ></input>
            {!passIsValid && wasTouchedPass && (
              <p className={styles.error}>Digite uma senha válida</p>
            )}
          </label>
        </>
      )}
      <InitialButtons
        SignUp={props.SignUp}
        LogIn={props.LogIn}
        path={props.path}
        formIsValid={props.formIsValid}
        formWasTouched={props.formWasTouched}
        inputs={{email, name, pass}}
      />
    </form>
  );
};
