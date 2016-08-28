import { SearchComponent } from './components/search/search.component';
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
        path: 'app-profile/:id', //add /:id
        component: AppProfileComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
    ,
    {
        path: 'search/:src', 
        component: SearchComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
