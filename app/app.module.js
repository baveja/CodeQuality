'use strict';

// Define the `phonecatApp` module
angular.module('CodeQualityCheckApp', [
  
  'ngRoute','ui.router'
  
]).config(function($stateProvider,$sceDelegateProvider,$urlRouterProvider){
	
	
    

    $stateProvider
    .state('login',{
    	 url:'/login',
    	 templateUrl: '/views/partial-home.html',
    	 controller:'loginController'
    	 
    })
    .state('questions',{
    	url:'/questions',
    	templateUrl: '/views/question.html',
    	controller:'loginController',
    	params :{'apiName' : {value:null}}
    })
    .state('review',{
    	url:'/review',
    	templateUrl:'/views/review.html',
    	controller:'loginController'
    	
    })
    .state('description',{
    	url:'/',
    	templateUrl:'/views/description.html'
    }).
    state('questionSetUp',{
    	url:'/set-up-questions',
    	templateUrl:'/views/set-up-questions.html',
    	controller:'questionController'
    	
    })
    
   
}).controller("loginController", function(loginService,$scope,$rootScope,$stateParams) {
	var self=$scope;
	
	loginService.getApiDetails().then(function(response){
		self.apiDetails = response.data;
	})
	loginService.get().then(function(response){
		self.questions= response.data;
	});
	$scope.submit = function(){
		
		var dataObj = {
				  dname:$scope.dname,
				  rname:$scope.rname,
				  apiNumber:$scope.ddlView
			  	};
		
		loginService.postLoginDetails(dataObj).then(function(response){
			console.log("Pushed to DB");
		})
		
	}
	
    $scope.update = function(){
		
    	var questions = $scope.questions;
    	var commentArr = [];
    	for(var i=0;i<questions.length;i++){
    		var comment = {};
    		comment.question = questions[i].question;
    		comment.commentsQId = questions[i].comments;
    		commentArr.push(comment);
    	}
		var dataObj={
				rflag:true,
				apiNumber:$stateParams.apiName,
				comments : commentArr
		}
		loginService.putApiDetails(dataObj).then(function(response){
			console.log("Updated to DB");
		})
	}
    
    $scope.check = function(){
    	var dataObj = $scope.ddlView;
    	$scope.flag =false;
    	loginService.getApiDetail(dataObj).then(function(response){
    		$scope.review= response.data.review;
    		if(response.data.review){
    			
    			$scope.comments = response.data.comments
    			alert("Review is completed");
    		}else
    		{
    			$scope.flag =true
    			alert("Review Still Pending");
    		}	
    	})
    }
}).factory('loginService', function($http){
	return {
		 postLoginDetails: function(dataObj){
			  
			  var dataObj=dataObj;
			  return $http.post('http://127.0.0.1:8081/loginDetails',dataObj);
		  },
		  getApiDetails: function(){
			  return $http.get('http://127.0.0.1:8081/apiDetails')
		  },
		  putApiDetails: function(dataObj){
			  var dataObj = dataObj;
			  return $http.put('http://127.0.0.1:8081/apiDetails',dataObj)
		  },
		  getApiDetail : function(dataObj){
			  var url = 'http://127.0.0.1:8081/apiDetails/' + dataObj;
			  return $http.get(url)
		  },
		  get: function(){
			  return $http({
				  method:'GET',
				  url:'http://127.0.0.1:8081/questions'
			  })
			  
		  },
		  postQuestions:function(dataObj){
			  return $http.post('http://127.0.0.1:8081/questions',dataObj)
			  
		  }
	}
}).controller('questionController',function($http,$scope,loginService){
	var self=$scope;
	self.questionArr=[{'questionId':1},{'questionId':2},{'questionId':3},{'questionId':4},{'questionId':5}];
	$scope.save = function(){
		var dataObj={questionArr:self.questionArr}
		loginService.postQuestions(dataObj).then(function(response){
			alert("Questionaare Added");
		})
	}

});