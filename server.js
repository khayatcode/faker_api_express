const express = require("express");
const { faker } = require('@faker-js/faker');
const app = express();
const port = 8000;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

const users = []
const companies = []

const createUser = () => {
    const newFake = {
        id: faker.database.mongodbObjectId(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number()
    };
    return newFake;
};

const createCompany = () => {
    const newFake = {
        id: faker.database.mongodbObjectId(),
        name: faker.company.name(),
        address: [faker.address.street(), faker.address.city(), faker.address.state(), faker.address.zipCode(), faker.address.country()],
    };
    return newFake;
};

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.get("/api/companies", (req, res) => {
    res.json(companies);
});


app.post("/api/users/new", (req, res) => {
    const newFakeUser = createUser();
    users.push(newFakeUser)
    res.json({Status: "Success", user: newFakeUser});
});

app.post("/api/companies/new", (req, res) => {
    const newFakeCompany = createCompany();
    companies.push(newFakeCompany)
    res.json({Status: "Success", company: newFakeCompany});
});

app.post("/api/users/companies", (req, res) => {
    const newFakeUser = createUser();
    const newFakeCompany = createCompany();
    users.push(newFakeUser)
    companies.push(newFakeCompany)
    res.json({Status: "Success", user: newFakeUser, company: newFakeCompany});
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );
