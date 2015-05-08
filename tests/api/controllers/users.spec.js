var expect = require('expect.js'),
	proxyquire = require('proxyquire');

//function waitForCompletion(done, callback) {
//	setTimeout(function() {
//		callback();
//		done();
//	}, 10);
//}

describe('user controller', function() {
	var sut;
	var reqMock;
	var resMock;

	beforeEach(function () {
		reqMock = {},
			resMock = {},
			usersMock = {};

		console.log();
		sut = proxyquire('../../../api/controllers', {
			'./users': usersMock
		});
	});

	describe('getAll', function () {
		it('Quando se passa um tamanho de página inválida', function () {
			// Act
			sut.loginOnSpotify(reqMock, resMock);

			// Assert
			expect(resMock.redirect.called).to.be(true);
			expect(spotifyMock.getLoginUrl.called).to.be(true);
		});
	});
});