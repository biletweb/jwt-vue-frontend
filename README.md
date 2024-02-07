<p align="center"><a href="https://vuejs.org" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/512px-Vue.js_Logo_2.svg.png" width="400" alt="Vue Logo"></a></p>

## Project Setup

```sh
npm install
```

### Setup a baseURL to work with the backend

```sh
baseURL: 'http://127.0.0.1:8000/api' in src/axios/api.js
```

### Setup a imageUrl to work with images from the backend

```sh
app.config.globalProperties.$imageUrl = 'http://127.0.0.1:8000/storage/' in src/main.js
```

### Start a local development server

```sh
npm run dev
```

To work you need to install the frontend <a href="https://github.com/biletweb/jwt-laravel-backend">jwt-laravel-backend</a>
