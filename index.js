const os = require('os');
const ip = require('ip');
const getTaggedPrefix = require('./get-tagged-prefix');

process.env.PREFIXES = process.env.PREFIXES || '';

class Info {
	static get ip() {
		return ip.address();
	}

	static get host() {
		return os.hostname();
	}

	static get name() {
		return process.env.SERVICE_NAME;
	}

	static get port() {
		return Number(process.env.SERVICE_PORT);
	}

	static get prefixesEnvAsArray() {
		return process.env.PREFIXES.split(',');
	}

	static get prefixes() {
		return Info.prefixesEnvAsArray;
	}

	static get tags() {
		return Info.prefixesEnvAsArray.map(getTaggedPrefix);
	}

	static get uri() {
		let protocol = 'http';

		if (Info.port === 443) {
			protocol = 'https';
		}

		return `${protocol}://${Info.ip}:${Info.port}`;
	}

	static get check() {
		return {
			http: `${Info.uri}/${Info.name}/health`,
			interval: '10s'
		};
	}

	static get consul() {
		return {
			configuration: {
				host: process.env.CONSUL_HOST,
				port: process.env.CONSUL_PORT,
				promisify: true
			},
			description: {
				name: `${Info.name}:${Info.host}`,
				address: Info.ip,
				port: Info.port,
				tags: Info.tags,
				check: Info.check
			}
		};
	}
}

module.exports = Info;
