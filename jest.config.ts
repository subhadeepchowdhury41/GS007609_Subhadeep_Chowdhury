import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  // testEnvironment: "jsdom",
  moduleNameMapper: {
   "^@/(.*)$": "<rootDir>/src/$1"
  }
};

export default config;