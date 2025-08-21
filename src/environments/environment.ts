// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAmTQ58ANAiKu6At1MKypzCdd8qaOyXqQY',
    authDomain: 'japanary-front-jp.firebaseapp.com',
    projectId: 'japanary-front-jp',
    storageBucket: 'japanary-front-jp.firebasestorage.app',
    messagingSenderId: '466574338427',
    appId: '1:466574338427:web:ebcb80632ebb38ab16b5de',
    measurementId: 'G-4QDF2PKVPS',
  },
  apiBaseUrl: 'http://localhost:3005/dictionary',
  apiBaseUrlFlashcards: 'http://localhost:3005/flashcard',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
