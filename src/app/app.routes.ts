import { Routes } from '@angular/router';
import { EventList } from './components/event-list/event-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './core/guards';

export const routes: Routes = [
    { path: '', component: EventList, title: 'Event board' },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard], title: 'Admin event board' }
];
