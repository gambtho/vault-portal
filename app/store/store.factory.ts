import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Headers} from "angular2/http";
import {AuthFactory} from '../auth/auth.factory';

@Injectable()
export class StoreFactory {
    api:string;
    url:string;
    token:string;

    constructor(public http:Http, public auth:AuthFactory) {
        this.api = '/secret/';
        this.url = '/v1';
        this.token = auth.getToken();
    }

    save(path, key, value) {
        var headers = new Headers();
        headers.append('X-Vault-Token', this.token);

        return this.http.post(this.url + this.api + path, `{"db_username": "${key}","password": "${value}"}`,
            {headers: headers})
            .map((res) => {
                return res.statusText;
            });
    }
}

