import {Component} from "angular2/core";
import {AuthFactory} from './auth.factory';
import {Router} from 'angular2/router';


@Component({
    selector: 'auth',
    template: `
    <form name="form" ng-submit="login()" role="form">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" class="form-control" ng-model="username" required/>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" ng-model="password" required/>
        </div>
        <div class="form-actions">
            <button type="submit" ng-disabled="form.$invalid" class="btn btn-danger">Login</button>
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
        this.auth.login(this.username, this.password);
            //.then(function (response) {
            //    this.auth.setToken(response);
            //    console.log(response);
            //    //$location.path('/store');
            //}, function (reason) {
            //    this.error = reason;
            //    this.password = '';
            //    alert('Login failure');
            //   // $location.path('/auth');
            //});
    };

}
