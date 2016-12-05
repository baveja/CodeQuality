'use strict';

// Define the `phonecatApp` module
angular.module('CodeQualityCheckApp', [
  
  'questionList','ngRoute','ui.router'
  
]).controller("MyController", function($scope) {
    
   
    $scope.myForm = {};
    
   
   
    $scope.myForm.options = [
                             { id : "API 203", name: "getGeneralProfile" }
                            ,{ id : "API 204", name: "postUpdateGeneralProfile" }
                            ,{ id : "API 231"  , name: "getLines" }
                            ];
   
    
    $scope.submit=function(){
    	$scope.dname = "";
    }
    
    
}).config(function($stateProvider){
	
	
    
    $stateProvider
    .state('login',{
    	 url:'/login',
    	 templateUrl: '/views/partial-home.html'
    })
    .state('questions',{
    	url:'/questions',
    	templateUrl: '/views/question.html'
    })
    
   
})