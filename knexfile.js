// Update with your cofig settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: "sqlite3",
    connection: {
        filename: "./data.db", 
    },
    useNullAsDefault: true,
};
