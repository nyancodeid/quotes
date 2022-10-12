# Welcome to 'Quotes' contributing guide

## Development
To start development we need to first install the required npm package by `npm install` or `yarn`.

``` bash
# install package dependencies
$ npm install

# Generate Quotes (Development Only)
$ npm run generate:quotes

# Run Development Server
$ npm run dev
```

In order for quotes to be used/consumed by the website, therefore we need to *generate* our quotes into a single file with `JSON` format. You do this by running the command `npm run generate:quotes`. This command is needed every time we change our YAML file.

To see the version of the website you can run the command `npm run dev` to run the web server in development mode running on port `localhost:3000`.


## Getting Started
We open the opportunity to enliven the Hacktoberfest 2021 event by contributing to add features and fix bugs that may be reported on the issues repository page, or help us by adding your own quotes.

You can start contributing by creating quotes or adding quotes of characters you like into the `[your-github-username].yaml` file (*this file name must match your github username*) in the `quotes/` folder. Make sure your github username exists and is written correctly.

For the file format we use YAML, and make sure the writing format is the same. Each user is only allowed to change his own file. If there is a writing error in another user's file you can help him by making an `issue`.

```yaml
username: nyancodeid
quotes:
  - text: 'The best among you are those with the most noble character.'
    author: 'Ali bin Abi Talib'
    author_detail_url: 'https://en.wikipedia.org/wiki/Ali_bin_Abi_Thalib'
    created_at: 'October 3, 2021'
  - text: 'Live humbly, no matter how rich you are.'
    author: 'Ali bin Abi Talib'
    author_detail_url: 'https://en.wikipedia.org/wiki/Ali_bin_Abi_Thalib'
    created_at: 'October 3, 2021'
```

> `author_detail_url` this is additional information for `author`. Preferably taken from the website (wiki) wikipedia, linkedin, or wiki fansbase whose purpose is to refer to the complete biographical detail behind the author.

Note : Make sure you only commit the `.yaml` file if your goal is to contribute to add/submit quotes.
