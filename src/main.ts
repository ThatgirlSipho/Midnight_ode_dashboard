import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(AppComponent, {

  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right', // Move to top-right
      timeOut: 3000, // Toast disappears after 3 seconds
      
      closeButton: true, // Allow closing
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // ✅ Correct Firebase init
    provideFirestore(() => getFirestore()) // ✅ Correct Firestore provider
  ]
}).catch((err) => console.error(err));
