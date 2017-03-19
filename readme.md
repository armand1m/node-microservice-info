# microservice-info [![Build Status](https://travis-ci.org/armand1m/microservice-info.svg?branch=master)](https://travis-ci.org/armand1m/microservice-info) [![Coverage Status](https://coveralls.io/repos/github/armand1m/microservice-info/badge.svg?branch=master)](https://coveralls.io/github/armand1m/microservice-info?branch=master)

> This module returns the necessary info from the server to connect a Node.js microservice into the armand1m/microservices environment.

## Install

```
$ npm install --save microservice-info
```


## Usage

```js
const Info = require('microservice-info');

Info.host();
//returns host name=> 'server-name'

Info.ip();
// returns host ip => '127.0.0.1'

Info.consul();
// returns consul configuration and description for clients to connect:

/*

{
	configuration: {
		host: process.env.CONSUL_HOST,
		port: process.env.CONSUL_PORT,
		promisify: true
	},
	description: {
		name: `${Info.name}:${Info.host}`,
		address: Info.host,
		port: Info.port,
		tags: Info.tags,
		check: Info.check
	}
};

*/
```


## API

### microserviceInfo(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

MIT © [Armando Magalhães](http://armand1m.herokuapp.com)
