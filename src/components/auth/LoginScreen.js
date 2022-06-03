import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startlogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';
export const LoginScreen = () => {

    const dispatch = useDispatch();

    // Login
    const [ formLoginValues, handleLoginInputChange, resetLogin ] = useForm( {
        lEmail: 'breiner@gmail.com',
        lPassword: '123456'
    } );

    // Registro
    const [ formRegistroValues, handleRegistroInputChange, resetRegistro ] = useForm( {
        rName: 'Nando',
        rEmail: 'nando@gmail.com',
        rPassword1: '123456',
        rPassword2: '123456' 
    } );

    const { lEmail, lPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startlogin(lEmail, lPassword));

    }

    const { rName, rEmail, rPassword1, rPassword2 } = formRegistroValues;


    const handleRegistro = (e) => {
        e.preventDefault();


        if( rPassword1 !== rPassword2) {
            return Swal.fire('Error','Las contraseñas no coinciden', 'error')
        }
        dispatch(startRegister( rName, rEmail, lPassword));

        console.log(formRegistroValues)

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="email"
                                name='lEmail'
                                className="form-control"
                                placeholder="Correo"
                                value={ lEmail }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name='lPassword'
                                className="form-control"
                                placeholder="Contraseña"
                                value = { lPassword }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegistro}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={rName}
                                onChange={handleRegistroInputChange}
                                name='rName'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={rEmail}
                                onChange={handleRegistroInputChange}
                                name='rEmail'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={rPassword1} 
                                onChange={handleRegistroInputChange}
                                name='rPassword1'
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={rPassword2} 
                                onChange={handleRegistroInputChange}
                                name='rPassword2'
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
