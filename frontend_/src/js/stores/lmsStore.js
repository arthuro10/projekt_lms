import { observable, action } from 'mobx';


class LogsStore {
    
    @observable userName = '';
    // dieses Array speichert die Logs die vom Server kommen
    @observable logsFromServer = [];
    // Hier werden die "personalisierten" Logs gespeichert"
    @observable personalLogs = [];
    // Gesamtanzahl der Logs
    @observable maxAmountLogs = 0;
    // Gesamtanzahl der personalisierten Logs
    @observable maxAmountPersonalLogs = 0;
    
    // Die Seite der Tabelle. Muss zurückgesetzt werden, wenn man filtert usw. 
    @observable globalPagination = 1;

    // Filter String für Severity und Facility. 
    @observable filterSeverity = 'none';
    @observable filterFacility = 'none';

    // Nach diesen Strings wird gesucht. 
    @observable searchFromHost = '';
    @observable searchSysLogTag = '';
    @observable searchMessage = '';

    // Die Lognachricht die groß oben in der ersten Tabelle angezeigt wird. 
    @observable showLog = {};
    // Bool Variable, falls ein Log schon in Personal ist.
    @observable alreadySaved = false;
    // Für evenutelle Errors
    @observable error = '';
    // "globales" speichern des Zustands der Filtercheckboxes 
    @observable checkBoxMode = {
        fromHost: true,
        syslogTag: true,
        message: true
      };

    constructor() {
        this.baseURL = 'http://localhost:3000/';
        
    }

    // Setzen von Severity auch Priorität oder Kritikalität genannt
    @action setSeverity(value) {
        //console.log("set severity:" + value);
        this.filterSeverity = value;
        //console.log("severity is set to " + this.filterSeverity);
    }
    // Setzen von Facility
    @action setFacility(value) {
        //console.log("set facility:" + value);
        this.filterFacility = value;
        //console.log("facility is set to " + this.filterFacility);

    }
    // Setzen von "Show Log" die Log Datei die in der großen Tabelle angezeigt wird. 
    @action setLog(log) {
        //console.log("set log:" + log);
        this.showLog = log;
        //console.log("facility is set to " + this.showLog);

    }

    @action setUserName(value) {
        this.userName = value;
    }

    // Damit die Seitenanzahl zurückgesetzt wird
    @action resetPagination() {
        //console.log("reset Pagination:");
        this.globalPagination = 1;

    }
    // globales setzen der Seitenanzahl
    @action setPagination(activePage) {
        this.globalPagination = activePage;

    }

    // Die Suche von FromHost
    @action setSearchFromHost(searchString) {
        //console.log("set String with:" + searchString);
        this.searchFromHost = searchString;
        //console.log("searchStringFromHost is set to " + this.searchFromHost);

    }
    // Die Suche von SysLogTag 
    @action setSearchSysLogTag(searchString) {
        //console.log("set String with:" + searchString);
        this.searchSysLogTag = searchString;
        //console.log("searchStringSyslogTag is set to " + this.searchSysLogTag);

    }
    // Die Suche von Message
    @action setSearchMessage(searchString) {
        //console.log("set String with:" + searchString);
        this.searchMessage = searchString;
        //console.log("searchStringMessage is set to " + this.searchMessage);

    }
    // Das speichern eines Logs in die personalisierten Logs
    @action saveFavoLog(log) {
        console.log("Save Favo Log: " + JSON.stringify(log));

        // Um zu checken, ob diese Log-Nachricht schon in Personal vorhanden ist, 
        // Wenn nicht wird sie im Array gespeichert. Es wird auch noch addingLogs() aufgerufen, der 
        // die Logs in der Datenbank abspeichert. 
        var check = this.personalLogs.filter(fLog => (fLog.ID === log.ID ));
        console.log(check.length)

        if(check.length == 0){
            this.personalLogs.push(log);
            this.maxAmountPersonalLogs = this.personalLogs.length;
            console.log("personalLogs: " + JSON.stringify(this.personalLogs));
            console.log("Save in DB: " + JSON.stringify(this.personalLogs));
            this.addingLogs(log);

        }
        else{
            // Setzen von alreadySaved, damit Modal aufgerufen wird. 
            this.alreadySaved = true;
            console.log("personalLogs: already saved" );

        }
        
    }
    // Das entfernen von personal Logs
    @action deletePersonalLog(log) {
        console.log("Delete Personal Log: " + JSON.stringify(log));
        // checken ob auch diese Log-Nachricht in personal vorhanden ist. 
        // Eigentlich nicht nötig. Für eventuelle nicht erklärbare Fehler 
        var check = this.personalLogs.filter(fLog => (fLog.ID === log.ID ));
        console.log(check.length);
        console.log("personalLogs: " + JSON.stringify(this.personalLogs));

        if(check.length > 0){
            var newPersonalLog = this.personalLogs.filter(fLog => (fLog.ID !== log.ID ));
            this.personalLogs = newPersonalLog;
            this.maxAmountPersonalLogs = this.personalLogs.length;
            console.log("personalLogs: " + JSON.stringify(this.personalLogs));
            console.log("Delete from DB: " + JSON.stringify(log));
            // Um auch in der Datenbank diesen Log zu löschen
            this.deletingPersonalLogs(log.ID);
        }
        
    }

