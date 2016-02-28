# Vault UI

[![wercker status](https://app.wercker.com/status/545bc24f964b04486cb30defe0bcfa54/m "wercker status")](https://app.wercker.com/project/bykey/545bc24f964b04486cb30defe0bcfa54)

## Features

As an operator, I would like to be able to initialize a new vault
 * initialize a new vault
 * unseal a vault
 * setup app id
 * setup user id
 * setup policy

As a DBA, I would like to
 * login and receive a token
 * save usernames and passwords associated with a userID/appId

## More information on Vault

https://www.vaultproject.io/intro/getting-started/apis.html


## Operator Flow

### Initialize
``` 
curl -X PUT -d "{\"secret_shares\":1, \"secret_threshold\":1}" http://vault.yeti.homedepot.com/v1/sys/init

response {"keys":["d1f1d9150069900f0c896cf9a1504175cce18c702046c83e827550cd9c22f9bf"],"root_token":"c0a62551-bf85-64d8-15b6-01b1178f6b92"}

export VAULT_TOKEN=c0a62551-bf85-64d8-15b6-01b1178f6b92
``` 
### Unseal
``` 
curl -X PUT -d '{"key": "d1f1d9150069900f0c896cf9a1504175cce18c702046c83e827550cd9c22f9bf"}' http://vault.yeti.homedepot.com/v1/sys/unseal

response {"sealed":false,"t":1,"n":1,"progress":0}
``` 
### Setup auth method
``` 
curl -X POST -H "X-Vault-Token:$VAULT_TOKEN" -d '{"type":"app-id"}' http://vault.yeti.homedepot.com/v1/sys/auth/app-id
``` 
### Setup permissions
``` 
on console — vault policy-write pcfpol policy.hcl path "secret/pcfpol" { policy = "write" } path "auth/app-id/map/app-id/*" { policy = "write" } path "auth/app-id/map/user-id/pcf_id" { policy = "write" } path "auth/token/create-orphan" { policy = "write" }
``` 
### Setup policy
``` 
curl -X POST -d '{"value":"pcfpol"}' -H "X-Vault-Token:$VAULT_TOKEN" http://vault.yeti.homedepot.com/v1/auth/app-id/map/app-id/pcf_id
``` 
### Setup ID
``` 
curl -X POST -d '{"value":"pcf_id"}' -H "X-Vault-Token:$VAULT_TOKEN" http://vault.yeti.homedepot.com/v1/auth/app-id/map/user-id/app_id1
``` 
## DB Flow 

### Login
``` 
curl http://vault.yeti.homedepot.com/v1/auth/app-id/login -d '{"app_id":"pcf_id", "user_id":"app_id1"}'

response export VAULT_TOKEN=<<45df5c02-0e94-808b-67c7-a8cda11fb45c>>
``` 
### Save user and password
``` 
curl -X POST -d '{ "db_username":"dbuname1", "db_password":"dbpword1" }' -H "X-Vault-Token:$VAULT_TOKEN" http://vault.yeti.homedepot.com/v1/secret/app_id1
``` 
## Dev Flow

###  initial login by service, response includes policy and token 

```
curl http://vault.yeti.homedepot.com/v1/auth/app-id/login -d '{"app_id":"pcf_id", "user_id":"app_id1"}' (export VAULT_TOKEN=) 
```

### mapping of dynamic app value to policy by service 

```
curl -X POST -d '{"value":""}' -H "X-Vault-Token:" http://vault.yeti.homedepot.com/v1/auth/app-id/map/app-id/app_dv
```

### mapping of dynamic app value to user id 

```
curl -X POST -d '{"value":"app_dv"}' -H "X-Vault-Token:$VAULT_TOKEN" http://vault.yeti.homedepot.com/v1/auth/app-id/map/user-id/pcf_id
```

### login by todd svc using dynamic app value, response includes token 
```
curl http://vault.yeti.homedepot.com/v1/auth/app-id/login -d '{"app_id":"app_dv", "user_id":"pcf_id"}'
```

### creation of 1 time use token for application by service 
```
curl -X POST -d '{"num_uses":"1", "ttl":"1m", "no_default_profile":"true"}' -H "X-Vault-Token:" http://vault.yeti.homedepot.com/v1/auth/token/create-orphan
```
### revoke of token

```
f. curl -X POST -H "X-Vault-Token:" http://vault.yeti.homedepot.com/v1/auth/token/revoke-self
```
### application can get password using 1 time use token

```
curl http://vault.yeti.homedepot.com/v1/secret/pcfpol -H "X-Vault-Token:"
```

## Project Setup 

```
npm install
```

### Run the Application

```
npm start
```

* `http://localhost:8000/app/index.html`

### Running Unit Tests

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

For live testing of changes:

```
npm run test-watch
```


Single run of the test

```
npm test
```


### End to end testing

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

```
npm start
npm run update-webdriver
npm run protractor
```

### Running the App in Production

All you need in production are all the files under the `app/` directory. Everything else should be omitted.




