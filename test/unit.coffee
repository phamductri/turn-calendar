describe 'calendar', ->

	beforeEach (module 'turn/calendar')
	
	beforeEach ->
		
		inject ($compile, $rootScope) =>

			@scope = do $rootScope.$new
			@element = angular.element """
			"""

			($compile @element) @scope
			do @scope.$digest
			@scope = do @element.scope


	#########################################


	describe '#foo', ->

		it 'should bar', ->

			expect true
			.toBe true