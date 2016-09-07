import { AppListComponent } from './../../shared/components/app-list.component';
import { SearchService } from './../../shared/services/search.service';
import { CategoryService } from './../../shared/services/category.service';
import { CategoryModel } from './../../shared/models/category.model';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { CAROUSEL_DIRECTIVES }  from 'ng2-bootstrap/components/carousel';
import { HomeService  } from './home.service';
import { CategoryPipe } from './../../shared/pipes/category-pipe';
import { ListAppModel } from './../../shared/models/list-app.model';


@Component({
    selector: 'home-component',
    templateUrl: 'app/components/home/home.component.html',
    providers: [CategoryService, HomeService, SearchService],
    directives: [CORE_DIRECTIVES, CAROUSEL_DIRECTIVES, AppListComponent],
    pipes: [CategoryPipe]
})

export class HomeComponent implements OnInit {

    apps: ListAppModel[];

    constructor(private homeService: HomeService) {
    }

    ngOnInit() {
        this.homeService.getAllApps()
            .then(a => {this.apps = a; 
                //console.log('HomeComponent apps for categories: ' + a.length)
            })
            .catch(err => console.log(err));
    }

  
}
