Schrottify - Backend Dokumentation
==============

Kurzbeschreibung
--------------
Das Backend liefert die Funktionalitäten für das Streamen, Anlegen, Löschen und Verändern eines, bzw. mehrerer Songs und Playlisten.

Projektstruktur
--------------
Backend  
├───config  
│   ├───default.json  
├───models  
│   ├───playlist.js  
│   ├───song.js  
├───node_modules  
├───routes  
│   ├───api.js  
│   ├───routes.js  
├───songs  
├───index.js  
└───package.json  

API Funktionen
--------------
- Streamen von Songs
- Songs die im Ordner 'songs' liegen, werden automatisch initialisiert
- Alle initialisierten Songs zurückliefern
- Einzelnen Song anlegen, löschen & updaten
- Artists der Songs zurückliefern
- Alben der Songs zurückliefern
- Alle Songs löschen
- Playlist anlegen, löschen und updaten
- Alle Playlists bekommen

Mögliche URL's
--------------
### Songs

- /song  
⋅post  

- /song/:id  
⋅get, delete & put  
 
- /songs  
⋅get  

- /stream/:id  
⋅get  

- /initSongs  
⋅get  

- /deleteAllSongs  
⋅delete  

### Artists

- /artists'  
⋅get  

### Albums

- /albums  
⋅get  

### Playlists

- /playlist  
⋅post  

- /playlist/:id  
⋅get, delete, put  

- /playlists  
⋅get  


Installations- und Startanleitung
--------------
1. Per Projekt- oder Systemkonsole zum Ordner /BackendProjekt im Projekt Schrottify navigieren
2. 'npm install' ausführen
3. Nun sollten alle benötigten Packages installiert sein.
4. Mit 'npm start' das Backend starten
Danach ist das Backend voll funktionsfähig und unter http://localhost:3000 erreichbar.

Automatisches API Testing
--------------
Um die API zu testen, einfach 'npm test' in die Projekt- bzw. Systemkonsole im Verzeichnis /Backend ausführen. Dann sollten die Tests durchlaufen.






































Anmerkungen
--------------
Es wurde beschlossen kein Artist/Album Model anzulegen, da aus unserer Sicht der geringe Rechenaufwand keine Erweiterung der Architektur/Datenbank rechtfertigt.