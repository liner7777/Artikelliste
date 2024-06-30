

var global_mitarbeiternr = 0;

// Klasse für die Rolle
class Rolle {
    constructor(name, hasAdminRights, canEditArtikel) {
        this.name = name; // Name der Rolle
        this.id = Rollen_Gruppe.getRollen().length; // ID der Rolle basierend auf der Länge der Rollenliste
        this.hasAdminRights = hasAdminRights; // Admin-Rechte der Rolle
        this.canEditArtikel = canEditArtikel; // Bearbeitungsrechte für Artikel
    }
}

// Klasse für die Rollen-Gruppe
class Rollen_Group {
    constructor() {
        this.rollen = []; // Array zum Speichern der Rollen

        this.key = "rollen"; // Schlüssel für localStorage

        // Funktion zum Speichern der Rollen in localStorage
        this.saveToStorage = function () {
            localStorage.setItem(this.key, JSON.stringify(this.rollen));
        };

        // Funktion zum Hinzufügen einer Rolle
        this.addRolle = function (Rolle) {
            this.rollen.push(Rolle);
            localStorage.setItem(this.key, JSON.stringify(this.rollen));
        };

        // Funktion zum Erstellen und Hinzufügen einer neuen Rolle
        this.addNewRolle = function (name, hasAdminRights, canEditArtikel) {
            let Rolle1 = new Rolle(name, hasAdminRights, canEditArtikel);
            this.addRolle(Rolle1);
        };

        // Funktion zum Laden der Rollen aus localStorage
        this.loadStorageRollen = function () {
            var loadStorage = localStorage.getItem(this.key);
            if (loadStorage != null) {
                var loadrollen = JSON.parse(loadStorage);
                this.rollen = loadrollen;
            }
        };

        // Funktion zum Abrufen einer Rolle nach Name
        this.getRolleByName = function (name) {
            let array = this.rollen;
            for (let i = 0; i < array.length; i++) {
                let iRolle = array[i];
                let Manager = new RollenManager(iRolle);
                if (Manager.getName() == name) {
                    return array[i];
                }
            }
        };

        // Funktion zum Abrufen aller Rollen
        this.getRollen = function () {
            return this.rollen;
        };
    }
}

// Klasse für den Rollen-Manager
class RollenManager {
    constructor(Rolle) {
        this.getName = function () {
            return Rolle.name; // Name der Rolle
        };

        this.hasAdminRights = function () {
            if (Rolle.hasAdminRights == true) {
                return true;
            } else {
                return false;
            }
        };
        
        this.canSeeArtikelOptions = function () {
            if (Rolle.canEditArtikel == true) {
                return true;
            } else {
                return false;
            }
        };
    }
}

var Rollen_Gruppe = new Rollen_Group();
Rollen_Gruppe.loadStorageRollen(); // Lade Rollen aus localStorage

