# MockAPI

![Use MockAPI For Free](https://github.com/mihneamanolache/MockAPI/assets/43548656/8fad3cab-b871-4584-86b1-ff16f6e7fd44)

## NEW: Free Hosted API
Accelerate your development process by leveraging MockAPI's *FREE hosted service at https://api.mockapi.xyz/*. Check out usage examples below.

*Note: A captivating front-end experience is on the horizon, enhancing your MockAPI journey even further.*

If you find MockAPI valuable and wish to support its servers and maintenance, you can show your appreciation by buying me a coffee! Your support goes a long way in ensuring the continued availability and improvement of this free service. Cheers to building amazing projects together!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/mihnea.dev)


[**MockAPI**](https://github.com/mihneamanolache/MockAPI) is a powerful mock data API designed to streamline the development and testing of applications by providing dynamic and customizable mock data. Leveraging Express, Faker, and Knex, MockAPI offers a range of tools for generating, creating, and validating mock API endpoints based on predefined schemas.

## Quick start
Get started with MockAPI by cloning the repository and installing dependencies using npm:
```bash
git clone https://github.com/mihneamanolache/MockAPI
cd MockAPI
npm install
```

Next, compile TypeScript to JavaScript, run migrations, and start the server:
```bash
npm run build 
npm run migrate
npm run start:prod
```

## Available Endpoints:
MockAPI comes with three predefined endpoints and allows you to create as many custom ones as needed:
- `GET /getTypes`           - get available mock data types (from FakerJS)
- `POST /checkSchema`       - test if your schema is valid before creating a new route
- `POST /createEndpoint`    - create a new mock API route

If no `PORT` variable is defined, the default port is 3000, and you can access the API at `http://localhost:3000`:

### Getting Data Types
To access available data types from FakerJS:
```bash
curl http://localhost:3000/getTypes
```
Response:
```json
{
    "types": [
        "datatype.number",
        "datatype.float",
        "datatype.datetime",
        "datatype.string",
        "datatype.uuid",
        "datatype.boolean",
        "...."
    ]
}
```

### Validating Your Schema
Before creating a new mock API route, test if the schema is valid with a POST request:
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
  "location": "location.streetName",
  "animals": {
    "lions[]": "animal.lion",
    "birds[]": "animal.bird"
  },
  "number": "datatype.number",
  "paths[]": "system.filePath"
}' http://localhost:3000/checkSchema
```
Response:
```json
{
    "valid": true
}
```

### Creating a New Endpoint
Use the POST /createEndpoint route to create a new mock API route. Provide a payload adhering to the `IResource` interface:
```typescript
IResource {
    name:           string;     // ie. "zoo" || "api/zoo" || "api/zoos/my-zoo"
    method?:        HttpMethod; // GET | POST | PUT etc.
    schema:         JSON;       // JSON object
    is_list?:       boolean;    // Should the schema be returned as a list?
    status_code:    number      // HTTP response status code
}
```
**Notes:** 
- If`is_list` flag is enabled, the response will consist of an array containing replicated schema instances.
- If your schema key includes `[]`, MockAPI will intelligently generate a list of properties. For example, if your schema is `{ "lions[]": "animal.lion" }`, the response from MockAPI will be in the format `{ "lions": [<race>, <race>...] }`.

Example:
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{
  "name": "zoo",
  "method": "GET",
  "schema": {
    "location": "location.streetName",
    "animals": {
      "lions[]": "animal.lion",
      "birds[]": "animal.bird",
      "bears[]": "animal.bear"
    }
  },
  "is_list": false,
  "status_code": 200
}' http://localhost:3000/createEndpoint
```
```json
{
    "success": "Resource created successfully!"
}
```

### Accessing Your Endpoint
Upon successful creation, you can access the newly added route at `http://localhost:3000/<name>`.
Example:
```bash
curl http://localhost:3000/zoo
```
Response:
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

Feel free to explore and contribute to the project!
