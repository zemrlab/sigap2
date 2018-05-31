import React from 'react';
import { Container, Grid, Image, Menu, Segment, Card } from 'semantic-ui-react';
import _ from 'lodash';
import m from 'moment';

import logo from '../assets/images/logo-256.png';
import { AuthConsumer } from '../contexts/AuthContext';
import modules from '../utils/modules';

const Layout = ({logout, currentUser}) => {
  const colNumber = 3;
  const moduleChunks = _.chunk(_.values(modules), colNumber);

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image
              size='mini'
              src={logo}
              style={{ marginRight: '1.5em' }}
            />
            SIGA
          </Menu.Item>
          <Menu.Item as='a'>Inicio</Menu.Item>
          <Menu.Item position="right">
            <span style={{fontWeight: 'bold'}}>Usuario:&nbsp;</span>{currentUser.name}
          </Menu.Item>
          <Menu.Item>
            <span style={{fontWeight: 'bold'}}>Fecha:&nbsp;</span>{m().format('DD-MM-YYYY')}
          </Menu.Item>
          <Menu.Item as='a' onClick={logout}>Cerrar Sesión</Menu.Item>
        </Container>
      </Menu>

      <Container text style={{ marginTop: '7em' }}>
        <Grid>
          {moduleChunks.map((moduleChunk, i) => (
            <Grid.Row columns={colNumber} key={i}>
              {moduleChunk.map((module, j) => {
                const allowed = module.allowedRoles.includes(currentUser.role);
                return (
                  <Grid.Column key={j}>
                      <Card
                        href={allowed ? module.url : ''}
                        header={module.name}
                        meta={allowed ? 'Disponible' : 'No Disponible'}
                        style={allowed ? {} : {cursor: 'not-allowed'}}
                      />
                  </Grid.Column>
                )
              })}
            </Grid.Row>
          ))}
        </Grid>
      </Container>

      <Segment
        inverted
        vertical
        style={{ margin: '3em 0em 0em', padding: '3em 0em' }}
      >
        <Container textAlign='center'>
          <Image
            centered
            size='mini'
            src={logo}
          />
        </Container>
      </Segment>
    </div>
  );
};

export default props => (
  <AuthConsumer>
    {({logout, currentUser}) => <Layout {...props} logout={logout} currentUser={currentUser}/>}
  </AuthConsumer>
);