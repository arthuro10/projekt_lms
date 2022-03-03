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
export default class Show_Logs extends React.Component {
	  constructor(props) {
       super(props); 
   
       this.state = {
         modalState : false,
         ModalAlreadySavedState : false

       };
      
    }

    CloseModalState() {
      //console.log("is it closed now?:");
      this.setState({modalState : false})

    }
    CloseModalAlreadySaved() {
      //console.log("is it closed now?:");
      this.setState({ModalAlreadySavedState : false})

    }
    OpenModalAlreadySaved() {
      //console.log("is it open now?:");
      this.setState({ModalAlreadySavedState : true})
      
    }
    SaveLogMessage() {
      logsStore.saveFavoLog(logsStore.showLog);
      this.setState({modalState : false})
      if(logsStore.alreadySaved === true ){
        this.setState({ModalAlreadySavedState : true});
        logsStore.setFalseAlreadySaved();

      }

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
                  <Table.HeaderCell singleLine>Save Log?</Table.HeaderCell>
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
                          trigger={<Button basic color='violet' onClick={this.OpenModalState.bind(this)}>Save Log</Button>}
                          open={this.state.modalState}
                          onClose={this.close}            
                          size='small'
                          basic

                          >
                          <Header icon>
                            <Icon name='archive' />
                            Wollen Sie diese Lognachricht zu den Favorisierten Logs hinzufügen?
                          </Header>
                          <Modal.Content>
                            <p>
                              Bei der Kategorie "logs" werden von allen Maschinen die Logs angezeigt. 
                              Um die Lognachrichten einzugrenzen, können Lognachrichten in die Kategorie
                              "Favo" gespeichert werden. Insbesondere dann praktisch, wenn man gewisse 
                              Abhängigkeiten analysieren möchte. Z.B. Frontend, Backend und Datenbank. 

                            </p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button basic color='red' inverted onClick={this.CloseModalState.bind(this)}>
                              <Icon name='remove' /> Nein, Danke!
                            </Button>
                            <Button color='green' inverted onClick={this.SaveLogMessage.bind(this)}>
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

            <Modal
            open={this.state.ModalAlreadySavedState}
            onClose={this.close}            
            size='small'
            basic
            >
            <Header icon>
              <Icon name='save' />
              Schon gespeichert!
            </Header>
            <Modal.Content>
              <p>
                Diese Lognachricht ist schon in Personal drin.  
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted onClick={this.CloseModalAlreadySaved.bind(this)}>
                <Icon name='checkmark' /> OK !
              </Button>
            </Modal.Actions>
            </Modal>
                
          </div>
        );
      }

      
    }