    // Zurücksetzen der Suchvariablen und von ShowLogs. Bessere Erscheinung bei Wechsel der Views
    @action resetVariables() {
        //console.log("reset searchStrings:" );
        this.filterSeverity = "none";
        this.filterFacility = "none";
        this.searchFromHost = "";
        this.searchMessage = "";
        this.searchSysLogTag = "";

        this.showLog = {};

    }

    @action setFalseAlreadySaved() {
        this.alreadySaved = false;
    }
    @action setTrueAlreadySaved() {
        this.alreadySaved = false;
    }

    
    // Setzen von den Checkboxen. Um entweder mit oder ohne zu filtern.
    @action selectCheckBoxMode(type) {
        switch (type) {
            case "fromHost":
                
                this.checkBoxMode.fromHost = !this.checkBoxMode.fromHost;
                break;
                
            
            case "syslogTag":
                
                this.checkBoxMode.syslogTag = !this.checkBoxMode.syslogTag;
                break;

            case "message":
                
                this.checkBoxMode.message = !this.checkBoxMode.message;
                break;
                
            case "priority":
                
                this.checkBoxMode.priority = !this.checkBoxMode.priority;
                break;

            case "facility":
                
                this.checkBoxMode.facility = !this.checkBoxMode.facility;
                break;
                
            default:
                console.log('Error switch');
                break;
        }
        
    }

   

    // Vom Backend die Logs fetchen
     @action fetchLogs() {
        return  fetch(this.baseURL+'api/logs/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("get request logs");
                        console.log(json);
                        console.log(json.data);
                        //console.log(json.data.length);
                        this.logsFromServer = json.data;
                        this.maxAmountLogs = json.data.length;
                        //this.showLog = json.data[0];
                        
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
    // Die personal Logs vom Backend fetchen
    @action fetchpersonalLogs() {
        return  fetch(this.baseURL+'api/personal_logs/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("get request personal logs");
                        console.log(json);
                        console.log(json.data);
                        //console.log(json.data.length);
                        this.personalLogs = json.data;
                        this.maxAmountPersonalLogs = json.data.length;
                        //this.showLog = json.data[0];
                        
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
    // Das hinzufügen der personaliserten Logs in die Datenbank
    @action addingLogs(newLog) {
        return fetch(this.baseURL+ 'api/personal_logs/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }, 
            body: JSON.stringify({
                ID : newLog.ID,
                FromHost : newLog.FromHost, 
                Priority : newLog.Priority,
                Facility : newLog.Facility,
                SysLogTag : newLog.SysLogTag,
                ReceivedAt : newLog.ReceivedAt,
                Message : newLog.Message
            })
          }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("json");
                        console.log(json);
                        this.fetchpersonalLogs() 
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }
    // Das entferen der personaliserten Logs von der Datenbank
    @action deletingPersonalLogs(logID) {
        return fetch(this.baseURL+'api/personal_logs/' + logID, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        console.log("personal log deleted");
                         //this.fetchpersonalLogs();
                    });

                } else {
                    this.error = "Error on fetching";
                }
            })
            .catch(
                error => {
                    this.error = "Error on fetching";
                    throw error;
                }
            );
    }


}

const store = new LogsStore();

    export default store;
