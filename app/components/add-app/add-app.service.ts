import { AppProfileModel } from './../../shared/models/app-profile.model';
import { Injectable } from '@angular/core';


@Injectable()
export class AddAppService
{
    addApp(app: AppProfileModel){
        
        if (app) {
            alert("App is: " + app.appdetail.name + "\n" + "Ngo is: " + app.ngodetail.name);
            
            alert('App adaugata cu succes!');   
            
        }
        else{
            alert('App is undefined!!');
        }

    }
}