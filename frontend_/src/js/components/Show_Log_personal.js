import React from "react";

// Cards und Images und Icons importieren 
import { Header, Table, Button, Modal, Icon } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden 
import logsStore from "../stores/lmsStore"


const facility = [
  'kern',
  'user',
  'mail',
  'deamon',
  'auth',
  'syslog',
  'lpr',
  'news',
  'uucp',
  'cron',
  'authpriv',
  'ftp',
  'ntp',
  'security',
  'console',
  'solaris-cron',
  'local0',
  'local1',
  'local2',
  'local3',
  'local4',
  'local5',
  'local6',
  'local7',
];

const severityLevel = [
  'Emergency',
  'Alert',
  'Critical',
  'Error',
  'Warning',
  'Notice',
  'Informational',
  'Debug',
];

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 
@observer
export default class Show_Personal_Logs extends React.Component {
	  constructor(props) {
       super(props); 
   
       this.state = {
         modalState : false

       };

       
      
    }

    CloseModalState() {
      //console.log("is it closed now?:");
      this.setState({modalState : false})

    }


    DeleteLogMessage() {
      logsStore.deletePersonalLog(logsStore.showLog);
      logsStore.resetVariables();
      this.setState({modalState : false})

    }

    OpenModalState() {
      //console.log("is it open now?:");
      this.setState({modalState : true})

    }

    render() {

      const {showLog} = logsStore;
      const {modalState} = this.state.modalState;


      
        return (
          <div>
            <Table celled padded color='teal'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>FromHost</Table.HeaderCell>
                  <Table.HeaderCell>Priority</Table.HeaderCell>
                  <Table.HeaderCell>Facility</Table.HeaderCell>
                  <Table.HeaderCell>SysLogTag</Table.HeaderCell>
                  <Table.HeaderCell>ReceivedAt</Table.HeaderCell>
                  <Table.HeaderCell>Message</Table.HeaderCell>
                  <Table.HeaderCell singleLine>Delete Log?</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                      <Table.Cell>
                        <Header as='h5' textAlign='center'>
                          {showLog.FromHost}
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as='h5' textAlign='center'>
                          {severityLevel[showLog.Priority] }
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                        <Header as='h5' textAlign='center'>
                          {facility[showLog.Facility] }
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                        <Header as='h5' textAlign='center'>
                          {showLog.SysLogTag}
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                        <Header as='h5' textAlign='center'>
                          { showLog.ReceivedAt === undefined  ? "" : new Date(showLog.ReceivedAt).toUTCString() }
                        </Header>
                        </Table.Cell>
                        <Table.Cell>
                        <Header as='h4' textAlign='center' color='teal'>
                          {showLog.Message}
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as='h5' textAlign='center'>
                          {showLog.ReceivedAt === undefined  ? "" : 
                          <Modal
                          trigger={<Button basic color='red' onClick={this.OpenModalState.bind(this)}>Delete Log</Button>}
                          open={this.state.modalState}
                          onClose={this.close}            
                          size='small'
                          basic

                          >
                          <Header icon>
                            <Icon name='archive' />
                            Wollen Sie diese Lognachricht löschen?
                          </Header>
                          <Modal.Content>
                            <p>
                              Die Lognachricht wird von den personalisierten Lognachrichten entfernt.  

                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button basic color='red' inverted onClick={this.CloseModalState.bind(this)}>
                              <Icon name='remove' /> Nein, Danke!
                            </Button>
                            <Button color='green' inverted onClick={this.DeleteLogMessage.bind(this)}>
                              <Icon name='checkmark' /> Ja, Bitte!
                            </Button>
                          </Modal.Actions>
                        </Modal>
                          
                          }
                        
                        </Header>
                        </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
                
          </div>
        );
      }

      
    }