// eslint-disable-next-line no-undef
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/*.d.ts'
	]
}
