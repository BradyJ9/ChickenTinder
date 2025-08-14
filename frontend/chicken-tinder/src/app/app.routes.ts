import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/HomePage/home-page.component';
import { CreateSessionPageComponent } from './pages/CreateSessionPage/create-session-page.component';
import { JoinSessionPageComponent } from './pages/JoinSessionPage/join-session-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'create', component: CreateSessionPageComponent },
    { path: 'join', component: JoinSessionPageComponent }
];
