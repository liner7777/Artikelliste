
// Definiere den Schlüssel für die Session
var session_key = "logged_in_name"

// Funktion zum Anzeigen des Registrierungsformulars
function showRegistrierung() {
    document.getElementById('anmeldung').style.display = 'none'; // Verstecke das Anmeldeformular
    document.getElementById('registrierung').style.display = 'block'; // Zeige das Registrierungsformular
}

// Funktion zum Anzeigen des Anmeldeformulars
function showAnmeldung() {
    document.getElementById('registrierung').style.display = 'none'; // Verstecke das Registrierungsformular
    document.getElementById('anmeldung').style.display = 'block'; // Zeige das Anmeldeformular
}

// Funktion zum Setzen der Login-Session
function login_session(benutzername) {
    sessionStorage.setItem(session_key, benutzername) // Speichere den Benutzernamen in der Session
}

// Funktion zum Löschen der Login-Session
function logout_session() {
    sessionStorage.setItem(session_key, "") // Setze den Benutzernamen in der Session auf leer
}

// Funktion zum Abrufen des aktuellen Benutzernamens aus der Session
function get_current_username() {
    return sessionStorage.getItem(session_key) // Gib den gespeicherten Benutzernamen zurück
}

// Funktion zum Abrufen des aktuellen Nutzerkontos
function get_current_session_acc() {
    return Nutzer_Gruppe.getNutzerByBenutzername(get_current_username()) // Gib das Nutzerobjekt basierend auf dem aktuellen Benutzernamen zurück
}

// Funktion zur Überprüfung, ob ein Benutzer eingeloggt ist
function isloggedin() {
    if (sessionStorage.getItem(session_key) != "" && sessionStorage.getItem(session_key) != null) {
        return true // Benutzer ist eingeloggt
    } else {
        return false // Benutzer ist nicht eingeloggt
    }
}

// Funktion zur Überprüfung, ob eine Artikel-ID bereits existiert
function check_for_duplicate_artikelID(nummer) {
    let allartikel = Artikel_Gruppe.getArtikel() // Hole alle Artikel
    for (let i = 0; i < allartikel.length; i++) {
        let artikel = Artikel_Gruppe.getArtikelByNr(allartikel[i].artikelnr) // Hole den Artikel basierend auf der Nummer
        let manager = new ArtikelManager(artikel) // Erstelle einen ArtikelManager für den Artikel
        if (manager.getArtikelNr() == nummer) {
            alert("Diese Artikel ID existiert bereits!") // Warnung, wenn die Artikel-ID bereits existiert
            return true;
        } else {
            return false; // Artikel-ID existiert nicht
        }
    }
}

// Funktion zur Überprüfung, ob Formularfelder leer sind
function check_for_empty() {
    let nummer = document.getElementById("artikelNr").value;
    let name = document.getElementById("name").value;
    let beschreibung = document.getElementById("beschreibung").value;
    let preis = document.getElementById("preis").value;
    let anzahl = document.getElementById("anzahl").value;
    if (nummer != "" && name != "" && beschreibung != "" && preis != "" && anzahl != "") {
        return false; // Alle Felder sind ausgefüllt
    } else {
        alert("Bitte fülle alle Felder aus!") // Warnung, wenn nicht alle Felder ausgefüllt sind
        return true;
    }
}

// Funktion zur Überprüfung, ob Formularfelder leer sind (zweites Formular)
function check_for_empty2() {
    let nummer = document.getElementById("artikelNr2").value;
    let name = document.getElementById("name2").value;
    let beschreibung = document.getElementById("beschreibung2").value;
    let preis = document.getElementById("preis2").value;
    let anzahl = document.getElementById("anzahl2").value;
    if (nummer != "" && name != "" && beschreibung != "" && preis != "" && anzahl != "") {
        return false; // Alle Felder sind ausgefüllt
    } else {
        alert("Bitte fülle alle Felder aus!") // Warnung, wenn nicht alle Felder ausgefüllt sind
        return true;
    }
}

// Funktion zum Erstellen eines neuen Artikels
function artikelerstellen() {
    Artikel_Gruppe.loadStorageArtikel() // Lade gespeicherte Artikel
    let nummer = document.getElementById("artikelNr").value;
    let name = document.getElementById("name").value;
    let beschreibung = document.getElementById("beschreibung").value;
    let preis = document.getElementById("preis").value;
    let anzahl = document.getElementById("anzahl").value;
    if (!check_for_empty()) {
        if (check_for_duplicate_artikelID(nummer) == true) {
            z_A() // Zeige eine Warnung, wenn die Artikel-ID bereits existiert
        } else {
            let art = new Artikel(name, beschreibung, parseFloat(parseFloat(preis).toFixed(2)), parseInt(anzahl), parseInt(nummer))
            Artikel_Gruppe.addArtikel(art) // Füge den neuen Artikel hinzu
        }
    }
}

