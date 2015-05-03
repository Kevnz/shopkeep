Shopkeep
===

### Ecommerce solution includes storefront/POS/backoffice.

Full ecommerce/store solution. Still a work in progress.

### Development

#### Generate a model

```
npm run model -- -m Invoice customer:string lineItems:array dateCreated:date status:object
```

#### Generate a component based on a model
##### options

* -a - The app, shopping, pos, or backoffice
* -c - The component, reads the schema of corrisponding model

```
npm run component -- -a shopping -c customer
```

### Testing
```
npm test
```

### Tasks
```
npm run build
npm run migrate-up
npm run migrate-down
npm run migrate-add
```

### Sections
The application consists of three sections, the ecommerce app, the point-of-sale app, and the back office app. In addition a mobile app is in development for the ecom app.
