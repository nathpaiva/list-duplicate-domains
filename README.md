# List duplicate domains with Vanilla TS

This project creates two lists based on an input data. The first will be the list of all the URLs that have a duplicate `spam_score`, and the second will be a list of all the URLs with a duplicate `domain_authority`.

Example: The following simplified data would return the following JSON object:

## Question

You will be given a large set of data with the following JSON format in `data.json`

```
{
  "idina_response":{
    "sources":[
      {
        "url":"example.com",
        "spam_score": 1,
        "matching_target_indexes":[
          0
        ],
        "matching_source_urls":[
          {
            "url":"example.com/news/current/",
            "page_authority":44
          }
        ],
        "domain_authority":95
      },
      // ...
    ]
  }
}
```

###### Example Data

```
{
  "idina_response":{
    "sources":[
      {
        "url":"example.com",
        "spam_score": 1,
        "domain_authority":95
      },
      {
        "url":"foo.com",
        "spam_score": 2,
        "domain_authority":100
      },
      {
        "url":"bar.com",
        "spam_score": 1,
        "domain_authority":100
      },
      {
        "url":"baz.com",
        "spam_score": 1,
        "domain_authority":12
      },
      {
        "url":"qux.com",
        "spam_score": 2,
        "domain_authority":401
      },
      {
        "url":"moz.com",
        "spam_score": 186,
        "domain_authority":99
      },
    ]
  }
}
```

###### Example output

```
{
  "duplicate_spam_scores": [
    "example.com",
    "bar.com",
    "foo.com",
    "baz.com",
    "qux.com"
  ],
  "duplicate_domain_authorities": [
    "foo.com",
    "bar.com"
  ]
}
```

---

## Project developed with:

- Typescript
- HTML
- CSS - SASS

## Test developed with:

- [Jest](https://jestjs.io/)

## To run the project you need to install:

- [Node](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) or NPM (already installed with the node)

### And clone the repository

```sh
$ git clone git@github.com:nathpaiva/form-rendering.git
```

## Before starting the project you must install the dependencies:

```sh
$ yarn
```

```sh
$ npm install
```

## To start the project you must run the command:

```sh
$ yarn start
```

```sh
$ npm start
```

- This command to access [http://localhost:2000](http://localhost:2000)

## If you want to run the tests

```sh
$ yarn test
```

```sh
$ npm test
```

## To build the project, by running the command

```sh
$ yarn build
```

```sh
$ npm run build
```
