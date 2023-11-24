# nextjs-auth-playground

## setup

tl;dr: `.scripts/up.sh`

### namespace

```sh
kubectl create namespace openfga --dry-run=client -o yaml | kubectl apply -f -
```

```sh
helm repo add openfga https://openfga.github.io/helm-charts
helm upgrade --install openfga openfga/openfga -f openfga/values.yaml -n openfga
```

### port-forward

```sh
kubectl port-forward svc/openfga 8080 -n openfga
kubectl port-forward svc/openfga 13000:3000 -n openfga
```

## dev

First, run the development server:

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## tips

### list all routes

```sh
$ yarn run list-routes

--- Routes ---
/api/hello
/api/session
/api/wall
/api/[document]/read
/api/[document]/write
/api/auth/[auth0]
--- API Routes ---
/hello
/session
/wall
/[document]/read
/[document]/write
/auth/[auth0]
```

### test openfga model

```sh
$ yarn run openfga:seed
$ yarn run test:openfga
```

## cleanup

tl;dr: `.scripts/down.sh`

```sh
helm uninstall openfga -n openfga
kubectl delete pvc --all -n openfga
kubectl delete namespace openfga
```
