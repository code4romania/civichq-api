import { Pipe, PipeTransform } from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
    name: 'CategoryPipe'
})
export class CategoryPipe {
    transform(apps, category) {
        let category_name = category;
        return apps.filter(app => {
            return app.CategoryName == category_name;
        });

    }

}