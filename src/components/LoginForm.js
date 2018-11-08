import React from 'react'
import { Button, Form, Grid, Image, Segment, Loader, Message } from 'semantic-ui-react'
import { withFormik } from 'formik';
import * as yup from 'yup';
import v from 'voca';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import logo from '../assets/images/logo-256.png';

class LoginForm extends React.Component {
  state = {
    roles: [],
    show: false
  }
  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
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
          <Grid.Column style={{ maxWidth: 450 }}>
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
                  placeholder='Correo electrónico'
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
              </Segment>
            </Form>
            <Modal show={this.state.show} handleClose={this.hideModal} >
            <p>Modal</p>
             <p>Data</p>
            </Modal>
            <Button type="button" color='teal' fluid size='medium' onClick={this.showModal}>
                  Olvidé mi contraseña&nbsp;
            </Button>
            
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<LoginForm />, container);

const validationSchema = yup.object().shape({
  email: yup.string()/* .email('Correo electrónico inválido') */.required('Correo electrónico es requerido'),
  password: yup.string().min(3, 'Contraseña debe ser más larga.').required('Password requerido'),
  rol: yup.string().required('Rol es requerido')
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