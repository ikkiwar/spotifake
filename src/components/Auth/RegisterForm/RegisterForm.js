import React from "react";
import "./RegisterForm.scss";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import firebase from "../../../utils/Firebase";
import "firebase/auth";

export default function RegisterForm(props) {
  const { setSelectedForm } = props;

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo Electronico"
            icon="mail outline"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contrasenia"
            icon="eye"
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Como deberiamos llamarte?"
            icon="user circle outline"
          />
        </Form.Field>
        <Button type="submit">Continuar</Button>
      </Form>
      <div className="register-form__options">
        <p>volver</p>
        <p>
          Ya tienes una Musicfy? <span>Iniciar Sesion</span>
        </p>
      </div>
    </div>
  );
}
