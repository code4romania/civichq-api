import { HttpModule } from '@angular/http';
import { SearchComponent } from './components/search/search.component';
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { routing } from './app.routing';

import { HomeComponent } from '../app/components/home/home.component';
import { AppProfileComponent } from '../app/components/app-profile/app-profile.component';
import { AddAppComponent } from '../app/components/add-app/add-app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AppProfileComponent,
    AddAppComponent,
    SearchComponent
  ],
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
