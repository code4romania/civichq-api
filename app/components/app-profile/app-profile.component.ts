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
    displayAppId: string;

    constructor(private appProfileService: AppProfileService,
        private route: ActivatedRoute) {

    }

    ngOnInit(): void {

        this.getParam();
        this.getAppProfileModel();

    }

    getParam() {

        this.route.params.forEach((params: Params) => {
            let src = params['id'];

            this.displayAppId = src;
        });
    }

    getAppProfileModel() {
        if (this.displayAppId == "centrulcivic") {
            this.getCentrulCivicProfile();
        } else {
            this.getGenericAppProfile();
        }
    }

    getCentrulCivicProfile() {
        this.appProfileService.getMasterDetails()
            .then(a => { this.app = a; console.log('Master Profile este: ' + JSON.stringify(this.app)); })
            .catch(err => console.log(err));
    }

    getGenericAppProfile() {
        let id = +this.displayAppId;
        if (id <= 0) { return; }

        this.appProfileService.getAppDetails(+this.displayAppId)
            .then(a => { this.app = a; console.log('Generic App este: ' + JSON.stringify(this.app)); })
            .catch(err => console.log(err));

    }

}