exports.setup = function(Tests){

var path = require('path'),
	station = require('../../station');

var dir = path.dirname(path.relative(process.cwd(), process.argv[1]));


Tests.describe('Station create', function(it){


	it('should create a Pd process with -stderr flag and receive a bang from [print]', function(expect){
		expect.perform(8);

		var pd = station({
			flags: ['-noprefs', '-stderr', '-nogui', dir + '/suites/test.create.pd']
		});

		expect(pd).toBeAnInstanceOf(station);

		// 'print' event is only available with '-stderr' flag
		pd.on('print', function(buffer){
			expect(buffer).toBeType('object');
			expect(buffer.toString()).toBeTruthy();
			expect(buffer.toString().trim()).toEqual('print: bang');
			expect(this).toEqual(pd);
			expect(this).toBeAnInstanceOf(station);
			this.destroy();
		});

		pd.on('destroy', function(){
			expect(this).toEqual(pd);
			expect(this).toBeAnInstanceOf(station);
		});

		pd.create();

	});

});

};
