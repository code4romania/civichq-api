import { NgoDetailModel } from './../../shared/models/ngo-detail.model';
import { AppDetailModel } from './../../shared/models/app-detail.model';
import { AppProfileModel } from './../../shared/models/app-profile.model';
import { Component, Input, OnInit } from '@angular/core';
import { AddAppService } from './add-app.service';

@Component({
    selector: 'add-app',
    templateUrl: 'app/components/add-app/add-app.component.html',
    providers: [AddAppService]
})

export class AddAppComponent implements OnInit{

    constructor(private addAppService: AddAppService)
    {

    }

    ngOnInit(){
        this.app = new AppProfileModel();
        this.app.appdetail = new AppDetailModel();
        this.app.ngodetail = new NgoDetailModel();
    }

    @Input() app: AppProfileModel;

    addApp()
    {
        this.addAppService.addApp(this.app);

    }

}