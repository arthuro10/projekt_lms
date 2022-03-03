import React from 'react';

// Cards und Images und Icons importieren 
import { Select, Icon, Button, Table, Statistic,  Pagination, Popup } from 'semantic-ui-react'

// observer einbinden
import { observer } from "mobx-react";

// der Store auf den gehört werden soll, muss eingebunden werden 
import logsStore from "../stores/lmsStore"

// mit der Annotation @observer ist die Komponente fähig als Observer zu fungieren. 

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

@observer
export default class LMS extends React.Component {
	  constructor(props) {
       super(props); 


       this.pagePerRowOptions = [
        { key: 1, value: 5, text: '5 Reihen' },
        { key: 2, value: 10, text: '10 Reihen' },
        { key: 3, value: 15, text: '15 Reihen' },
      ]

      this.length = 0;
       
       this.state = {
         pagePerRow : 5,
         pagination : 5,
         activePage : 1,
         searchString : ''
       };
       this.reloadClicked();
      
    }

    componentDidMount() {
      logsStore.fetchpersonalLogs();
      
  }

    

    

    reloadClicked() {
      logsStore.fetchLogs();
   }
    paginationClicked(a) {
      this.setState({pagination : a});
   }

   handlePaginationChange = (e, { activePage }) => {

    logsStore.setPagination(activePage); 
   }

   searchStringChanged(a,b) {
    this.setState({ searchString: b.value.toLowerCase() })
    this.setState({ count: c.length })    
}

  handleChange = (e, { value }) => this.setState({ value })


  handleSelectedItem(e, {value}) {
    this.setState({ pagePerRow : value });
    
}

showSpecialLog(log){
  logsStore.setLog(log);
}

filterLogs (logs,checkBoxMode,filterFacility,filterSeverity,searchString, searchFromHost,searchSysLogTag,searchMessage) {
  console.log("filerlogs: " + logs)
  let newLogs = [];

  if(checkBoxMode.fromHost){
    //console.log("Aufruf FromHost");
    newLogs = logs.filter(log => (
      (log.FromHost.toLowerCase().search(searchFromHost) !== -1)
    ));
  }
  

  if(checkBoxMode.message){
    //console.log("Aufruf Message");
    // Wenn FromHost Regler an, wird das schon gefilterte Array genommen.
    if(checkBoxMode.fromHost){
      newLogs = newLogs.filter(log => (
        (log.Message.toLowerCase().search(searchMessage) !== -1)
      ));

    // Wenn FromHost Regler aus ist, dann soll der "volle" Logarray verwendet werden
    }else{
      newLogs = logs.filter(log => (
        (log.Message.toLowerCase().search(searchMessage) !== -1)
      ));

    }
    
  }

  if(checkBoxMode.syslogTag){
    //console.log("Aufruf SyslogTag");

    // Wenn FromHost/Message Regler an, wird das schon gefilterte Array genommen.
    if (checkBoxMode.fromHost || checkBoxMode.message ) {
      newLogs = newLogs.filter(log => (
        (log.SysLogTag.toLowerCase().search(searchSysLogTag) !== -1)
      ));

    // Wenn FromHost/message Regler aus ist, dann soll der noch ungefilterte Logarray verwendet werden
    } else {
      newLogs = logs.filter(log => (
        (log.SysLogTag.toLowerCase().search(searchSysLogTag) !== -1)
      ));   
    }

  }

  if(filterFacility !== 'none'){
    //console.log("Aufruf FilterFacility");

    if (checkBoxMode.fromHost || checkBoxMode.message || checkBoxMode.syslogTag) {
      newLogs = newLogs.filter(log => (
        (facility[log.Facility] === filterFacility)
      ));
      
    } else {
      newLogs = logs.filter(log => (
        (facility[log.Facility] === filterFacility)
      ));
      
    }
    
}

  if(filterSeverity !== 'none'){
    //console.log("Aufruf FilterSeverity");

    if (checkBoxMode.fromHost || checkBoxMode.message || checkBoxMode.syslogTag) {
      newLogs = newLogs.filter(log => (
        (severityLevel[log.Priority] === filterSeverity)
      ));
      
    } else {
      newLogs = logs.filter(log => (
        (severityLevel[log.Priority] === filterSeverity)
      ));
      
    }
    
    
  }


  this.length = newLogs.length;

  return newLogs;
  
}



    render() {

        // Variablen definieren
      const {personalLogs} = logsStore;

      const {searchFromHost} = logsStore;
      const {searchSysLogTag} = logsStore;
      const {searchMessage} = logsStore;

      
      const {filterFacility} = logsStore;
      const {filterSeverity} = logsStore;
      const {checkBoxMode} = logsStore;
      //console.log("Table_log filterSeverity: " + filterSeverity);
      //console.log("Table_log filterFacility: " + filterFacility);
      const {searchString} = logsStore;

      const persLogs = [...personalLogs];
      const maxAmountPersonalLogs = personalLogs.length;
      

      console.log("Die Logs in personal Table"+persLogs);
      console.log("Die Logs in personal Table"+personalLogs);

      const {globalPagination} = logsStore;


      


      
      const filteredLogs = this.filterLogs(personalLogs,checkBoxMode,filterFacility,filterSeverity,searchString,searchFromHost,searchSysLogTag,searchMessage).slice((globalPagination-1)*this.state.pagePerRow,(globalPagination * this.state.pagePerRow)).map((log,i) =>  
      <Table.Row key={log.ID} onClick={this.showSpecialLog.bind(this,log)}  >
        <Table.Cell> { log.FromHost }</Table.Cell>
        <Table.Cell> { severityLevel[log.Priority] }</Table.Cell>
        <Table.Cell> { facility[log.Facility] }</Table.Cell>
        <Table.Cell> { log.SysLogTag }</Table.Cell>
        <Table.Cell> {  new Date(log.ReceivedAt).toUTCString() }</Table.Cell>
        <Table.Cell> { log.Message }</Table.Cell>
      </Table.Row>);
    


      
                      
        const pages = Math.ceil((this.length / this.state.pagePerRow));
        const disableSearch = (checkBoxMode.fromHost === false && checkBoxMode.syslogTag === false && checkBoxMode.message === false)  ? false : true

                          

   	    return (
	      <div>
              <Select placeholder='Select pages per row' options={this.pagePerRowOptions} onChange={this.handleSelectedItem.bind(this)} />
              <Icon /><Icon /><Icon /><Icon />
              <Icon /><Icon /><Icon />
              <Icon /><Icon />
              <Statistic>
                <Statistic.Value>{this.length}</Statistic.Value>
                <Statistic.Label>Nach der Filterung</Statistic.Label>
              </Statistic>  

	          <Table celled fixed selectable singleLine color="teal"  >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>FromHost</Table.HeaderCell>
                <Table.HeaderCell>Priority</Table.HeaderCell>
                <Table.HeaderCell>Facility</Table.HeaderCell>
                <Table.HeaderCell>SysLogTag</Table.HeaderCell>
                <Table.HeaderCell>ReceivedAt</Table.HeaderCell>
                <Table.HeaderCell>Message</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body >
              { filteredLogs }
            </Table.Body>

          </Table>

          <Pagination onPageChange={this.handlePaginationChange.bind(this)}
            activePage={globalPagination}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={pages}
          />
       
	      </div>
        );
    }
}

