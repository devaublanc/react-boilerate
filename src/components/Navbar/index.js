import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import styles, { MenuDiv } from './styles.js'


const Navbar = ({ routes }) => (
  <MenuDiv>
    { Object.keys(routes).map((route, key) =>  (
      <NavLink
        to={ routes[route].path }
        style={ styles.link }
        key={ key }>
        { routes[route].label }
      </NavLink>
    ))}
  </MenuDiv>
)



Navbar.propTypes = {
  routes: PropTypes.objectOf(PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string
  })).isRequired
}

export default Navbar;
