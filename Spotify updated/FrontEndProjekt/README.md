Schrottify - Frontend Dokumentation
==============

Kurzbeschreibung
--------------
Das Frontend liefert die Funktionalitäten für das Navigieren durch die Applikation, das Abspielen von Songs, erstellen eigener Playlisten, detailliertes Filtern von Songs, Artists und Alben,
sowie das gezielte Suchen von Songs, Alben, Artists und Playlists.

Projektstruktur
--------------

Im Ordner app liegt die app.component, die das Navigationsmenu, Routen zu den Komponenten artistlist, albumlist, songlist, playlist, songinfo und die Komponente player beinhaltet.
Alle anderen Komponenten sowie der Service, der die Verbindung zum Backend herstellt, liegen im Ordner komponenten.
Die Komponenten albumlist, artistlist, playlist und songlist zeigen Tabellen zu entsprechenden Daten an.
Die Komponente player beinhaltet nur den html5 player. Die Komponente song-info zeigt Informationen zum derzeitigen Song an.
Die Komponente playlistpopup ist notwendig um einen Bootstrap Dialog anzuzeigen. Die Komponente search-results zeigt eine live-Tabelle zur Suche an.
Der Service song.service wird gebraucht um ein Song Objekt zum derzeitigen Song für alle Komponenten bereitzustellen.

Detailfunkionalitäten
--------------
- Songs können ausgesucht und abgespielt werden
- Eigene Playlists können erstellt/gelöscht werden
- Es können alle Alben die auf dem Server liegen angezeigt werden
- Es können alle Artists die vorhanden sind angezeigt werden
- Songs können per Drag and Drop, einfach auf die gewünschte Playlist gezogen werden und zu dieser hinzugefügt werden
- Man kann gezielt nach Songs, Alben, Artists und Playlists suchen

Automatisches UI Testing
--------------
Um die UI Tests durchlaufen zu lassen muss im Verzeichnis /FrontEndProjekt/frontend/tests folgendes getan werden:
1. Mit 'webdriver-manager start' den Selenium Server starten
2. Ist dieser gestartet, können mit protractor conf.js die UI Tests durchlaufen werden

Installations- und Startanleitung
--------------
1. Per Projekt- oder Systemkonsole zum Ordner /FrontEndProjekt/frontend im Projekt Schrottify navigieren
2. 'npm install' ausführen
3. Nun sollten alle benötigten Packages installiert sein.
4. Mit 'npm start' das Frontend starten
Danach ist das Backend voll funktionsfähig und unter http://localhost:4200 erreichbar. Um die volle Funktionalität nutzen zu können, muss außerdem das Backend parallel laufen.