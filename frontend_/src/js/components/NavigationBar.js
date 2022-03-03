import React, { Component } from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";

// der Store auf den gehört werden soll, muss eingebunden werden 
import logsStore from "../stores/lmsStore"

export default class MenuExampleBasic extends Component {

  constructor() {
    super();
    this.state = { activeItem : "Interaction" }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    logsStore.resetVariables();
    logsStore.resetPagination();

  }
  


  render() {
    const { activeItem } = this.state

    const logoutItem = <Menu.Item
                        as={Link} to='/logout' 
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleItemClick}
                        position='right'
                        icon='sign out'>
                        
                      </Menu.Item>
    const logsItem = <Menu.Item
                        as={Link} to='/logs' 
                        name='logs'
                        active={activeItem === 'logs'}
                        onClick={this.handleItemClick}
                        icon='file alternate'>
                        
                      </Menu.Item>
    const personalItem = <Menu.Item
                        as={Link} to='/personal' 
                        name='personal'
                        active={activeItem === 'personal'}
                        onClick={this.handleItemClick}
                        icon='heart'>
                        
                      </Menu.Item>
    const header =  <Menu.Item>
                      <Header>Log Management System</Header>
                    </Menu.Item>

    return (
      <Menu pointing secondary className={"myNavBar"}>

        { localStorage.loginId === undefined ? header : logsItem }
        { localStorage.loginId === undefined ? "" : personalItem }
        { localStorage.loginId === undefined ? "" : logoutItem }

      </Menu>
    )
  }
}

