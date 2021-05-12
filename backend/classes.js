class User {
    constructor(name, email, password, isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
      }
}

class Product {
    constructor(name, description, category, brand, image, price, countInStock, rating, numReviews) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.image = image;
        this.price = price;
        this.countInStock = countInStock;
        this.rating = rating;
        this.numReviews = numReviews;
      }
}

class Address {
    constructor(address, city, postalCode, country) {
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }
}

class Payment {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}

class Order extends Product, Payment, User, Address{
    constructor(isPaid, isDelivered, paidAt, deliveredAt) {
        this.isPaid = isPaid;
        this.isDelivered = isDelivered;
        this.paidAt = paidAt;
        this.deliveredAt = deliveredAt;
    }
}