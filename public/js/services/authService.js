angular.module('pokeApp.authService', [])
    .service('authService', function($http, $q, AuthToken) {
        this.login = function(username, password) {

            return $http.post('/api/authenticate', {
                username: username,
                password: password
            }).success(function(response) {
                AuthToken.setToken(response.token);
                return response;
            }).error(function(response) {
                console.log(response);
            });
        }

        this.logout = function() {
            AuthToken.setToken();
        }

        this.isLoggedIn = function() {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }


        this.getUser = function() {
            if (AuthToken.getToken) {
                return $http.get('/api/me', {
                    cache: true
                });
            } else {
                return $q.reject({
                    message: 'user has not token'
                });
            }
        }
    })
    .service('AuthToken', function($window) {
        this.getToken = function() {
            return $window.localStorage.getItem('token');
        }
        this.setToken = function(token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        }
    })
    .service('AuthInterceptor', function($q, $location, AuthToken) {

        this.request = function(config) {
            console.log('config: ', config);
            var token = AuthToken.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        }

        this.responseError = function(response) {
            console.log('responseError', response);
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path('/login');
            }
            return $q.reject(response);
        }
    })
