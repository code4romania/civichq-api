import { SearchService } from './../../shared/services/search.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryModel } from './../../shared/models/category.model';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryPipe } from './../../shared/pipes/category-pipe';
import { ListAppModel } from './../../shared/models/list-app.model';
import { CORE_DIRECTIVES } from '@angular/common';
import { CAROUSEL_DIRECTIVES }  from 'ng2-bootstrap/components/carousel';
import { AppListComponent } from './../../shared/components/app-list.component';

@Component({
    selector: 'app-search',
    templateUrl: 'app/components/search/search.component.html',
    providers: [SearchService]
})


export class SearchComponent implements OnInit {

    constructor(private searchService: SearchService,
        private route: ActivatedRoute) {

    }

    searchString: string;

    apps: ListAppModel[];

    search() {
        this.searchService.searchBy(this.searchString)
            .then(a => this.apps = a)
            .catch(err => console.log(err));
    }


    ngOnInit() {
        
        this.setSearchStringFromParams();
        this.search();
    }

    setSearchStringFromParams() {

        this.route.params.forEach((params: Params) => {
            let src = params[0];
            this.searchString = src;
            alert('Src este ' + src);
        });

    }



}
