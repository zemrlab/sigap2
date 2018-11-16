import React from 'react'
import { Button, Form, Grid, Image, Segment, Loader, Message, Divider, Header} from 'semantic-ui-react'
import { withFormik } from 'formik';
import * as yup from 'yup';
import v from 'voca';
import Modal from 'react-modal';
import _ from 'lodash';

import logo from '../assets/images/logo-256.png';
import logo_pass from '../assets/images/recup_contras.png';


class LoginForm extends React.Component {
  state = {
    roles: [],
    show: false,
    mostrarBotonRecuperar: false,
    nombre_usuario_recuperar: "",
    email_recuperar: "",
    dni_recuperar: "",
    telefono_recuperar: "",
    password_nuevo: ""
  }

  componentDidMount(){
    fetch('https://backend-estadisticas-portal.herokuapp.com//LoginController/modulos').then()
    fetch(`${process.env.REACT_APP_API_ROOT}/LoginController/modulos`)
    .then(response => response.ok ? response.json() : Promise.resolve({result: 'error'}))
    .then(response => this.setState({
      roles: response.map(({modulo}) => ({
        key: modulo,
        value: modulo,
        text: v.titleCase(modulo)
      }))
    }))
  }

  cambiar_password = () => {
    console.log("Aqui");
    //fetch('https://backend-estadisticas-portal.herokuapp.com//LoginController/RecuperacionController').then()
    fetch(`${process.env.REACT_APP_API_ROOT}/RecuperacionController`, {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email_recuperar, 
        dni: this.state.dni_recuperar,
        telefono: this.state.telefono_recuperar,
        pass: this.state.password_nuevo
      }),
      headers: { 
        'Content-Type': 'application/json' 
      }
    })
    .then(response => response.ok ? response.json() : Promise.reject({_error: 'Hubo un error'}))
    .then(response => {
      if(response.return === 'failure' || response.result === 'error'){
        return Promise.reject({_error: 'Datos incorrectos'});
      }else{
        console.log(response);
      }
    })
  }
  

  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  handleChangeModal= (event) => {
    switch(event.target.name)
    {
      case "nombre_usuario_recuperar":
      this.setState({nombre_usuario_recuperar: event.target.value});
      break;

      case "email_recuperar":
      this.setState({email_recuperar: event.target.value});
      break;

      case "dni_recuperar":
      this.setState({dni_recuperar: event.target.value});
      break;

      case "telefono_recuperar":
      this.setState({telefono_recuperar: event.target.value});
      break;

      case "password_nuevo":
      this.setState({password_nuevo: event.target.value});
    }
    
  }
  handleBlurModal= (event) => {
    this.validationRecuperar;    
  }
  validationRecuperar = () => {

    this.setState({mostrarBotonRecuperar: yup.object().shape({
      email_recuperar: yup.string()/* .email('Correo electrónico inválido') */.required('Correo electrónico es requerido'),
      rol_recuperar: yup.string().required('Rol es requerido')
      }) 
    })
  }

  render(){
    const {
      handleSubmit, 
      handleChange, 
      handleBlur, 
      setFieldValue,
      isSubmitting, 
      values,
      isValid,
      touched,
      errors
    } = this.props;
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450}}>
            <Image src={logo} size="medium" centered/>
            <Form size='large' onSubmit={handleSubmit} style={{marginTop: 20}}>
              <Segment stacked>
                <Form.Select 
                  fluid 
                  options={this.state.roles}
                  placeholder='Tipo de usuario'
                  name="rol"
                  value={values.rol}
                  onChange={(e,{name, value}) => setFieldValue(name, value)}
                  error={touched['rol'] && !!errors['rol']}
                />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Correo electrónico / Nombre de usuario'
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched['email'] && !!errors['email']}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Contraseña'
                  name="password"
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched['password'] && !!errors['password']}
                />
  
                {errors._error && (
                  <Message color="red">{errors._error}</Message>
                )}
    
                <Button color='teal' fluid size='large' disabled={isSubmitting || !isValid}>
                  Ingresar&nbsp;
                  <Loader active={isSubmitting} size="tiny" inline/>
                </Button>

                <Divider/>

                <Button type="button" color='brown' fluid size='large' onClick={this.showModal}>
                  Olvidé mi contraseña&nbsp;
                </Button>

                <Modal 
                  isOpen={this.state.show}
                  contentLabel="Minimal Modal Example"
                  className="Modal"
                >
                <Form size='large' onChange = {this.validationRecuperar} method="POST">
                <Segment stacked>
                <Header as='h1' image={logo_pass} content='Nueva contraseña' color='brown' textAlign='left'/>
                <Divider />
                <Header as='h3' color='orange' textAlign='left'>Ingrese campos de validación</Header>
                
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Nombre de usuario'
                  name="nombre_usuario_recuperar"
                  type="text"
                  value={this.state.nombre_usuario_recuperar}
                  onChange={this.handleChangeModal}
                  //onBlur={handleBlur}
                  //error={touched['email_recuperar'] && !!errors['email_recuperar']}
                /> 

                <Form.Input
                  fluid
                  icon='at'
                  iconPosition='left'
                  placeholder='Correo electrónico'
                  name="email_recuperar"
                  type="text"
                  value={this.state.email_recuperar}
                  onChange={this.handleChangeModal}
                  //onBlur={handleBlur}
                  //error={touched['email_recuperar'] && !!errors['email_recuperar']}
                />     
                
                <Form.Input
                  fluid
                  icon='address card'
                  iconPosition='left'
                  placeholder='DNI'
                  name="dni_recuperar"
                  type="text"
                  value={this.state.dni_recuperar}
                  onChange={this.handleChangeModal}
                  //onBlur={handleBlur}
                  //error={touched['email_recuperar'] && !!errors['email_recuperar']}
                />      

                <Form.Input
                  fluid
                  icon='phone'
                  iconPosition='left'
                  placeholder='Número de teléfono'
                  name="telefono_recuperar"
                  type="text"
                  value={this.state.telefono_recuperar}
                  onChange={this.handleChangeModal}
                  //onBlur={handleBlur}
                  //error={touched['email_recuperar'] && !!errors['email_recuperar']}
                /> 
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Nueva contraseña'
                  name="password_nuevo"
                  type="text"
                  value={this.state.password_nuevo}
                  onChange={this.handleChangeModal}
                  //onBlur={handleBlur}
                  //error={touched['email_recuperar'] && !!errors['email_recuperar']}
                /> 
                <Button color='teal' fluid size='large' /*disabled={!this.state.mostrarBotonRecuperar}*/ onClick={this.cambiar_password}>
                  Cambiar contraseña&nbsp;
                </Button>

                <Divider />

                <Button color='grey' fluid size='large' onClick={this.hideModal}>
                  Cancelar&nbsp;
                </Button>
                </Segment>
                </Form>
                </Modal>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const validationSchema = yup.object().shape({
  email: yup.string()/* .email('Correo electrónico inválido') */.required('Correo electrónico es requerido'),
  password: yup.string().min(3, 'Contraseña debe ser más larga.').required('Password requerido'),
  rol: yup.string().required('Rol es requerido'),
});

const mapPropsToValues =  () => ({email: '', password: '', rol: ''});

const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  props.handleSubmit(values)
  .catch(setErrors)
  .finally(() => setSubmitting(false));
};


const displayName = 'LoginForm';

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
  displayName
})(LoginForm);