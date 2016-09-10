import { NgoDetailModel } from './../../shared/models/ngo-detail.model';
import { AppDetailModel } from './../../shared/models/app-detail.model';
import { AppProfileModel } from './../../shared/models/app-profile.model';
import { Component, Input, OnInit } from '@angular/core';
import { AppProfileService } from './app-profile.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'app-profile',
    templateUrl: 'app/components/app-profile/app-profile.component.html',
    providers: [AppProfileService]
})

export class AppProfileComponent implements OnInit {

    app: AppProfileModel;

    constructor(private appProfileService: AppProfileService,
        private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        
        this.route.params.forEach(
            (params: Params) => {
                let id = +params['id'];

                this.appProfileService.getAppDetails(id)
                    .then(a => {this.app = a; console.log('App este: ' + JSON.stringify(this.app));})
                    .catch(err => console.log(err));
            }
        );
        
    }

}