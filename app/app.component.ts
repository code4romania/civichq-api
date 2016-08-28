import { Component } from '@angular/core';
import { Router }     from '@angular/router';

@Component({
  selector: 'civiqhq-app',
  templateUrl: 'app/app.component.html'
})

export class AppComponent { 
    title = 'Centrul civic';

    constructor(private router: Router){

    }

  search(src: string){

    this.router.navigate(['/search', src]);

  }

}
