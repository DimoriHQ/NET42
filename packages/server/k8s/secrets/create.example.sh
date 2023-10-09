
hash() {
  echo $(echo "$1" | tr -d '\n' | base64)
}

export ENV=$(hash production)
export NAMESPACE_RAW=production

export PRODUCTION=$(hash true)

# host
export MONGODB_URL=$(hash "mongodb://localhost:27017")


# gen
envsubst < ./secrets.template.yml > gen.secrets-${NAMESPACE_RAW}.yml
