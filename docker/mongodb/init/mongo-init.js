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