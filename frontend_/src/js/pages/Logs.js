import React from "react";
import {Icon, Grid,Segment, Responsive, Button, Header, Popup} from 'semantic-ui-react'

import LMS from '../components/Table_logs'
import Filter from '../components/Filters'
import ShowLogs from '../components/Show_Log'

import { observer } from "mobx-react";

import logsStore from "../stores/lmsStore"

@observer
export default class Logs extends React.Component {
  constructor(props) {
    super(props); 

    
   this.intervall;
    
    this.state = {
      
    };

 }

  

  handleClick(e,toggle) {
    this.setState({ active: !toggle.active })
  }

  updateLogs(){
    
    this.interval = setInterval(function() {

      logsStore.fetchLogs();
    }, 15000);
    console.log("Start updating Logs: " + this.interval);

  }

  stopUpdatingLogs(){
    console.log("Stopp updating Logs: " + this.interval);
    clearInterval(this.interval);
  
  }

  

  render() {
    const { active } = this.state
    const {maxAmountLogs} = logsStore;

    const LogPage = <div>
    <Responsive as={Grid} minWidth={900}>
    <Grid celled>
    <Grid.Row>
      <Grid.Column width={10} >
      
        <Header as='h1'>
        <Icon name='archive' size='big' />
          Log Mangement Zentralisierungssystem
        </Header>
      </Grid.Column>
      <Grid.Column width={3} >
      <Button toggle active={active} onClick={this.handleClick.bind(this)}>
            Updating 
        </Button>
        <Popup content='Alle 15 Sekunden werden neue Logs gefetcht' trigger={<Button icon='lightbulb outline' />} />
        {active === true ? this.updateLogs() : this.stopUpdatingLogs(this)}
        {console.log("Is active active?" + active)}
      </Grid.Column>
      <Grid.Column width={3} >
      <h1>Loganzahl: {maxAmountLogs}</h1>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column width={12} >
        <ShowLogs />
      </Grid.Column>
      </Grid.Row>
      <Grid.Row >
      <Grid.Column width={4} >
        <Filter />
      </Grid.Column>
      <Grid.Column width={12} >
        <LMS />
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

    const noLoginPage = <div>
      <Header>Login erforderlich um die Logs einzusehen!</Header>
    </div>



    return (
      <div>
      { localStorage.loginId === undefined ? noLoginPage : LogPage}
      </div>
      
    );
  }
}