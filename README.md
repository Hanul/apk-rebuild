# apkresign
APK 파일을 keystore를 변경하여 리빌드 합니다.

```
npm install -g apkresign
```

```
apkresign <SOURCE_FILE_PATH> <KEYSTORE_PATH> <KEYSTORE_ALIAS> <KEYSTORE_PASSWORD>
```

## 주의사항
- Windows에서만 사용 가능합니다.
- `jdk1.8.0_121`이 설치되어 있어야 합니다.