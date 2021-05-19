class Product {
    constructor(name, description, category, brand, image, price, countInStock, rating, numReviews, screenResolution, operationSystem, camera, memory, cores, battery) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.image = image;
        this.price = price;
        this.countInStock = countInStock;
        this.rating = rating;
        this.numReviews = numReviews;
        this.screenResolution = screenResolution;
        this.operationSystem = operationSystem;
        this.cores = cores;
        this.memory = memory;
        this.battery = battery;
        this.camera = camera;
    }

    getProductName() {
        return this.name;
    }
    setProductName(newName) {
        this.name = newName;
    }

    getProductInfo() {
        return `Товар ${this.name} находится на складе в количестве: ${this.countInStock}`;
    }
}

class Address {
    constructor(address, city, postalCode, country) {
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.country = country;
    }

    getUserAddress() {
        return `${this.country}, ${this.city}, ${this.address}`
    }

    setPostalCode(newPostalCode) {
        this.postalCode = newPostalCode;
    }
}

class User extends Address{
    constructor(name, email, password, isAdmin) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
      }

      getUserInfo() {
          `${this.name}, ${this.email}`
      }
}

class Payment {
    constructor(paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(newPaymentMethod) {
        this.paymentMethod = newPaymentMethod;
    }
}

class Order extends Product, Payment, User{
    constructor(isPaid, isDelivered, paidAt, deliveredAt) {
        super();
        this.isPaid = isPaid;
        this.isDelivered = isDelivered;
        this.paidAt = paidAt;
        this.deliveredAt = deliveredAt;
    }

    getOrderInfo() {
        return `Оплачено: ${this.isPaid}
        Доставлено: ${this.isDelivered}`
    }
}

function makeIterator(array){
    var nextIndex = 0;
    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}


class PowerArray extends Array {
    constructor(...args) {
        super(...args);
    }

    hasMoreThanTwoItems() {
        return this.length > 2;
    }

    isEmpty() {
        return this.length === 0;
    }

    isPowerArray() {
        return true;
    }
}