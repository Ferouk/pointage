# Pointage API

## Preparing
To change MongoDB Datebase URL for **test**, **dev** and **prod** environments:

**(test, dev, prod).env :**
```
DB_URI=<Your MongoDB database URL HERE>
```

By default, DB_URI point to docker mongo container :
```
mongodb://db_mongo/<Database Name>
```

## Running
```bash
# Run docker container
$ npm run docker
```

## Endpoints
### API: /api
* **Create Employee : /api/employee (POST)** body: {name: string, firstName: string, department:string} (return employee)
* **Get Employees : /api/employee (GET)** (return employee[])
* **Check in : /api/pointage/check-in (POST)** body: {employee: string, comment: string} (return check)
* **Check out : /api/pointage/check-out (POST)** body: {employee: string, comment: string} (return check)

### Docs : /api/docs


## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```