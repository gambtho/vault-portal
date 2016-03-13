import {HTTP_PROVIDERS} from 'angular2/http';
import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Headers} from "angular2/http";

@Injectable()
export class AuthFactory {
    token: string;
    url: string;

    constructor(public http: Http) {
        this.token ='';
        this.url = 'http://tg23qo-prod.apigee.net/v1';
    }

    login(username, password) {

        return this.http.post(this.url + '/v1/auth/app-id/login', `app_id=${username}&password=${password}`)
            .map( (responseData) => {
                debugger;
                return responseData.json();
            })
    };

    setToken(string) {
        this.token = string;
    };
    getToken() {
        return this.token;
    }

}
