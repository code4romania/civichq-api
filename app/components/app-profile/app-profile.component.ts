import { NgoDetailModel } from './../../shared/models/ngo-detail.model';
import { AppDetailModel } from './../../shared/models/app-detail.model';
import { AppProfileModel } from './../../shared/models/app-profile.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppProfileService } from './app-profile.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
    
    selector: 'app-profile',
    templateUrl: 'app/components/app-profile/app-profile.component.html',
    providers: [AppProfileService]
})

export class AppProfileComponent implements OnInit, OnDestroy {



    constructor(private appProfileService: AppProfileService,
        private route: ActivatedRoute) {

    }

    app: AppProfileModel;
    displayAppId: string;

    private sub;

    ngOnInit() {

        this.subscribeToParam();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    subscribeToParam() {

        this.sub = this.route.params.subscribe(params => {
            let src = params['id'];
            this.displayAppId = src;
            
            this.getAppProfileModel();
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
        console.log('Getting centrul civic profile!!');
        this.appProfileService.getMasterDetails()
            .then(a => { this.app = a; this.describeApp(); })
            .catch(err => console.log(err));
    }

    getGenericAppProfile() {
        let id = +this.displayAppId;
        if (id <= 0) { return; }
        console.log('Getting generic app profile!!!!');
        this.appProfileService.getAppDetails(id)
            .then(a => { this.app = a; this.describeApp(); })
            .catch(err => console.log(err));

    }

    private describeApp() {
        var s = 'App este ';
        if (this.displayAppId == 'centrulcivic') {
            s = 'Master app este ';
        }
        console.log(s + this.app.appdetail.name + '; Ngo: ' + this.app.ngodetail.name);
    }

}