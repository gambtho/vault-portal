import {HTTP_PROVIDERS} from 'angular2/http';
import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Headers} from "angular2/http";
import {AuthFactory} from '../auth/auth.factory';

@Injectable()
export class StoreData {
    path:string;
    api:string;
    url:string;
    token:string;

    constructor(public http:Http, public auth:AuthFactory) {
        this.path = 'some-secret-namespace/db';
        this.api = '/v1/secret/';
        this.url = 'http://tg23qo-prod.apigee.net/v1';
        this.token = auth.getToken();
    }

    save(key, value) {
        var headers = new Headers();
        headers.append('X-Vault-Token', this.token);

        return this.http.post(this.url + this.api + this.path,
            `
            {
                "db_username": "${key}"
                "password": "${value}"
            }
            `,
            {headers: headers})
            .map((res) => {
                return res.json();
            });
    }
}

