// Funktion zum Tauschen von Elementen in einer Liste
function tauschen(list, posA, posB) {
    var x = list[posA];   // Speichert das Element an Position posA in einer temporären Variablen x
    list[posA] = list[posB];  // Setzt das Element an Position posB an die Stelle von posA
    list[posB] = x;  // Setzt das in x gespeicherte Element an die Stelle von posB
    return list;  // Gibt die modifizierte Liste zurück
}

// Funktion zur Implementierung des Selection-Sort-Algorithmus, der die Liste nach Preis sortiert
function selectionSort2(arr) {
    for (let i = 0; i < arr.length; i++) {  // Durchläuft die gesamte Liste
        let lowest = i;  // Setzt den aktuellen Index als den Index des niedrigsten Preises
        for (let j = i + 1; j < arr.length; j++) {  // Durchläuft die Liste ab dem nächsten Element
            if (arr[j].preis < arr[lowest].preis) {  // Vergleicht die Preise
                lowest = j;  // Setzt den Index des niedrigeren Preises
            }
        }
        if (lowest !== i) {  // Tauscht die Elemente, wenn der niedrigste Preis nicht der aktuelle ist
            [arr[i], arr[lowest]] = [arr[lowest], arr[i]];  // Swap-Operation
        }
    }
    return arr;  // Gibt die sortierte Liste zurück
}

// Ruft die Liste der Artikel ab
var list1 = Artikel_Gruppe.getArtikel();

// Sortiert die abgerufene Artikelliste nach Preisen
var sortierteListe = selectionSort2(list1);

// Funktion zur Erstellung einer Tabelle, die die Artikel anzeigt
function createTable(list) {
    var table = document.getElementById('artikeltabelle');  // Holt die Tabelle mit der ID 'artikeltabelle'

    while (table.rows.length > 1) {  // Löscht alle Zeilen außer der Kopfzeile
        table.deleteRow(1);
    }

    for (var i = 0; i < list.length; i++) {  // Fügt für jedes Element in der Liste eine Zeile hinzu
        var row = table.insertRow(-1);  // Fügt eine neue Zeile am Ende der Tabelle hinzu
        var artikelzelle = row.insertCell(0);  // Fügt die Zellen für die Artikeldaten hinzu
        var artikelnamenzelle = row.insertCell(1);
        var artikelpreiszelle = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        artikelzelle.innerHTML = list[i].artikelnr;  // Fügt die Artikeldaten in die Zellen ein
        artikelnamenzelle.innerHTML = list[i].name;
        artikelpreiszelle.innerHTML = list[i].preis;

        var button_bearbeiten = document.createElement('button');  // Erstellt einen Bearbeiten-Button
        button_bearbeiten.innerHTML = "Bearbeiten";

        var button = document.createElement('button');  // Erstellt einen Löschen-Button
        button.innerHTML = "Löschen";
        button.onclick = (function (i) {
            return function () {
                Artikel_Gruppe.deleteArtikel(list[i].artikelnr);  // Löscht den Artikel
                sortierteListe = selectionSort2(list1);  // Sortiert die Liste erneut
                search();  // Aktualisiert die Tabelle
            };
        })(i);

        button_bearbeiten.onclick = (function (i) {
            return function () {
                // Befüllt die Eingabefelder mit den Artikeldaten zur Bearbeitung
                document.getElementById("artikelNr2").value = list[i].artikelnr;
                document.getElementById("name2").value = list[i].name;
                document.getElementById("beschreibung2").value = list[i].beschreibung;
                document.getElementById("preis2").value = list[i].preis;
                document.getElementById("anzahl2").value = list[i].anzahl_lager;
                z_B();  // Funktion, um in den Bearbeitungsmodus zu wechseln
            };
        })(i);

        cell4.appendChild(button);  // Fügt die Buttons in die Zellen ein
        cell5.appendChild(button_bearbeiten);

        if (can_edit_artikel()) {  // Überprüft, ob der Artikel bearbeitet werden darf
            // Zusätzliche Logik hier, falls benötigt
        } else {
            cell4.style.display = "none";  // Versteckt die Bearbeiten- und Löschen-Buttons
            cell5.style.display = "none";
            document.getElementById("aktionheader").style.display = "none";
            document.getElementById("air").style.display = "none";
        }
    }
}

// Funktion zur Suche und Filterung der Artikelliste basierend auf einer Suchanfrage
function search() {
    var query = document.getElementById("searchBar").value.toLowerCase();  // Holt die Suchanfrage
    var results = [];

    if (query.length > 0) {  // Überprüft, ob eine Suchanfrage vorhanden ist
        results = sortierteListe.filter(function (item) {
            return item.artikelnr.toString().indexOf(query) !== -1 ||  // Filtert die Artikel basierend auf der Suchanfrage
                item.name.toLowerCase().indexOf(query) !== -1;
        });
    } else {
        results = sortierteListe;  // Zeigt die gesamte sortierte Liste an, wenn keine Suchanfrage vorhanden ist
    }

    createTable(results);  // Erstellt die Tabelle mit den gefilterten Ergebnissen
}
