import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/components/home/home.component';
import { AppProfileComponent } from '../app/components/app-profile/app-profile.component';
import { AddAppComponent } from '../app/components/add-app/add-app.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'add-app',
        component: AddAppComponent
    },
    {
        path: 'app-profile', //add /:id
        component: AppProfileComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
    /*,
    {
        path: '/search', //TODO: add search parameters
        component: DashboardComponent
    }*/
];

export const routing = RouterModule.forRoot(appRoutes);
