define([
		'backbone'
		,'app'
		// ,'views/user/login'
		// ,'views/user/logout'
		// ,'views/user/logged'
		// ,'views/user/permission'
		,'views/user/updatePassword'
], function (Backbone, App, UpdatePasswordView){
		var UserController = Backbone.Router.extend({
				routes: {
						'login': 'login',
						'logout': 'logout',
						'isLogged': 'isLogged',
						'hasPermission': 'hasPermission',
						'updatePassword': 'updatePassword'
				},

				login: function() {
						console.log('TODO implement login');
				},

				logout: function() {
						console.log('TODO implement login');
				},

				isLogged: function() {
						console.log('TODO implement isLogged');
				},

				hasPermission: function() {
						console.log('TODO implement hasPermission');
				},

				updatePassword: function() {
						console.log('TODO implement update password');
				}
		});

		return UserController;
});
