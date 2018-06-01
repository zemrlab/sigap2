import React from 'react'
import { Button, Form, Grid, Header, Image, Segment, Loader, Message } from 'semantic-ui-react'
import { withFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import v from 'voca';

import logo from '../assets/images/logo-256.png';
import roles from '../utils/roles';

const roleSelectOptions = _.values(roles).map(role => ({
  key: role,
  value: role,
  text: v.titleCase(role)
}));

const LoginForm = props => {
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
  } = props;

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
          <Header as='h2' color='teal' textAlign='center'>
          <Image src={logo} />
            {' '}Ingrese a su cuenta
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Select 
                fluid 
                options={roleSelectOptions}
                placeholder='Tipo de usuario'
                name="rol"
                value={values.rol}
                onChange={(e,{name, value}) => setFieldValue(name, value)}
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
                <Message color="red">Asegurese de que el correo y la contraseña son correctos.</Message>
              )}
  
              <Button color='teal' fluid size='large' disabled={isSubmitting || !isValid}>
                Ingresar&nbsp;
                <Loader active={isSubmitting} size="tiny" inline/>
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
} 


const validationSchema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
  password: yup.string().min(3, 'Contraseña debe ser más larga.').required('Password requerido')
});

const mapPropsToValues =  () => ({email: '', password: '', rol: roleSelectOptions[0].value});

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