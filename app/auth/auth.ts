import {Component} from "angular2/core";
import {AuthFactory} from './auth.factory';
import {Router} from 'angular2/router';


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
    username: string;
    password: string;
    error: string;
    url: string;

    constructor(public auth: AuthFactory, public router: Router){
        this.url = 'http://tg23qo-prod.apigee.net/v1';
    }

    //username   = 'pcf-space-id';
    //password  = 'pcf-service-instance-id';

    login() {
        this.auth.login(this.username, this.password)
            .subscribe(res => this.validateAuth(res));
    };

    validateAuth(res) {
        console.log(res);
        this.auth.setToken(res);
        console.log('token set');
        this.router.navigate(['Store']);
        //if res.token - reset password
        // $location.path('/auth');
    }

}
