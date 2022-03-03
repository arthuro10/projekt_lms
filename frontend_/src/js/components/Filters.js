import React from "react";


import {Input, Dropdown, Header, Icon, Divider, Checkbox, Segment, Button } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll
import logsStore from "../stores/lmsStore"

const facility = [
  {
    key: 99,
    text: 'none',
    value: 'none'
  },
  {
    key: 1,
    text: 'kern',
    value: 'kern'
  },
  {
    key: 2,
    text: 'user',
    value: 'user'
  },
  {
    key: 3,
    text: 'mail',
    value: 'mail'
  },
  {
    key: 4,
    text: 'deamon',
    value: 'deamon'
  },
  {
    key: 5,
    text: 'auth',
    value: 'auth'
  },
  {
    key: 6,
    text: 'syslog',
    value: 'syslog'
  },
  {
    key: 7,
    text: 'lpr',
    value: 'lpr'
  },
  {
    key: 8,
    text: 'news',
    value: 'news'
  },
  {
    key: 9,
    text: 'uucp',
    value: 'uucp'
  },
  {
    key: 10,
    text: 'cron',
    value: 'cron'
  },
  {
    key: 11,
    text: 'authpriv',
    value: 'authpriv'
  },
  {
    key: 12,
    text: 'ftp',
    value: 'ftp'
  },
  {
    key: 13,
    text: 'ntp',
    value: 'ntp'
  },
  {
    key: 14,
    text: 'security',
    value: 'security'
  },
  {
    key: 15,
    text: 'console',
    value: 'console'
  },
  {
    key: 16,
    text: 'solaris-cron',
    value: 'solaris-cron'
  },
  {
    key: 17,
    text: 'local0',
    value: 'local0'
  },
  {
    key: 18,
    text: 'local1',
    value: 'local1'
  },
  {
    key: 19,
    text: 'local2',
    value: 'local2'
  },
  {
    key: 20,
    text: 'local3',
    value: 'local3'
  },
  {
    key: 21,
    text: 'local4',
    value: 'local4'
  },
  {
    key: 22,
    text: 'local5',
    value: 'local5'
  },
  {
    key: 23,
    text: 'local6',
    value: 'local6'
  },
  {
    key: 24,
    text: 'local7',
    value: 'local7'
  },
];

const severityLevel = [
  {
    key: 99,
    text: 'none',
    value: 'none'
  },
  {
    key: 1,
    text: 'Emergency',
    value: 'Emergency'
  },
  {
    key: 2,
    text: 'Alert',
    value: 'Alert'
  },
  {
    key: 3,
    text: 'Critical',
    value: 'Critical'
  },
  {
    key: 4,
    text: 'Error',
    value: 'Error'
  },
  {
    key: 5,
    text: 'Warning',
    value: 'Warning'
  }
];



// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 
@observer
export default class Filter extends React.Component {
	  constructor(props) {
       super(props); 

       this.checkBoxNames = [
           "fromHost",
           "syslogTag",
           "message",
           "priority",
           "facility"
       ]
       
       this.state = {
         searchFromHost: '',
         searchSysLogTag: '',
         searchMessage: '',
       };

    }

    changeCheckBox(a){
        // Übergebe den Checkbox String
        logsStore.selectCheckBoxMode(a);

    }
    setFacility(e, {value}){
        // Übergebe den Checkbox String
        logsStore.setFacility(value);
        logsStore.resetPagination();

    }
    setSeverity(e, {value}){
        // Übergebe den Checkbox String
        logsStore.setSeverity(value);
        logsStore.resetPagination();

    }

    
    searchStringChanged(a, b,c) {
      //console.log("SearchStringChanged wird aufgerufen. Folgende Suche hat diese methode aufgerufen: " + a + " und der Wert ist: " + c.value);
      if(a ==="FromHost"){
        logsStore.setSearchFromHost(c.value.toLowerCase());
        logsStore.resetPagination();
      }else if(a ==="SysLogTag"){
        logsStore.setSearchSysLogTag(c.value.toLowerCase());
        logsStore.resetPagination();
      }else if(a ==="Message"){
        logsStore.setSearchMessage(c.value.toLowerCase());
        logsStore.resetPagination();
      }  
 }


    render() {
        const {checkBoxMode} = logsStore;

        return (
          <div>
            <Header as='h2' icon>
              <Icon name='filter' size="mini" />
              Filtereinstellungen
              <Header.Subheader>
              Klicken sie auf die Kästchen um nach bestimmten Logs zu suchen
              </Header.Subheader>
            </Header>
            <Divider></Divider>


            <Segment compact>
              <Header size={'tiny'}>Severity: Einstellung der Sicherheitsstufe</Header>
              <Dropdown onChange={this.setSeverity.bind(this)}
                placeholder='Select Severity'
                fluid
                selection
                defaultValue="none"
                options={severityLevel}
              />

            </Segment>
            
            <Segment compact>
              <Header size={'tiny'}>Facility: Einstellung der Logumgebung</Header>
              <Dropdown onChange={this.setFacility.bind(this)}
                placeholder='Select Facility'
                fluid
                selection
                defaultValue="none"
                options={facility}
              />
            </Segment>
    

              <Segment compact>
                <Checkbox toggle label="FromHost" defaultChecked={checkBoxMode.fromHost} onClick={this.changeCheckBox.bind(this,"fromHost")} />
                <br></br>
                <br></br>
                <Input placeholder='Search...' onChange={this.searchStringChanged.bind(this,"FromHost")} />
              </Segment>
              
              <Segment compact>
                <Checkbox toggle label="Message" defaultChecked={checkBoxMode.message} onClick={this.changeCheckBox.bind(this,"message")} />
                <br></br>
                <br></br>
                <Input placeholder='Search...' onChange={this.searchStringChanged.bind(this,"Message")} />
              </Segment>

              <Segment compact>
                <Checkbox toggle label="SyslogTag" defaultChecked={checkBoxMode.syslogTag} onClick={this.changeCheckBox.bind(this,"syslogTag")} />
                <br></br>
                <br></br>
                <Input placeholder='Search...' onChange={this.searchStringChanged.bind(this,"SysLogTag")} />
              </Segment>
              
          </div>
        );
      }
    }