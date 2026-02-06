import { strict as assert } from 'assert';
import { join } from 'path';
import { spawnSync } from 'child_process';

describe('utils/version', () => {
	it('prints the package version and exits with code 0', () => {
		const scriptPath = join(__dirname, '../../dist/utils/version.js');

		const result = spawnSync(
			'node',
			[
				'-e',
				`require('${scriptPath.replace(
					/\\/g,
					'\\\\'
				)}').printVersionAndExit()`
			],
			{ encoding: 'utf8' }
		);

		assert.equal(result.status, 0);
		assert.ok(result.stdout.startsWith('v'));
	});
});
