import { strict as assert } from 'assert';
import { join } from 'path';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';

describe('utils/version', () => {
	it('prints the package version and exits with code 0', () => {
		const scriptPath = join(__dirname, '../utils/version.js');

		const result = spawnSync(
			process.execPath,
			[
				'-e',
				`
				const mod = require(process.argv[1]);
				mod.printVersionAndExit();
				`,
				scriptPath
			],
			{ encoding: 'utf8' }
		);

		assert.equal(result.status, 0);

		const packageJsonPath = join(__dirname, '../../package.json');
		const packageJson = JSON.parse(
			readFileSync(packageJsonPath, 'utf8')
		) as { version: string };

		assert.ok(result.stdout.includes(`v${packageJson.version}`));
	});
});
