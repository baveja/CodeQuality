/**
 * COntroller to push login Details to DB
 */

angular.module('CodeQualityCheckApp',[
  'ngRoute'
]).controller("loginController", function(loginService) {
	var self=this;
	var dataObj = {
			  dname:this.dname,
			  rname:this.rname,
			  apiName:this.apiName
		  };
	loginService.postLoginDetails(dataObj).then(function(response){
		console.log("Pushed tp DB")
	})
}).factory('loginService', function($http){
	return {
		 postLoginDetails: function(dataObj){
			  
			  var dataObj=dataObj;
			  return $http.post('http://127.0.0.1:8081/apiDetails',dataObj);
		  }
	}
})