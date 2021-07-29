import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/customer">
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/agent">
      <Translate contentKey="global.menu.entities.agent" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/incident">
      <Translate contentKey="global.menu.entities.incident" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/notification">
      <Translate contentKey="global.menu.entities.notification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conversation">
      <Translate contentKey="global.menu.entities.conversation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/comment">
      <Translate contentKey="global.menu.entities.comment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/observation">
      <Translate contentKey="global.menu.entities.observation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/attachment">
      <Translate contentKey="global.menu.entities.attachment" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
