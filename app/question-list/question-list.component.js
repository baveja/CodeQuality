'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('questionList').
  component('questionList', {
    templateUrl: 'question-list/question-list.template.html',
    controller: ['questionService',
      function (questionService) {
    	var self=this;
    	questionService.result().then(function(response){
    		self.phones = response.data;
    	})
        
      }
    ]
  }).factory('questionService',function($http){
	  
	  return {
		  
		  result: function(){
			  return $http({
				  method:'GET',
				  url:'http://127.0.0.1:8081/questions'
			  })
			  
		  }
	  }
	  
	  
  });
