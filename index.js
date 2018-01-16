module.exports = (SOURCE_FILE_PATH, KEYSTORE_PATH, KEYSTORE_ALIAS, KEYSTORE_PASSWORD) => {
	
	let exec = require('child_process').exec;
	let Path = require('path');
	
	let basename = Path.basename(SOURCE_FILE_PATH, '.apk');
	
	NEXT([
	(next) => {
		
		console.log('apk 파일을 디컴파일 합니다.');
	
		exec('java -jar ' + __dirname + '\\apktool_2.3.1.jar d ' + SOURCE_FILE_PATH, (error, stdout, stderr) => {
			if (error !== TO_DELETE) {
				
				let message = stdout;
				if (message === '') {
					message = stderr;
				}
				
				SHOW_ERROR('명령 실행', message);
			}
			
			else {
				
				console.log('apk 파일 디컴파일 완료');
				
				next();
			}
		});
	},
	
	(next) => {
		return () => {
			
			console.log('apk 파일을 리패키징 합니다.');
		
			exec('java -jar ' + __dirname + '\\apktool_2.3.1.jar b ' + basename + ' -o ' + basename + '-repack.apk', (error, stdout, stderr) => {
				if (error !== TO_DELETE) {
					
					let message = stdout;
					if (message === '') {
						message = stderr;
					}
					
					SHOW_ERROR('명령 실행', message);
				}
				
				else {
					
					console.log('apk 파일 리패키징 완료');
					
					next();
				}
			});
		};
	},
	
	(next) => {
		return () => {
			
			console.log('apk 파일에 서명을 등록합니다.');
			
			exec('"C:\\Program Files\\Java\\jdk1.8.0_121\\bin\\jarsigner" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ' + KEYSTORE_PATH + ' ' + basename + '-repack.apk ' + KEYSTORE_ALIAS + ' -storepass ' + KEYSTORE_PASSWORD, (error, stdout, stderr) => {
				if (error !== TO_DELETE) {
					
					let message = stdout;
					if (message === '') {
						message = stderr;
					}
					
					SHOW_ERROR('명령 실행', message);
				}
				
				else {
					
					console.log('apk 파일 서명 등록 완료');
					
					next();
				}
			});
		};
	},
	
	(next) => {
		return () => {
			
			console.log('apk 파일을 압축합니다.');
			
			exec(__dirname + '\\zipalign -v 4 ' + basename + '-repack.apk ' + basename + '-2.apk', (error, stdout, stderr) => {
				if (error !== TO_DELETE) {
					
					let message = stdout;
					if (message === '') {
						message = stderr;
					}
					
					SHOW_ERROR('명령 실행', message);
				}
				
				else {
					
					console.log('apk 파일 압축 완료');
					
					next();
				}
			});
		};
	},
	
	() => {
		return () => {
			exec('del ' + basename + '-repack.apk', (error, stdout, stderr) => {
				if (error !== TO_DELETE) {
					
					let message = stdout;
					if (message === '') {
						message = stderr;
					}
					
					SHOW_ERROR('명령 실행', message);
				}
			});
		};
	}]);
};