# Vault UI

[![wercker status](https://app.wercker.com/status/545bc24f964b04486cb30defe0bcfa54/m "wercker status")](https://app.wercker.com/project/bykey/545bc24f964b04486cb30defe0bcfa54)

## Features

 * login and receive a token
 * save keys and values securely

## More information on Vault

https://www.vaultproject.io/intro/getting-started/apis.html

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

### Vault Setup Notes

* seed.sh
* vault.conf
* curl -s -H "X-Vault-Token: $CLIENT_TOKEN $VAULT_URL/v1/secret/some-secret-namespace/db | jq '.'
