import { Http } from '@angular/http';
import { BaseService } from './../../shared/models/base.service';
import { Injectable } from '@angular/core';
import { AppProfileModel } from './../../shared/models/app-profile.model';
import { NgoDetailModel } from './../../shared/models/ngo-detail.model';
import { AppDetailModel } from './../../shared/models/app-detail.model';

@Injectable()
export class AppProfileService extends BaseService {

    constructor(private http: Http) {
        super(http);
    }

    getAppDetails(id: number): Promise<AppProfileModel> {
        let link = this.rootAddress + 'appprofile/' + id;

        return this.getApp(link);

    }

    getMasterDetails(): Promise<AppProfileModel> {
        let link = this.rootAddress + 'masterprofile';

        return this.getApp(link);

    }

    private getApp(link: string): Promise<AppProfileModel> {

        let app: AppProfileModel;

        return this.http.get(link)
            .toPromise()
            .then(res => {
                app = res.json() as AppProfileModel;
                return app;
            })
            .catch(this.handleError);

    }

}