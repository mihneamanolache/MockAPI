exports.up = function (knex) {
    return knex.transaction(async (trx) => {
        // Create projects table
        await trx.schema.createTable("projects", function (table) {
            table.increments("id");
            table.string("name");
            table.timestamps();
        });

        // Create resources table
        await trx.schema.createTable("resources", function (table) {
            table.increments("id");
            table.string("name");
            table.enum("method", ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"]);
            table.json("schema");
            table.integer("projectId").references("id").inTable("projects");
            table.timestamps();
        });

        // Add timestamp column to resources
        await trx.schema.table("resources", function (table) {
            table.timestamp("validUntil").nullable();
        });

        // Alter resources table
        await trx.schema.table("resources", function (table) {
            table.string("name").notNullable().alter();
            table.enum("method", ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"]).notNullable().alter();
            table.json("schema").notNullable().alter();
        });

        // Add is_list column to resources
        await trx.schema.table("resources", function (table) {
            table.boolean("is_list").notNullable().defaultTo(false);
        });

        // Create api_keys table
        await trx.schema.createTable("api_keys", function (table) {
            table.increments("id").primary();
            table.string("api_key", 32).unique().notNullable();
            table.json("permissions").nullable();
        });

        // Add valid_until column to api_keys
        await trx.schema.alterTable("api_keys", function (table) {
            table.timestamp("valid_until").defaultTo(knex.fn.now());
        });

        // Rename resources to endpoints
        await trx.schema.renameTable("resources", "endpoints");

        // Rename endpoints to routes
        await trx.schema.renameTable("endpoints", "routes");

        // Alter routes table
        await trx.schema.alterTable("routes", function (table) {
            table.integer("status_code").defaultTo(200);
        });
    });
};

exports.down = function (knex) {
    return knex.transaction(async (trx) => {
        // Drop routes table
        await trx.schema.dropTableIfExists("routes");

        // Rename routes to endpoints
        await trx.schema.renameTable("routes", "endpoints");

        // Rename endpoints to resources
        await trx.schema.renameTable("endpoints", "resources");

        // Drop api_keys table
        await trx.schema.dropTableIfExists("api_keys");

        // Drop resources table
        await trx.schema.dropTableIfExists("resources");

        // Drop projects table
        await trx.schema.dropTableIfExists("projects");
    });
};