// Funktion zum Bearbeiten eines bestehenden Artikels
function artikelbearbeiten() {
    Artikel_Gruppe.loadStorageArtikel() // Lade gespeicherte Artikel
    let nummer = document.getElementById("artikelNr2").value;
    let name = document.getElementById("name2").value;
    let beschreibung = document.getElementById("beschreibung2").value;
    let preis = document.getElementById("preis2").value;
    let anzahl = document.getElementById("anzahl2").value;
    if (!check_for_empty2()) {
        let art = Artikel_Gruppe.getArtikelByNr(nummer) // Hole den Artikel basierend auf der Nummer
        let man = new ArtikelManager(art) // Erstelle einen ArtikelManager für den Artikel
        man.setName(name) // Setze den neuen Namen
        man.setPreis(parseFloat(parseFloat(preis).toFixed(2))) // Setze den neuen Preis
        man.setBeschreibung(beschreibung) // Setze die neue Beschreibung
        man.setAnzahl(parseInt(anzahl)) // Setze die neue Anzahl
    }
}

// Funktion zum Erstellen eines neuen Nutzers (aktuell leer)
function nutzererstellen() {
}

// Funktion zum Anzeigen eines Artikels (z_A)
function z_A() {
    document.getElementById('art').style.display = 'flex';
    const popup = document.querySelector(".container2");
    popup.style.filter = "blur(3px)";
}

// Funktion zum Anzeigen eines anderen Artikels (z_B)
function z_B() {
    document.getElementById('aba').style.display = 'flex';
    const popup = document.querySelector(".container2");
    popup.style.filter = "blur(3px)";
}

// Funktion zum Verstecken des Artikels (sEingabe)
function sEingabe() {
    document.getElementById('art').style.display = 'none';
    const popup = document.querySelector(".container2");
    popup.style.filter = "blur(0px)";
}

// Funktion zum Verstecken eines anderen Artikels (sbEingabe)
function sbEingabe() {
    document.getElementById('aba').style.display = 'none';
    const popup = document.querySelector(".container2");
    popup.style.filter = "blur(0px)";
}

// Funktion zum Ausloggen und Weiterleiten zur Startseite
function lO() {
    logout_session() // Lösche die Session
    window.open("index.html", "_self") // Öffne die Startseite
}

// Funktion zum Weiterleiten zur Artikelliste
function ZZ() {
    window.open("Artikelliste.html", "_self") // Öffne die Artikelliste
}

// Funktion zum Anmelden eines Nutzers
function anmelden() {
    let username = document.getElementById("benutzername1").value
    let pw = document.getElementById("passwort1").value
    if (!Nutzer_Gruppe.getNutzerByBenutzername(username)) {
        alert("Nutzer existiert nicht!") // Warnung, wenn der Nutzer nicht existiert
    } else {
        let user = Nutzer_Gruppe.getNutzerByBenutzername(username)
        let accmanager = new NutzerManager(user)
        let name = accmanager.getBenutzername()
        let passwort = accmanager.getPasswort()
        let registered = accmanager.getRegistered()
        if (name == username && passwort == pw && registered == true) {
            login_session(username) // Setze die Login-Session
            window.open("Artikelliste.html", "_self") // Öffne die Artikelliste
        } else if (registered == false) {
            alert("Benutzer nicht registriert! Bitte warte bis deine Anfrage von einem Admin angenommen wird")
        } else {
            alert("FALSCHES PASSWORT")
        }
    }
}

// Funktion zur Überprüfung, ob ein Benutzername bereits existiert
function check_for_duplicate_username(username) {
    let all_user = Nutzer_Gruppe.getNutzer() // Hole alle Nutzer
    for (let i = 0; i < all_user.length; i++) {
        let user = Nutzer_Gruppe.getNutzerByBenutzername(all_user[i].benutzername)
        let manager = new NutzerManager(user)
        if (manager.getBenutzername() == username) {
            alert("Benutzername existiert bereits!") // Warnung, wenn der Benutzername bereits existiert
            return true;
        }
    }
}

// Funktion zur Überprüfung, ob eine E-Mail bereits existiert
function check_for_duplicate_email(email) {
    let all_user = Nutzer_Gruppe.getNutzer() // Hole alle Nutzer
    for (let i = 0; i < all_user.length; i++) {
        let user = Nutzer_Gruppe.getNutzerByBenutzername(all_user[i].benutzername)
        let manager = new NutzerManager(user)
        if (manager.getEmail() == email) {
            alert("Email existiert bereits!") // Warnung, wenn die E-Mail bereits existiert
            return true;
        } else {
            return false;
        }
    }
}

