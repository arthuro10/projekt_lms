import React from "react";
import {Icon, Grid,Segment, Responsive, Button, Header, Popup} from 'semantic-ui-react'

import LMS_Personal from '../components/Table_logs_personal'
import Filter from '../components/Filters'
import ShowLogsPersonal from '../components/Show_Log_personal'

import { observer } from "mobx-react";

import logsStore from "../stores/lmsStore"

@observer
export default class Logs extends React.Component {
  constructor(props) {
    super(props); 
    
    this.state = {

    };

 }

  

  handleClick(a,b) {
    this.setState({ active: !b.active })
  }

  

  render() {
    const { active } = this.state
    const {maxAmountPersonalLogs} = logsStore;


    const noLoginPage = <div>
      <Header>Login erforderlich um die Logs einzusehen!</Header>
    </div>

const LogPage = <div>
                  <Responsive as={Grid} minWidth={900}>
                        <Grid celled>
                        <Grid.Row>
                         
                          <Grid.Column width={10} >
                          <Header as='h1'>
                            <Icon name='users' size='big' />
                              Personaliserte Log Nachrichten
                          </Header>
                          </Grid.Column>
                          <Grid.Column width={3} >
                          <Button toggle active={active} onClick={this.handleClick.bind(this)}>
                                Updating 
                          </Button>
                          <Popup content='Alle 15 Sekunden werden neue Logs gefetcht' trigger={<Button icon='lightbulb outline' />} />
                          </Grid.Column>
                          <Grid.Column width={3} >
                          <h1>Loganzahl: {maxAmountPersonalLogs}</h1>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                          <Grid.Column width={12} >
                            <ShowLogsPersonal />
                          </Grid.Column>
                          </Grid.Row>
                          <Grid.Row >
                          <Grid.Column width={4} >
                            <Filter />
                          </Grid.Column>
                          <Grid.Column width={12} >
                            <LMS_Personal />
                          </Grid.Column>
                          </Grid.Row>
                        </Grid>
                        </Responsive>
                        <Segment.Group>
                        <Responsive as={Segment} maxWidth={900}>
                          Bitte breites Fenster verwenden.
                        </Responsive>
                        </Segment.Group>
                </div>

    


    return (
      <div>
        { localStorage.loginId === undefined ? noLoginPage : LogPage}
	    </div>
    );
  }
}
