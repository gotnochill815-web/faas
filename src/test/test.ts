/* eslint-disable @typescript-eslint/unbound-method */

import { strict as assert } from 'assert';
import { printVersionAndExit } from '../utils/version';

describe('utils/version', () => {
	it('prints the package version and exits with code 0', () => {
		let logged = '';
		let exitCode: number | undefined;

		const originalLog = console.log;
		const originalExit = process.exit;

		console.log = (msg?: unknown) => {
			logged = String(msg);
		};

		process.exit = ((code?: number) => {
			exitCode = code;
			throw new Error('process.exit');
		}) as never;

		try {
			printVersionAndExit();
		} catch {
			/* expected */
		} finally {
			console.log = originalLog;
			process.exit = originalExit;
		}

		assert.match(logged, /^v\d+\.\d+\.\d+/);
		assert.equal(exitCode, 0);
	});
});
