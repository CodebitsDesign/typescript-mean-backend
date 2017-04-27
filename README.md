# Installation

```bash
$ git clone https://github.com/CodebitsDesign/typescript-mean-backend.git <project-name>
$ cd <project-name>
$ yarn install
```

# Run
Make sure you have typescript installed, then run:

```bash
yarn start
```

# Test
```
yarn test
```

# Database
When you first run this project, it will connect to a remote MongoDB instance I have setup so this project can be run with minimal overhead. However, I advise you to create your own `<project>/properties/local.properties.json` and `<project>/properties/test.properties.json`, since the remote mongo instance is cleaned on a regular basis.
