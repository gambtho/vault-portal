#!/bin/bash
PATH=".:$PATH"
command -v jq >/dev/null 2>&1 || {
  echo "Download jq";
  curl -sLo jq \
    https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64
  chmod +x jq
}

# initialize vault
vault_init=$(
  curl -s -X PUT -d '{
    "secret_shares": 1,
    "secret_threshold": 1
  }' $VAULT_URL/v1/sys/init
)

export VAULT_KEY=$(jq '.keys[0]' <<< "$vault_init")
export VAULT_TOKEN=$(jq -r '.root_token' <<< "$vault_init")
echo $VAULT_KEY
echo $VAULT_TOKEN

# unseal the vault!
curl -s -X PUT \
  -d '{
    "key": '"$VAULT_KEY"'
  }' $VAULT_URL/v1/sys/unseal

# enable app-id auth-backend
curl -s -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d '{
    "type": "app-id"
  }' $VAULT_URL/v1/sys/auth/app-id


# create a policy
curl -s -X PUT \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -d '{
    "rules": "path \"secret/some-secret-namespace/*\" {\n  policy = \"write\"\n}\n\npath \"auth/app-id/map/app-id/*\" { \n  policy = \"write\"\n}\n\npath \"auth/app-id/map/user-id/pcf-space-id\" {\n policy = \"write\"\n}\n\npath \"auth/token/create-orphan\" {\n policy = \"write\"\n}\n"
  }' $VAULT_URL/v1/sys/policy/pcfpol

# lookup that policy
echo PCFPOL:
curl -s -H "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_URL/v1/sys/policy/pcfpol | jq '.'


# map `pcf-space-id` app
curl -s -X POST \
  -d '{"value":"pcfpol"}' \
  -H "X-Vault-Token:$VAULT_TOKEN" \
  $VAULT_URL/v1/auth/app-id/map/app-id/pcf-space-id

# map `pcf-service-instance-id` user
curl -s -X POST \
  -d '{"value":"pcf-space-id"}' \
  -H "X-Vault-Token:$VAULT_TOKEN" \
  $VAULT_URL/v1/auth/app-id/map/user-id/pcf-service-instance-id



# login as that pcf-space-id/pcf-service-instance-id
LOGIN_INFO=$(
curl -s \
  -d '{
    "app_id": "pcf-space-id",
    "user_id":"pcf-service-instance-id"
  }' \
  $VAULT_URL/v1/auth/app-id/login
)

echo LOGIN_INFO
echo $LOGIN_INFO | jq '.'

CLIENT_TOKEN=$(
jq -r '.auth.client_token' <<< "${LOGIN_INFO}"
)

echo CLIENT_TOKEN
echo $CLIENT_TOKEN

curl -s -X POST \
  -d '{ "db_username":"dbuname1", "db_password":"dbpword1" }' \
  -H "X-Vault-Token: $CLIENT_TOKEN" \
  $VAULT_URL/v1/secret/some-secret-namespace/db
  # $VAULT_URL/v1/secret/pcf-service-instance-id

curl -s \
  -H "X-Vault-Token: $CLIENT_TOKEN" \
  $VAULT_URL/v1/secret/some-secret-namespace/db | jq '.'
