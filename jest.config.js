const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './' // корень проекта
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // поддержка алиасов типа @/components
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom'
}

module.exports = createJestConfig(customJestConfig)
