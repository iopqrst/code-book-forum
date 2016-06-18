'use strict';

angular.module('com.ngnice.app').controller('ReaderCreateController', function ReaderCreateController(Reader) {
	var vm = this;
	vm.submit = function(form) {
		Reader.save(form,
			function(reader) {
				console.log(reader);
			},
			function(resp) {
				console.log(resp.data);
			}
		);
	};
});