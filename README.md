# SpaceX Launches Project

Questo progetto Next.js utilizza l'API di SpaceX per visualizzare informazioni sui lanci aerospaziali. Offre funzionalità come la navigazione, l'autenticazione degli utenti, la gestione dei preferiti e la visualizzazione dettagliata dei lanci.

## Funzionalità

- **Navbar**: Navigazione tra la Home, la pagina dei lanci, e la pagina dei preferiti.
- **Home**: Pagina minimalista di presentazione.
- **Pagina dei Lanci**: Mostra tutte le card dei lanci aerospaziali in ordine di data, ognuna con immagine, titolo, data e numero di volo. È possibile aggiungere/rimuovere una card dai preferiti.
- **Pagina di Dettaglio del Lancio**: Fornisce tutti i dettagli presenti nelle card, oltre ai dettagli del successo del volo, una descrizione, il video del lancio e un link ad un articolo correlato.
- **Pagina dei Preferiti**: Visualizzazione delle card preferite dell'utente.

## Tecnologie Utilizzate

- **Next.js**: Framework React per lo sviluppo di applicazioni web.
- **MySQL**: Sistema di gestione di database relazionali per la persistenza dei dati.

## Setup del Progetto

1. Clonare il repository: `git clone <repository_url>`
2. Installare le dipendenze: `npm install`
3. Avviare l'applicazione: `npm run dev`