var expect = require('chai').expect,
	sinon = require('sinon'),
	q  = require('q'),
	proxyquire = require('proxyquire');

describe('github repository', function () {
	var sut;
	beforeEach(function () {
		sut = proxyquire('../../../api/repositories/github', {});
	});

	describe('getUsersFromOrg', function () {
		describe('erros de parametros', function () {
			it('Quando se passa uma página inválida a promessa é rejeitada com a mensagem de erro', function (done) {
				var page = -1;

				sut.getUsersFromOrg(page, 10).fail(function (err) {
					expect(err).to.equal('page');
					done();
				});
			});

			it('Quando se passa um tamanho de pag inválida a promessa é rejeitada com a mensagem de erro', function (done) {
				var size = -1;

				sut.getUsersFromOrg(10, size).fail(function (err) {
					expect(err).to.equal('size');
					done();
				});
			});
		});

		describe('quando os parametros estao corretos', function () {
			it('a url é chamada para pegar dados do github com os parametros passados', function (done) {
			});
		})
	});
});
