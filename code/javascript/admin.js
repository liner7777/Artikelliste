// Beispiel für neue Nutzer

// Liste der angeforderten und registrierten Nutzer
var requested = Nutzer_Gruppe.getAllRequested();
var all_registered = Nutzer_Gruppe.getAllRegistered();


// Funktion zum Erstellen der Anfragetabelle
function createRequestTable(requests) {
    var table = document.getElementById('anfrageTable');

    for (var i = 0; i < requests.length; i++) {
        var row = table.insertRow(-1);
        var nameCell = row.insertCell(0);
        var actionCell = row.insertCell(1);
        var loeschCell = row.insertCell(2);

        nameCell.innerHTML = requests[i].benutzername;

        var button = document.createElement('button');
        button.innerHTML = "Annehmen";
        button.onclick = (function (i) {
            return function () {
                acceptRequest(requests[i].benutzername);
            };
        })(i);
        actionCell.appendChild(button);

        var button2 = document.createElement('button');
        button2.innerHTML = "L&ouml;schen";
        button2.onclick = (function (i) {
            return function () {
                deleteRequest(requests[i].benutzername);
            };
        })(i);
        loeschCell.appendChild(button2);
    }
}

// Funktion zum Leeren der Nutzertabelle
function clearNutzerTable() {
    var table = document.getElementById('nutzerTable');
    var rows = table.rows.length;
    for (var i = rows - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// Funktion zum Leeren der Anfragetabelle
function clearRequestTable() {
    var table = document.getElementById('anfrageTable');
    var rows = table.rows.length;
    for (var i = rows - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// Funktion zum Auffüllen der Nutzertabelle
function populateNutzerTable(list) {
    var table = document.getElementById('nutzerTable');

    for (var i = 0; i < list.length; i++) {
        var row = table.insertRow(-1);
        var idCell = row.insertCell(0);
        var vornameCell = row.insertCell(1);
        var nachnameCell = row.insertCell(2);
        var rechteCell = row.insertCell(3);

        let user = Nutzer_Gruppe.getNutzerByBenutzername(list[i].benutzername);
        let manager = new NutzerManager(user);

        idCell.innerHTML = list[i].mitarbeiternr;
        vornameCell.innerHTML = list[i].vorname;
        nachnameCell.innerHTML = list[i].nachname;

        var select = document.createElement('select');
        var options = Rollen_Gruppe.getRollen();
        for (var j = 0; j < options.length; j++) {
            var option = document.createElement('option');
            option.value = options[j].name;
            option.text = options[j].name;
            if (options[j].name === manager.getRollenName()) {
                option.selected = true;
            }
            select.appendChild(option);
        }
        select.onchange = (function (i) {
            return function () {
                let user = Nutzer_Gruppe.getNutzerByBenutzername(list[i].benutzername);
                let manager = new NutzerManager(user);
                let newrolle = Rollen_Gruppe.getRolleByName(this.value);
                manager.setRolle(newrolle);
            };
        })(i);
        rechteCell.appendChild(select);
    }
}

// Funktion zur Suche von Nutzern
function search() {
    var query = document.getElementById("searchBar").value.toLowerCase();
    var results = [];

    if (query.length > 0) {
        results = all_registered.filter(function (item) {
            return item.mitarbeiternr.toString().indexOf(query) !== -1 ||
                item.vorname.toLowerCase().indexOf(query) !== -1 ||
                item.nachname.toLowerCase().indexOf(query) !== -1;
        });
    } else {
        results = all_registered;
    }

    clearNutzerTable();
    populateNutzerTable(results);
}

// Funktion zur Annahme von Nutzeranfragen
function acceptRequest(benutzername) {
    let user1 = Nutzer_Gruppe.getNutzerByBenutzername(benutzername);
    let man = new NutzerManager(user1);
    man.setRegistered(true);
    man.setRequested(false);

    clearNutzerTable();
    populateNutzerTable(all_registered);
    let newrequests = Nutzer_Gruppe.getAllRequested();
    clearRequestTable();
    createRequestTable(newrequests);
}

// Funktion zum Löschen von Nutzeranfragen
function deleteRequest(benutzername) {
    let user1 = Nutzer_Gruppe.getNutzerByBenutzername(benutzername);
    let man = new NutzerManager(user1);
    man.setRegistered(false);
    man.setRequested(false);

    clearNutzerTable();
    populateNutzerTable(all_registered);
    let newrequests = Nutzer_Gruppe.getAllRequested();
    clearRequestTable();
    createRequestTable(newrequests);
}

// Event-Listener für DOMContentLoaded, um Tabellen zu erstellen
document.addEventListener('DOMContentLoaded', function () {
    createRequestTable(requested);
    populateNutzerTable(all_registered);
});
