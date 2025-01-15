class User {
    constructor(name, email, age, password) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
    }

    isNonEmpty

    isAdult() {
        return this.age >= 18;
    }   
}
module.exports = User;