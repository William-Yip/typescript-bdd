module.exports = {
    roots: ['<rootDir>/src'],
    testEnviromnment: 'node',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapping: {
        '@/(.*)': '<rootDir>/src/$1'
    }
}