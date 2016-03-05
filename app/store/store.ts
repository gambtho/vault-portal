import {Component} from "angular2/core";
import {StoreData} from './store.factory';
import {AuthFactory} from '../auth/auth.factory';
import {Router, RouteParams} from 'angular2/router';


@Component({
    selector: 'store',
    template: `
    <form name="form" (submit)="store($event)" role="form">
        <div class="form-group">
            <label for="path">Path</label>
            <input type="text" name="path" id="path" class="form-control" [(ngModel)]="path" required/>
        </div>
        <div class="form-group">
            <label for="key">Key</label>
            <input type="text" name="key" id="key" class="form-control" [(ngModel)]="key" required/>
        </div>
        <div class="form-group">
            <label for="value">Value</label>
            <input type="value" name="value" id="value" class="form-control" [(ngModel)]="value" required/>
        </div>
        <div class="form-actions">
            <button type="store" ng-disabled="form.$invalid" class="btn btn-danger">Store</button>
        </div>
    </form>
    `

})

export class Store {
    path: string;
    key: string;
    value: string;
    constructor(public storeData: StoreData, public auth: AuthFactory, public router: Router){}

    store() {
        // if auth.getToken is null, outer.navigate(['Heroes',  {id: heroId, foo: 'foo'} ]);
        console.log(this.key, this.value);
        this.storeData.save(this.key, this.value);
      //  alert('Secret saved - ' + response);
    }
}

