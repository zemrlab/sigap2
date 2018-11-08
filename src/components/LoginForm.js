import React from 'react'
import { Button, Form, Grid, Image, Segment, Loader, Message, Divider, Header } from 'semantic-ui-react'
import { withFormik } from 'formik';
import * as yup from 'yup';
import v from 'voca';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import logo from '../assets/images/logo-256.png';
import logo_pass from '../assets/images/recup_contras.png';


class LoginForm extends React.Component {
  state = {
    roles: [],
    show: false
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
  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
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

                <Divider horizontal>*</Divider>

                <Button type="button" color='brown' fluid size='large' onClick={this.showModal}>
                  Olvidé mi contraseña&nbsp;
                </Button>

                <Modal 
                  isOpen={this.state.show}
                  contentLabel="Minimal Modal Example"
                  className="Modal"
                >
                <Form size='large' >
                <Segment stacked>
                <Header as='h2' image={logo_pass} content='Nueva contraseña' color='brown'/>
                <Form.Select 
                  fluid 
                  options={this.state.roles}
                  placeholder='Tipo de usuario'
                  name="rol_recuperar"
                  value={values.rol_recuperar}
                  onChange={(e,{name, value}) => setFieldValue(name, value)}
                  //error={touched['rol_recuperar'] && !!errors['rol_recuperar']}
                />
                <Divider horizontal></Divider>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Correo electrónico / Nombre de usuario'
                  name="email_recuperar"
                  type="text"
                  value={values.email_recuperar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //error={touched['email_recuperar'] && !!errors['email_recuperar']}
                />

                <Divider horizontal></Divider>

                <Button color='teal' fluid size='large' disabled={validationRecuperar()}>
                  Obtener nueva contraseña&nbsp;
                </Button>

                <Divider horizontal></Divider>

                <Button color='teal' fluid size='large' onClick={this.hideModal}>
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
function validationRecuperar(){

  return yup.object().shape({
  email_recuperar: yup.string()/* .email('Correo electrónico inválido') */.required('Correo electrónico es requerido'),
  rol_recuperar: yup.string().required('Rol es requerido')
  });
}
const validationSchema = yup.object().shape({
  email: yup.string()/* .email('Correo electrónico inválido') */.required('Correo electrónico es requerido'),
  password: yup.string().min(3, 'Contraseña debe ser más larga.').required('Password requerido'),
  rol: yup.string().required('Rol es requerido'),
});

const mapPropsToValues =  () => ({email: '', password: '', rol: '',email_recuperar: '', rol_recuperar: '' });

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