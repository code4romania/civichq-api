import { Injectable } from '@angular/core';
import { AppProfileModel } from './../../shared/models/app-profile.model';
import { NgoDetailModel } from './../../shared/models/ngo-detail.model';
import { AppDetailModel } from './../../shared/models/app-detail.model';

@Injectable()
export class AppProfileService {

    getAppDetails(id: number): Promise<AppProfileModel> {

        var app = this.apps.find(a => a.appdetail.id === id);

        return Promise.resolve(app);
    }

    apps: AppProfileModel[] = [
        {
            appdetail: {
                id: 1,
                name: "App 1",
                website: "www.app1.com",
                github: "www.github.com/app1",
                facebook: "facebook/app1",
                creationdate: new Date(2016, 5, 13),
                logoname: "applogo1.png",
                description: "App 1 e cea mai buna app din univers!!",
                categoryid: 1,
                categoryname: "Social",
                hashtags: ["#tag 1", "#tag 2", "#tag 3"]
            },
            ngodetail: {
                name: "Ngo pt App 1",
                phone: "+40722723212",
                email: "office@ngo1.com",
                facebook: "Facebook.com/ngo1",
                googleplus: "googleplus.com/ngo1",
                linkedin: "linkedin/ngo1",
                twitter: "twitter.com/ngo1",
                instagram: "Instagram.com/ngo1",
                description: "Ngo pt oameni",
                logoname: "ngologo1.png"
            }
        },
        {
            appdetail: {
                id: 2,
                name: "App 2",
                website: "www.app2.com",
                github: "www.github.com/app2",
                facebook: "facebook/app2",
                creationdate: new Date(2016, 2, 18),
                logoname: "applogo2.png",
                description: "App 2 e cea mai buna app din univers!!",
                categoryid: 2,
                categoryname: "Mediu",
                hashtags: ["#tag 11", "#tag 21", "#tag 31"]
            },
            ngodetail: {
                name: "Ngo pt App 2",
                phone: "+40725743512",
                email: "office@ngo2.com",
                facebook: "Facebook.com/ngo2",
                googleplus: "googleplus.com/ngo2",
                linkedin: "linkedin/ngo2",
                twitter: "twitter.com/ngo2",
                instagram: "Instagram.com/ngo2",
                description: "Ngo pt oameni mai buni",
                logoname: "ngologo2.png"
            }
        }

    ];

}