# MockAPI

[**MockAPI**](https://github.com/mihneamanolache/MockAPI) is a powerful mock data API designed to streamline the development and testing of applications by providing dynamic and customizable mock data. Leveraging Express, Faker, and Knex, MockAPI offers a range of tools for generating, creating, and validating mock API endpoints based on predefined schemas.

## Installation
Clone the repository and install the dependencies using npm:
```bash
git clone https://github.com/mihneamanolache/MockAPI
cd MockAPI
npm install
```

## Installation
Compile TypeScript source code to JavaScript, run migrations and start the production server:
```bash
npm run build 
npm run migrate
npm run start:prod
```

## API Endpoints:

### Get Allowed Types
```bash
# GET /getTypes
curl http://localhost:3000/getTypes
```
```json
{
    "types": [
        "datatype.number",
        "datatype.float",
        "datatype.datetime",
        "datatype.string",
        "datatype.uuid",
        "datatype.boolean",
        ....
    ]
}
```

### Check if Schema is Valid
```bash
# POST /checkSchema
curl -X POST -H "Content-Type: application/json" -d '{"location": "location.streetName", "animals": {"lions[]": "animal.lion", "birds[]": "animal.bird"}, "number": "datatype.number", "paths[]": "system.filePath"}' http://localhost:3000/checkSchema
```
```json
{
    "valid": true
}
```

### Create New MockAPI Endpoint
```bash
# POST /createEndpoint
curl -X POST -H "Content-Type: application/json" -d '{"name": "zoo", "method": "GET", "schema": { "location": "location.streetName", "animals": {"lions[]": "animal.lion", "birds[]": "animal.bird", "bears[]": "animal.bear"} }, "is_list": false, "status_code": 200}' http://localhost:3000/createEndpoint
```
```json
{
    "success": "Resource created successfully!"
}
```
**Note**: When the schema key includes `[]`, it generates a list of properties. i.e. if your schema is `{ "lions[]": "animal.lion" }`, MockAPI will return `{ "lions": [<name of lions>] }`

### Access Mock Endpoint
```bash
# <METHOD> /<NAME>
curl http://localhost:3000/zoo
```
```json
{
    "location": "N Franklin Street",
    "animals": {
        "lions": [
            "Northeast Congo Lion",
            "West African Lion",
            "Masai Lion",
            "Transvaal lion",
            "Transvaal lion",
            "Transvaal lion",
            "Masai Lion",
            "Barbary Lion",
            "Barbary Lion",
            "Asiatic Lion"
        ],
        "birds": [
            "White-winged Scoter",
            "Long-tailed Jaeger",
            "Hairy Woodpecker",
            "Bay-breasted Warbler",
            "Western Wood-Pewee",
            "Tropical Kingbird",
            "Dunlin",
            "Black Oystercatcher",
            "Black-backed Woodpecker",
            "Lesser Black-backed Gull"
        ],
        "bears": [
            "Spectacled bear",
            "Polar bear",
            "American black bear",
            "Sloth bear",
            "Polar bear",
            "Sloth bear",
            "American black bear",
            "American black bear",
            "American black bear",
            "Sloth bear"
        ]
    }
}
```

## Dependencies
- Express   - A fast, unopinionated, minimalist web framework for Node.js.
- Faker     - A library for generating fake data such as names, addresses, and phone numbers.
- Knex      - A SQL query builder for Node.js.
- Lodash    - A modern JavaScript utility library delivering modularity, performance, and extras.
- dotenv    - Loads environment variables from a .env file into process.env.

## Demo Usage

![Screen Recording 2024-02-16 at 18 02 09 (2) (1) (4)](https://github.com/mihneamanolache/MockAPI/assets/43548656/1a80a056-c9d6-4bca-83bc-a3e2505d1301)
