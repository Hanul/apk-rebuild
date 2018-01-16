#!/usr/bin/env node

require('uppercase-core');

INIT_OBJECTS();

RUN(() => {
	
	let Co = require('co');
	let Prompt = require('hanul-co-prompt');
	let Program = require('commander');
	
	let packageInfo = PARSE_STR(READ_FILE({
		path : __dirname + '/package.json',
		isSync : true
	}).toString());
	
	let apkresign = require('./index.js');
	
	Program
		.version(packageInfo.version)
		.arguments('<SOURCE_FILE_PATH> <KEYSTORE_PATH> <KEYSTORE_ALIAS>')
		.action((SOURCE_FILE_PATH, KEYSTORE_PATH, KEYSTORE_ALIAS) => {
			
			Co(function *() {
				let KEYSTORE_PASSWORD = yield Prompt.password('키스토어 비밀번호: ');
				apkrebuild(SOURCE_FILE_PATH, KEYSTORE_PATH, KEYSTORE_ALIAS, KEYSTORE_PASSWORD);
			});
		});
	
	Program.parse(process.argv);
});