// Klasse für die Nutzer-Gruppe
class Nutzer_Group {
    constructor() {
        this.nutzer = []; // Array zum Speichern der Nutzer

        this.key = "nutzer"; // Schlüssel für localStorage

        // Funktion zum Speichern der Nutzer in localStorage
        this.saveToStorage = function () {
            localStorage.setItem(this.key, JSON.stringify(this.nutzer));
        };

        // Funktion zum Hinzufügen eines Nutzers
        this.addNutzer = function (Nutzer) {
            this.nutzer.push(Nutzer);
            localStorage.setItem(this.key, JSON.stringify(this.nutzer));
        };

        // Funktion zum Laden der Nutzer aus localStorage
        this.loadStorageNutzer = function () {
            var loadStorage = localStorage.getItem(this.key);
            if (loadStorage != null) {
                var loadkonten = JSON.parse(loadStorage);
                this.nutzer = loadkonten;
            }
        };

        // Funktion zum Setzen der Nutzer
        this.setNutzer = function (newnutzer) {
            this.nutzer = newnutzer;
            localStorage.setItem(this.key, JSON.stringify(this.nutzer));
        };

        // Funktion zum Abrufen aller Nutzer
        this.getNutzer = function () {
            return this.nutzer;
        };

        // Funktion zum Abrufen eines Nutzers nach Benutzername
        this.getNutzerByBenutzername = function (name) {
            let array = this.nutzer;
            for (let i = 0; i < array.length; i++) {
                let cNutzer = array[i];
                let Manager = new NutzerManager(cNutzer);
                if (Manager.getBenutzername() == name) {
                    return array[i];
                }
            }
        };

        // Funktion zum Abrufen eines Nutzers nach Nummer
        this.getNutzerByNr = function (nummer) {
            let array = this.nutzer;
            for (let i = 0; i < array.length; i++) {
                let cNutzer = array[i];
                let Manager = new NutzerManager(cNutzer);
                if (Manager.getMitarbeiterNr() == nummer) {
                    return array[i];
                }
            }
        };

        // Funktion zum Abrufen eines Nutzers nach E-Mail
        this.getNutzerByEmail = function (email) {
            let array = this.nutzer;
            for (let i = 0; i < array.length; i++) {
                let cNutzer = array[i];
                let Manager = new NutzerManager(cNutzer);
                if (Manager.getEmail() == email) {
                    return array[i];
                }
            }
        };

        // Funktion zum Abrufen von Nutzern nach Rollenname
        this.getNutzerByRollenName = function (rollenName) {
            let array = this.nutzer;
            let temparray = [];
            for (let i = 0; i < array.length; i++) {
                let cNutzer = array[i];
                let Manager = new NutzerManager(cNutzer);
                if (Manager.getRollenName() == rollenName) {
                    temparray.push(array[i]);
                }
            }
            return temparray;
        };

        // Funktion zum Abrufen aller angeforderten Nutzer
        this.getAllRequested = function () {
            let array = this.nutzer;
            let temparray = [];
            for (let i = 0; i < array.length; i++) {
                let cNutzer = array[i];
                let Manager = new NutzerManager(cNutzer);
                if (Manager.getRequested() == true && Manager.getRegistered() == false) {
                    temparray.push(array[i]);
                }
            }
            return temparray;
        };

        // Funktion zum Abrufen aller registrierten Nutzer
        this.getAllRegistered = function () {
            let array = this.nutzer;
            let temparray = [];
            for (let i = 0; i < array.length; i++) {
                let cNutzer = array[i];
                let Manager = new NutzerManager(cNutzer);
                if (Manager.getRegistered() == true && Manager.getRequested() == false) {
                    temparray.push(array[i]);
                }
            }
            return temparray;
        };

        // Funktion zum Löschen aller Artikel
        this.deleteAllArtikel = function () {
            this.nutzer = [];
            this.saveToStorage();
        };
    }
}

var Nutzer_Gruppe = new Nutzer_Group();
Nutzer_Gruppe.loadStorageNutzer(); // Lade Nutzer aus localStorage

// Klasse für Nutzer
class Nutzer {
    constructor(vorname, nachname, benutzername, email, passwort, geburtsdatum, Rolle, requested) {
        this.vorname = vorname; // Vorname des Nutzers
        this.nachname = nachname; // Nachname des Nutzers
        this.benutzername = benutzername; // Benutzername des Nutzers
        this.email = email; // E-Mail des Nutzers
        this.passwort = passwort; // Passwort des Nutzers
        this.Rolle = Rolle; // Rolle des Nutzers
        this.registered = false; // Registrierungsstatus
        this.requested = requested; // Anfrage-Status
        this.geburtsdatum = geburtsdatum; // Geburtsdatum des Nutzers
        this.mitarbeiternr = Nutzer_Gruppe.getNutzer().length; // Mitarbeiternummer basierend auf der Länge der Nutzerliste
    }
}

