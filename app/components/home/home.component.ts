import { Component, OnInit } from '@angular/core';
import { HomeService  } from './home.service';
import { CategoryModel } from './category.model';
import { ListAppModel } from './list-app.model';

@Component({
  selector: 'home-component',
  templateUrl: 'app/components/home/home.component.html',
  providers: [HomeService]
})

export class HomeComponent implements OnInit {

  categories: CategoryModel[];
  apps: ListAppModel[];

  private selectedCategory: CategoryModel;
  

  constructor(private homeService: HomeService)
  { }

  ngOnInit() {
    this.homeService.getCategories()
      .then(c => this.categories = c)
      .catch(err => console.log(err));

    this.homeService.getTopChildrenForCategories()
      .then(a => this.apps = a)
      .catch(err => console.log(err));

    
  }

  onSelectCategory(cat) {
    this.selectedCategory = cat;

    this.sortCategories();
  }

  private sortCategories() {
    if (this.selectedCategory) {
      let newOrder: CategoryModel[] = [];
      newOrder[0] = this.selectedCategory;

      let restOfItems: CategoryModel[];
      this.categories = this.categories.sort((o1, o2) => {
        if (o1.Ordinal > o2.Ordinal) {
          return 1;
        }
        if (o1.Ordinal < o2.Ordinal) {
          return -1;
        }
        return 0;
      });
      restOfItems = this.categories.filter(x => x.Id != this.selectedCategory.Id);

      this.categories = newOrder.concat(restOfItems);

    }

  }
}