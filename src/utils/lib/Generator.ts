import { faker, Faker } from "@faker-js/faker";
import _ from "lodash";

/**
 *  Utility class for generating fake data based on a provided schema using the Faker library.
 */
export class Generator {
    /**
     *  The Faker instance for generating fake data.
     *  @type {Faker}
     */
    public faker:           Faker;
     /**
     *  An array of allowed types for schema generation.
     *  @type {string[]}
     */
    public allowed_types:   string[] = [];
    /**
     *  The current schema used for generation.
     *  @type {Record<string, unknown>}
     */
    public schema:          Record<string, unknown> = {};

    /**
     * Constructs a new instance of the Generator class.
     */
    constructor() {
        this.faker = faker;
        this.get_allowed_types_from_faker(this.faker);
    }

    /**
     *  Retrieves allowed types from the Faker instance and populates the `this.allowed_types` array.
     *  @param { Faker } faker - The Faker instance.
     *
     *  @protected
     */
    protected get_allowed_types_from_faker(faker: Faker): void {
        for (const property of Object.getOwnPropertyNames(faker)) {
            if (
                !property.includes("_") &&
                property !== "definitions" &&
                property !== "rawDefinitions" &&
                property !== "helpers"
            ) {
                for (const subProperty of Object.getOwnPropertyNames(faker[property])) {
                    if (subProperty !== "faker") {
                        try {
                            faker.helpers.fake(
                                `{{${property}.${subProperty}}}`
                            );
                            this.allowed_types.push(
                                `${property}.${subProperty}`
                            );
                        } catch (e: unknown) { 
                            console.error(`Method failed to fake: ${(<Error>e).message}`); 
                        }
                    }
                }
            }
        }
    }

    /**
     *  Gets the array of allowed types.
     *  @type { string[] }
     */
    public get get_allowed_types(): string[] {
        return this.allowed_types;
    }

    /**
     *  Validates a provided schema against the allowed types.
     *  @param { Record<string, any> } schema - The schema to validate.
     *
     *  @returns { boolean } - True if the schema is valid, otherwise false.
     */
    public check_schema(schema: Record<string, any>): boolean {
        for (const field in schema) {
            const property: string = schema[field];
            if (typeof property === "object") this.check_schema(property);
            else {
                if (!this.allowed_types.includes(property.split("(")[0].replace("[]", ""))) 
                    throw new Error(`Type '${property}' not allowed`);
            }
        }
        return true;
    }

    /**
     *  Generates fake data based on the provided schema.
     *  @param { Record<string, any> } schema - The schema for data generation.
     *  
     *  @returns { Record<string, any> } - The generated fake data.
     */
    public generate(schema: Record<string, any>): Record<string, any> {
        /**
         *  Populates a property with fake data based on the provided type.
         *  @param { string } property  - The property name.
         *  @param { string } type      - The data type.
         */
        const populate: (property: string, type: string) => void = (property: string, type: string): void => {
            if (!this.allowed_types.includes(type.split("(")[0].replace("[]", ""))) 
                throw new Error(`Type '${type}' not allowed`);
            /**
             *  You can declare a key's type as a list by adding [] in its name. 
             *      i.e. if your schema is { "lions[]": "animal.lion", }
             *      MockAPI will return { "lions": [<name of lions>] }
             *
             *  TODO:
             *      - [] Maybe replace hardcoded 10 which always creates a list of length 10
             */
            if (type.includes("[]") || property.includes("[]")) {
                delete schema[property];
                property = property.replace("[]", "");
                schema[property] = [];
                for (let i: number = 0; i < 10; i++) {
                    schema[property.replace("[]", "")].push(
                        this.faker.helpers.fake(`{{${type}}}`)
                    );
                }
            } else {
                schema[property] = this.faker.helpers.fake(`{{${type}}}`);
            }
        };

        for (const field in schema) {
            const property: any = schema[field];
            if (typeof property === "object") {
                if (field.includes("[]")) {
                    const arrayField: string = field.replace("[]", "");
                    delete schema[field];
                    schema[arrayField] = Array.from({ length: 10 }, () => this.generate(_.cloneDeep(property)));
                }
                this.generate(property);
            } else {
                populate(field, property);
            }
        }

        return schema;
    }
}
