
# Meta-Crawler REST API 

URL을 넘겨주면 URL에 해당하는 메타정보를 크롤링하여 mongodb에 데이터를 쌓고   
저장된 메타 정보를 넘겨주는 api 입니다.   
도커로 빌드 및 실행이 가능합니다.   

Nodejs 17.6  
Typescript    
Eslint    
Prettier   
Docker   
Github Action   
Mongodb   

서버 포트는. 기본 3000으로 구성되어 있습니다.
git push 명령어 사용시 github action에 의해 푸쉬된 코드가 eslint/prettier의 룰을 깨뜨리지 않는 것을 확인하고,    
빌드가 잘 되는 것을. 확인합니다.

## [](https://github.com/bbc/REST-API-example/blob/master/README.md#도커빌드)도커빌드

Dockerfile FROM node:17 다음 줄에 다음과 같은 몽고db 환경변수를 세팅합니다.

ENV MONGODB_URL = mongodb+srv://chaoswith:XXXXXXXX@cluster0.h83m4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV MONGODB_NAME = test
ENV MONGODB_COLLECTION_NAME = devices
#

## 도커 빌드
```
docker build -f Dockerfile -t meta_crawler .
```
#
## 도커 실행
```
docker run -i -t --name meta_crawler -p 3000:3000 meta_crawler
```
#

## API 리스트

### 메타 데이터 정보 가져오기
GET /metadatas
```
curl -i -H 'Accept: application/json' http://localhost:3000/metadatas
```
Response
```
[{"_id":"6221c1bc480c94ae21d76153","title":"Node.js Developer Tools | Visual Studio","image":"https://visualstudio.microsoft.com/wp-content/uploads/2018/06/vscom_vs_features_node-js_twitter.png","publisher":"Visual Studio","description":"Project templates, IntelliSense, npm integration, debugging, & more. Turn Visual Studio into a powerful Node.js development environment. Download for free.","url":"https://visualstudio.microsoft.com/ko/vs/features/node-js/","date":"2022-03-04T07:37:32.116Z"}]
```
#

### 새로운 메타정보 입력
POST /metadata

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' "http://localhost:3000/metadata" -d '{ "url": "https://visualstudio.microsoft.com/ko/vs/features/node-js" }'
```
Response
```
{"title":"Node.js Developer Tools | Visual Studio","image":"https://visualstudio.microsoft.com/wp-content/uploads/2018/06/vscom_vs_features_node-js_twitter.png","publisher":"Visual Studio","description":"Project templates, IntelliSense, npm integration, debugging, & more. Turn Visual Studio into a powerful Node.js development environment. Download for free.","url":"https://visualstudio.microsoft.com/ko/vs/features/node-js/","date":"2022-03-10T07:54:16.542Z"}**%**
```