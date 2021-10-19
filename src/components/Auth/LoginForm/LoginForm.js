import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils/validation";
import firebase from "../../../utils/Firebase";
import "firebase/auth";
import "./LoginForm.scss";

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((Response) => {
          console.log("response", Response);
          setUser(Response.user);
          setUserActive(Response.user.emailVerified);

          if (!Response.user.emailVerified) {
            toast.warning(
              "para poder hacer login antes tienes que verificar la cuenta."
            );
          }
        })
        .catch((err) => {
          console.log(err);
          handlerError(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form">
      <h1> Musica Para Todos </h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor ingresa un correo valido
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contrasenia"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              ingresa una contrasenia mayor a 5 caracteres
            </span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar Sesion
        </Button>
      </Form>
      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />
      )}
      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p onClick={() => setSelectedForm(null)}>
          No tienes una cuenta?{" "}
          <span onClick={() => setSelectedForm("regiter")}> Registrate</span>
        </p>
      </div>
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el email de verificacion");
      })
      .catch((err) => {
        handlerError(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        si no has recibido el email de verificacion puedes volver a enviarlo
        haciendo click <span onClick={resendVerificationEmail}> aqui.</span>
      </p>
    </div>
  );
}

function handlerError(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o contrasenia son incorrectos");
      break;

    case "auth/too-many-requests":
      toast.warning(
        "Has enviado demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo"
      );
      break;

    case "auth/user-not-found":
      toast.warning("usuario o contrasenia son incorrectos");
      break;

    default:
      break;
  }
}
