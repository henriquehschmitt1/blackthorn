# Cart API

This API allows the user to create an item, create a cart and put an item into a cart!

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all the dependencies.

```bash
npm install
```

## Environment

Create a .env file at the project root and refer to [.env.test](https://github.com/henriquehschmitt1/blackthorn/blob/main/.env.test) to fill it with the necessary params

## Routes

### Get routes

-   https://blackthorn-assessment-2022.herokuapp.com/item -> This route will get you all the items in the database.
-   https://blackthorn-assessment-2022.herokuapp.com/cart/${cartId} -> This route will get you all the details about a cart, including its items, by passing the cart id into path.

```bash
{
    Path example:

    https://blackthorn-assessment-2022.herokuapp.com/cart/507f1f77bcf86cd799439011
}
```

### Post routes

-   https://blackthorn-assessment-2022.herokuapp.com/item -> This route will let you create an Item into the database, by passing the item: name, description, stock and price.

```bash
{
    Body example:

    name: 'iphone',
    description: 'really cool phone',
    stock: 5,
    price: 500
}
```

-   https://blackthorn-assessment-2022.herokuapp.com/cart -> This route will let you create a Cart, no params are needed to create a cart.

-   https://blackthorn-assessment-2022.herokuapp.com/cart/fill -> This route will let you insert one item into a cart, by passing the cart id, item id and the item quantity.

```bash
{
    Body example:

    cartId: '507f1f77bcf86cd799439011',
    itemId: '587f1f77bcf86cd799431234',
    quantity: 3
}
```

-   https://blackthorn-assessment-2022.herokuapp.com/checkout/${cartId} -> This route will let you checkOut a cart, calculating the total by applying taxes and, applying any discount if present. This route requires the cart id into path, and, optionally, a discount param on the body.

```bash
{
    Path example:
    https://blackthorn-assessment-2022.herokuapp.com/checkout/507f1f77bcf86cd799439011

    Body example:

    discount: 0.10
}
```

### Put routes

-   https://blackthorn-assessment-2022.herokuapp.com/item/${itemId} -> Thsi route will let you update an item by passing its id into path and the new item: name, description, stock or price.

```bash
{
    Path example:
    https://blackthorn-assessment-2022.herokuapp.com/item/507f1f77bcf86cd799439011

    Body example:
    name: 'iphone 13',
    description: 'really cool phone, but now, cooler',
    stock: 15,
    price: 1000
}
```
