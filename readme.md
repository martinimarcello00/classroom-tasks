# Classroom Tasks
Crea dei to-do in google tasks per ogni argomento o compito caricato nei corsi di google classroom a cui sei registrato.

Attraverso questo google script genera automaticamente una lista per ogni corso di google classroom ed inserisci un to-do per ogni argomento o compito assegnato del corso. 

## Funzionalità
* Genera un elenco in google tasks per ogni corso di google classroom.
* Inserisci un to-do per ogni argomento caricato sul corso.
* Inserisci un to-do per ogni compito assegnato sul corso con data di scadenza (se impostata su classroom dall'insegnante).

|Servizi utilizzati|
|------------------|
|[Google app script](https://developers.google.com/apps-script)|
|[Google Classroom API](https://developers.google.com/classroom)|
|[Google Tasks API](https://developers.google.com/tasks)

## Istruzioni
Creare un progetto in Google app script e caricare il file sorgente classroom-tasks.gs. Seleazionare dal menu in alto il tab *Risorse* e poi la voce *Servizi avanzati di Google*. Nella finestra popup aperta attivare le Google Classroom API e le Google Tasks API. Nella barra degli strumenti selezionare dal dropdon menu *Seleziona funzione* la funzione *aggiornatutto* e poi cliccare il pulsante esegui funzione. E' possibile anche settare un Trigger per la funzione.
