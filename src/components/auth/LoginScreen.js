import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    loginEmail: '',
    loginPassword: '',
  });
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    registerName: '',
    registerEmail: '',
    registerPassword1: '',
    registerPassword2: '',
  });
  const { loginEmail, loginPassword } = formLoginValues;
  const {
    registerName,
    registerEmail,
    registerPassword1,
    registerPassword2,
  } = formRegisterValues;

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(loginEmail, loginPassword));
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    if (registerPassword1 !== registerPassword2) {
      return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    }
    dispatch(startRegister(registerEmail, registerPassword1, registerName));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleSubmitLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSubmitRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword1"
                value={registerPassword1}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