// Funktion zum Registrieren eines neuen Nutzers
function register() {
    let vname = document.getElementById("vname").value
    let nname = document.getElementById("nname").value
    let benutzername2 = document.getElementById("benutzername2").value
    let geb = document.getElementById("geb").value
    let email = document.getElementById("email").value
    let emailw = document.getElementById("emailw").value
    let passwort2 = document.getElementById("passwort2").value
    let passwortw = document.getElementById("passwortw").value
    if (passwort2 != passwortw) {
        alert("Passwörter stimmen nicht überein")
    } else if (email != emailw) {
        alert("E-Mail Adressen stimmen nicht überein")
    } else {
        if (!(check_for_duplicate_username(benutzername2) || check_for_duplicate_email(email))) {
            var rolle = Rollen_Gruppe.getRolleByName("Nutzer") // Hole die Rolle "Nutzer"
            var nutzer = new Nutzer(vname, nname, benutzername2, email, passwort2, geb, rolle, true)
            Nutzer_Gruppe.addNutzer(nutzer) // Füge den neuen Nutzer hinzu
            document.getElementById("anmeldungg").click() // Klicke auf den Anmeldebutton
        }
    }
}

// Funktion zum Weiterleiten zur Admin-Seite
function to_admin() {
    window.open("admin.html", "_self") // Öffne die Admin-Seite
}

// Funktion zur Überprüfung, ob der aktuelle Nutzer ein Admin ist
function ist_admin() {
    let username = get_current_session_acc();
    let man = new NutzerManager(username);
    let rolle = man.getRolle();
    let rollenman = new RollenManager(rolle)
    if (rollenman.hasAdminRights()) {
        let d = document.getElementById("adminknopf")
        d.style.display = "block"; // Zeige den Admin-Knopf, wenn der Nutzer Adminrechte hat
    }
}

// Funktion zur Überprüfung, ob der aktuelle Nutzer Artikel bearbeiten kann
function can_edit_artikel() {
    let username = get_current_session_acc();
    let man = new NutzerManager(username);
    let rolle = man.getRolle();
    let rollenman = new RollenManager(rolle)
    if (rollenman.canSeeArtikelOptions()) {
        return true; // Der Nutzer kann Artikel bearbeiten
    } else {
        return false;
    }
}

// Funktion zum Überprüfen und Verstecken des Artikelbuttons, falls der Nutzer keine Bearbeitungsrechte hat
function checkAndHideArtikel() {
    if (can_edit_artikel() !== true) {
        var button = document.getElementById("addartikel")
        button.style.display = "none"; // Verstecke den Button
    } else {
        var button = document.getElementById("addartikel")
        button.style.display = "block"; // Zeige den Button
    }
}

// Funktion zur Überprüfung, ob der Nutzer eingeloggt ist und Weiterleiten zur Artikelliste
function checkangemeldet() {
    if (isloggedin()) {
        window.open("Artikelliste.html", "_self") // Öffne die Artikelliste
    }
}

// Funktion zur Überprüfung, ob der Nutzer eingeloggt ist und Weiterleiten zur Startseite, wenn nicht
function checkangemeldetartikelliste() {
    if (!isloggedin()) {
        window.open("index.html", "_self") // Öffne die Startseite
    }
}

//Funktion zur Überprüfung, ob der Nutzer eingeloggt ist und Admin Rechte hat.
function checkangemeldetundadmin() {
    if (isloggedin()) {
    let current_user = get_current_session_acc()
    let Manager = new NutzerManager(current_user)
    let NutzerRolle = Manager.getRolle()
    let Rolle = new RollenManager(NutzerRolle)
    if (Rolle.hasAdminRights() == false) {
        window.open("index.html", "_self")
    }
    }
    else {
        window.open("index.html", "_self")
    }
}

// Funktion zum Erstellen eines Test-Admin-Nutzers
function createtestadminuser() {
    let rolle = Rollen_Gruppe.getRolleByName("Admin") // Hole die Rolle "Admin"
    var nutzer = new Nutzer("AdminVNAME", "AdminNNAME", "admin", "a@a.com", "admin", "2.7.1956", rolle, true)
    var admincheck = Nutzer_Gruppe.getNutzerByBenutzername("admin")
    if (admincheck) {
        console.log("Admin Konto existiert schon")
    }
    else {
    Nutzer_Gruppe.addNutzer(nutzer) // Füge den Admin-Nutzer hinzu
    location.reload()
    }
}

// Funktion zum Erstellen einer neuen Rolle
function create_rolle() {
    let edit = document.getElementById("toggleEdit").checked
    let admin = document.getElementById("toggleAdmin").checked
    let name = document.getElementById("role_name").value
    let rolle = Rollen_Gruppe.getRolleByName(name)
    //Checkt ob die Rolle existiert / ob das Feld leer ist 
    if (rolle || name == "") {
        alert("Diese Rolle existiert schon / Rollenname kann nicht leer sein")
    }
    //Wenn nicht
    else {
    Rollen_Gruppe.addNewRolle(name, admin, edit) // Füge die neue Rolle hinzu
    location.reload() //Lädt Seite neu.
    }
}
