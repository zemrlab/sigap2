import React from 'react';
import { 
  Container, 
  Divider, 
  Dropdown, 
  Grid, 
  Header, 
  Image, 
  List, 
  Menu, 
  Segment 
} from 'semantic-ui-react';

import logo from '../assets/images/logo-256.png';
import { AuthConsumer } from '../contexts/AuthContext';

const Layout = () => (
  <AuthConsumer>
    {({logout}) => (<div>
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
          <Menu.Item as='a' position="right" onClick={logout}>Cerrar sesión</Menu.Item>
        </Container>
      </Menu>

      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1'>Semantic UI React Fixed Template</Header>
        <p>This is a basic fixed menu template using fixed size containers.</p>
        <p>A text container is used for the main container, which is useful for single column layouts.</p>
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
    </div>)}
  </AuthConsumer>
)

export default Layout;