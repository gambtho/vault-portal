import {Component, Injectable, Input} from "angular2/core";
import {AuthFactory} from './auth.factory';
import {Router} from 'angular2/router';
import 'rxjs/add/operator/map';

@Injectable()
@Component({
    selector: 'auth',
    template: `
    <form name="form" (submit)="login($event)" role="form">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" name="key" id="username" class="form-control" [(ngModel)]="username" required/>
        </div>
        <div class="form-group">
            <label for="password">Value</label>
            <input type="password" name="password" id="password" class="form-control" [(ngModel)]="password" required/>
        </div>
        <div class="form-actions">
            <button type="login" ng-disabled="form.$invalid" class="btn btn-danger">Login</button>
        </div>
    </form>
    `

})

export class Auth {
    username:string;
    password:string;

    constructor(public auth:AuthFactory, public router:Router) {
        this.username ='pcf-space-id';
        this.password ='pcf-service-instance-id';
    }

    
    login() {
        this.auth.login(this.username, this.password)
            .subscribe(
                res => this.validateAuth(res),
                err => this.reset(err)
            );
    };
    
    validateAuth(res) {
        this.auth.setToken(res);
        this.router.navigate(['Store']);
    }

    reset(err) {
        alert("login failed" + err);
        this.router.navigate(['Auth']);
    }

}