// Klasse für den Nutzer-Manager
class NutzerManager {
    constructor(Nutzer) {
        this.requestVerification = function () {
            if (Nutzer.registered == false) {
                Nutzer.requested = true; // Setze den Anfrage-Status auf true, wenn der Nutzer nicht registriert ist
            }
        };

        this.editPerms = function () {
            if (Nutzer.Rolle.canEditArtikel == true) {
                return true; // Rückgabe true, wenn der Nutzer Bearbeitungsrechte hat
            } else {
                return false;
            }
        };

        this.setBenutzername = function (newName) {
            Nutzer.benutzername = newName; // Setze den neuen Benutzernamen
        };

        this.setRolle = function (newRolle) {
            Nutzer.Rolle = newRolle; // Setze die neue Rolle
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.getRequested = function () {
            return Nutzer.requested; // Rückgabe des Anfrage-Status
        };

        this.setRequested = function (value) {
            Nutzer.requested = value; // Setze den Anfrage-Status
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setEmail =

 function (newEmail) {
            Nutzer.email = newEmail; // Setze die neue E-Mail
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.passwort = function (newPW) {
            Nutzer.passwort = newPW; // Setze das neue Passwort
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setVorname = function (newName) {
            Nutzer.vorname = newName; // Setze den neuen Vornamen
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setNachname = function (newName) {
            Nutzer.nachname = newName; // Setze den neuen Nachnamen
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.getBenutzername = function () {
            return Nutzer.benutzername; // Rückgabe des Benutzernamens
        };

        this.getRolle = function () {
            return Nutzer.Rolle; // Rückgabe der Rolle
        };

        this.getRollenName = function () {
            return Nutzer.Rolle.name; // Rückgabe des Rollennamens
        };

        this.getEmail = function () {
            return Nutzer.email; // Rückgabe der E-Mail
        };

        this.getPasswort = function () {
            return Nutzer.passwort; // Rückgabe des Passworts
        };

        this.getVorname = function () {
            return Nutzer.vorname; // Rückgabe des Vornamens
        };

        this.getNachname = function () {
            return Nutzer.nachname; // Rückgabe des Nachnamens
        };

        this.getRegistered = function () {
            return Nutzer.registered; // Rückgabe des Registrierungsstatus
        };

        this.setRegistered = function (bool) {
            Nutzer.registered = bool; // Setze den Registrierungsstatus
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.getMitarbeiterNr = function () {
            return Nutzer.mitarbeiternr; // Rückgabe der Mitarbeiternummer
        };

        this.setMitarbeiterNr = function (nr) {
            Nutzer.mitarbeiternr = nr; // Setze die Mitarbeiternummer
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.getGeburtsdatum = function () {
            return Nutzer.geburtsdatum; // Rückgabe des Geburtsdatums
        };

        this.setGeburtsdatum = function (datum) {
            Nutzer.geburtsdatum = datum; // Setze das Geburtsdatum
            Nutzer_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };
    }
}

// Klasse für Artikel
class Artikel {
    constructor(name, beschreibung, preis, anzahl_lager, artikelnr) {
        this.name = name; // Name des Artikels
        this.artikelnr = artikelnr; // Artikelnummer
        this.beschreibung = beschreibung; // Beschreibung des Artikels
        this.preis = preis; // Preis des Artikels
        this.anzahl_lager = anzahl_lager; // Anzahl im Lager
    }
}

// Klasse für die Artikel-Gruppe
class Artikel_Group {
    constructor() {
        this.artikel = []; // Array zum Speichern der Artikel

        this.key = "artikel"; // Schlüssel für localStorage

        // Funktion zum Speichern der Artikel in localStorage
        this.saveToStorage = function () {
            localStorage.setItem(this.key, JSON.stringify(this.artikel));
        };

        // Funktion zum Hinzufügen eines Artikels
        this.addArtikel = function (Artikel) {
            this.artikel.push(Artikel);
            localStorage.setItem(this.key, JSON.stringify(this.artikel));
        };

        // Funktion zum Laden der Artikel aus localStorage
        this.loadStorageArtikel = function () {
            var loadStorage = localStorage.getItem(this.key);
            if (loadStorage != null) {
                var loadkonten = JSON.parse(loadStorage);
                this.artikel = loadkonten;
            }
        };

        // Funktion zum Setzen der Artikel
        this.setArtikel = function (newartikel) {
            this.artikel = newartikel;
            localStorage.setItem(this.key, JSON.stringify(this.nutzer));
        };

        // Funktion zum Abrufen aller Artikel
        this.getArtikel = function () {
            return this.artikel;
        };

        // Funktion zum Abrufen eines Artikels nach Name
        this.getArtikelByName = function (name) {
            let array = this.artikel;
            for (let i = 0; i < array.length; i++) {
                let cArtikel = array[i];
                let Manager = new ArtikelManager(cArtikel);
                if (Manager.getName() == name) {
                    return array[i];
                }
            }
        };

        // Funktion zum Abrufen eines Artikels nach Nummer
        this.getArtikelByNr = function (nummer) {
            let array = this.artikel;
            for (let i = 0; i < array.length; i++) {
                let cArtikel = array[i];
                let Manager = new ArtikelManager(cArtikel);
                if (Manager.getArtikelNr() == nummer) {
                    return array[i];
                }
            }
        };

        // Funktion zum Löschen eines Artikels
        this.deleteArtikel = function (nr) {
            let stanniarray = [];
            let array = this.getArtikel();
            for (let i = 0; i < array.length; i++) {
                let cArtikel = array[i];
                let Manager = new ArtikelManager(cArtikel);
                if (Manager.getArtikelNr() == nr) {
                    array.splice(i, 1);
                }
            }
            this.saveToStorage();
        };

        // Funktion zum Löschen aller Artikel
        this.deleteAllArtikel = function () {
            this.artikel = [];
            this.saveToStorage();
        };

        /*this.addNewArtikel = function(name, beschreibung, preis, menge_lager, nr) {
            let art = new Artikel(name, beschreibung, preis, menge_lager, nr)
            this.addArtikel(art)
        }*/
    }
}

var Artikel_Gruppe = new Artikel_Group();
Artikel_Gruppe.loadStorageArtikel(); // Lade Artikel aus localStorage

// Klasse für den Artikel-Manager
class ArtikelManager {
    constructor(Artikel) {
        this.setName = function (newName) {
            Artikel.name = newName; // Setze den neuen Namen
            Artikel_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setBeschreibung = function (newBeschreibung) {
            Artikel.beschreibung = newBeschreibung; // Setze die neue Beschreibung
            Artikel_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setPreis = function (newPreis) {
            Artikel.preis = newPreis; // Setze den neuen Preis
            Artikel_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setAnzahl = function (newAnzahl) {
            Artikel.anzahl_lager = newAnzahl; // Setze die neue Anzahl im Lager
            Artikel_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.setArtikelnr = function (newNumber) {
            Artikel.artikelnr = newNumber; // Setze die neue Artikelnummer
            Artikel_Gruppe.saveToStorage(); // Speicher die Änderungen in localStorage
        };

        this.getName = function () {
            return Artikel.name; // Rückgabe des Namens
        };

        this.getPreis = function () {
            return Artikel.preis; // Rückgabe des Preises
        };

        this.getArtikelNr = function () {
            return Artikel.artikelnr; // Rückgabe der Artikelnummer
        };

        this.getBeschreibung = function () {
            return Artikel.beschreibung; // Rückgabe der Beschreibung
        };

        this.getAnzahlLager = function () {
            return Artikel.anzahl_lager; // Rückgabe der Anzahl im Lager
        };
    }
}

var admin = new Rolle("Admin", true, true, 1);
var angestellter = new Rolle("Angestellter", false, true, 2);
var nutzer = new Rolle("Nutzer", false, false, 3);

if (!(Rollen_Gruppe.getRollen().length > 1)) {
    Rollen_Gruppe.addRolle(admin);
    Rollen_Gruppe.addRolle(angestellter);
    Rollen_Gruppe.addRolle(nutzer);
}

if (Nutzer_Gruppe.getNutzer().length > 0) {
    var Manager = new NutzerManager(Nutzer_Gruppe.getNutzerByBenutzername("admin"));
    Manager.setRegistered(true); // Setze den Registrierungsstatus auf true
    Manager.setRequested(false); // Setze den Anfrage-Status auf false
}
