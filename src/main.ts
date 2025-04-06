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
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage';
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
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideFirestore(() => getFirestore()) ,
    provideStorage(() => getStorage()),
    HttpClient,
    HttpClientModule
  ]
}).catch((err) => console.error(err));
