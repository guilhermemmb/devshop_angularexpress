var expect = require('chai').expect,
	sinon = require('sinon'),
	q  = require('q'),
	proxyquire = require('proxyquire');

describe('user controller', function () {
	var sut;
	var reqMock;
	var resMock;
	var userServiceMock;

	beforeEach(function () {
		reqMock = {}, resMock = {}, userServiceMock = {};

		sut = proxyquire('../../../api/controllers/users', {
			'../services/userService': userServiceMock
		});
	});

	describe('getAll', function () {
		describe('erros de parametros', function () {
			describe('Quando se passa uma página inválida', function () {
				it('informa que a pagina pedida é invalida', function () {
					reqMock.query = {
						page: -1,
						size: 10
					};

					var messageSpy = sinon.spy();
					resMock.status = sinon.stub().withArgs(400).returns({send: messageSpy});

					sut.getAll(reqMock, resMock);

					expect(messageSpy.firstCall.args[0]).to.equal('invalid page');
				});
			});

			describe('Quando se passa um tamanho de página inválida', function () {
				it('informa que o tamanho é invalido.', function () {
					reqMock.query = {
						page: 1,
						size: -1
					};

					var messageSpy = sinon.spy();
					resMock.status = sinon.stub().withArgs(400).returns({send: messageSpy});

					sut.getAll(reqMock, resMock);

					expect(messageSpy.firstCall.args[0]).to.equal('invalid page size');
				});
			});
		});
		describe('ao chamar o servico', function () {
			var dfd = q.defer();
			beforeEach(function (){
			});
			describe('com os parametros esperados', function () {
				it(' retorna o obj esperado', function () {
					userServiceMock.getOrgUsers = sinon.stub().withArgs(1, 10).returns(dfd.promise);

					reqMock.query = {
						page: 1,
						size: 10
					};
					var expectedData = {
						element: 1
					};

					resMock.json = sinon.spy();

					sut.getAll(reqMock, resMock);

					dfd.resolve({element: 1});

					setTimeout(function () {
						expect(resMock.json.firstCall.args[0]).to.equal(expectedData);
					},0);
				});
			});
			describe('e o servico falha', function () {
				it(' retorna erro 500 com a mensagem de erro', function () {
					userServiceMock.getOrgUsers = sinon.stub().returns(dfd.promise);

					reqMock.query = {
						page: 10,
						size: 10
					};

					var messageSpy = sinon.spy();
					var EXPECTED_MESSAGE = 'hue!';

					resMock.status = sinon.stub().withArgs(500).returns({send: messageSpy});

					sut.getAll(reqMock, resMock);

					dfd.reject(EXPECTED_MESSAGE);

					setTimeout(function () {
						expect(messageSpy.firstCall.args[0]).to.equal(EXPECTED_MESSAGE);
					},0);
				});
			});
		});
	});
});