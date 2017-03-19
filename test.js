import os from 'os';
import ip from 'ip';
import test from 'ava';
import getTaggedPrefix from './get-tagged-prefix';
import Info from './';

test('Info.host', t => {
	t.true((Info.host === os.hostname()), 'Info.host returns actual hostname.');
});

test('Info.ip', t => {
	t.true((Info.ip === ip.address()), 'Info.ip returns actual ip address.');
});

test('Info.name', t => {
	process.env.SERVICE_NAME = 'SERVICE_NAME';

	t.true((Info.name === process.env.SERVICE_NAME), 'Info.name returns SERVICE_NAME environment variable value.');
});

test('Info.port', t => {
	process.env.SERVICE_PORT = '1000';

	t.true((Info.port === Number(process.env.SERVICE_PORT)), 'Info.port returns SERVICE_PORT environment variable value as integer.');
});

test('Info.prefixes', t => {
	process.env.PREFIXES = '/test,/test2';

	t.deepEqual(Info.prefixes, process.env.PREFIXES.split(','), 'Info.port returns PREFIXES environment variable value as array.');
});

test('Info.tags', t => {
	process.env.PREFIXES = '/test,/test2';

	t.deepEqual(Info.tags, process.env.PREFIXES.split(',').map(getTaggedPrefix), 'Info.tags returns PREFIXES environment variable value as array, mapped with the urlprefix.');
});

test('Info.uri as http', t => {
	process.env.PREFIXES = '/test,/test2';
	process.env.SERVICE_PORT = '3000';

	t.deepEqual(Info.uri, `http://${ip.address()}:${process.env.SERVICE_PORT}`, 'Info.uri returns Http URI.');
});

test('Info.uri as https', t => {
	process.env.PREFIXES = '/test,/test2';
	process.env.SERVICE_PORT = '443';

	t.deepEqual(Info.uri, `https://${ip.address()}:${process.env.SERVICE_PORT}`, 'Info.uri returns Https URI.');
});

test('Info.check as http', t => {
	process.env.SERVICE_NAME = 'test';
	process.env.SERVICE_PORT = '3000';

	let expected = {
		http: `http://${ip.address()}:${process.env.SERVICE_PORT}/${process.env.SERVICE_NAME}/health`,
		interval: '10s'
	};

	t.deepEqual(Info.check, expected, 'Info.check returns Healthcheck object as http.');
});

test('Info.check as https', t => {
	process.env.SERVICE_NAME = 'test';
	process.env.SERVICE_PORT = '443';

	let expected = {
		http: `https://${ip.address()}:${process.env.SERVICE_PORT}/${process.env.SERVICE_NAME}/health`,
		interval: '10s'
	};

	t.deepEqual(Info.check, expected, 'Info.check returns Healthcheck object as https.');
});

test('Info.consul', t => {
	process.env.CONSUL_HOST = 'consul';
	process.env.CONSUL_PORT = '8500';

	let expected = {
		configuration: {
			host: 'consul',
			port: '8500',
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

	t.deepEqual(Info.consul, expected, 'Info.consul returns Consul Connection object.');
});
