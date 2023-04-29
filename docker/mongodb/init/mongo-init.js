db.createUser(
    {
        user: "backend",
        pwd: "supersecret",
        roles: [
            {
                role: "readWrite",
                db: "familia"
            }
        ]
    }
);

db.createCollection("configuration");
db.configuration.insertOne({
    name: "tree",
    currentRootId: 2
});

db.createCollection("user");
db.configuration.insertOne({
    email: "admin",
    password: "$2a$12$J4jFaOw.gTf5BzVfbJn1JuG9S09jni5R/l47GOj0TpakEmUCDyuoW",
    roles: ["USER, ADMIN"]
});
db.configuration.insertOne({
    email: "test",
    password: "$2a$12$tiZHFlu/Zc.r2JiuclD9ceLc05JrapEnHdJidt5D1OMzEJJzY5evO",
    roles: ["USER"]
});

