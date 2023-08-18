import { Context, Done, RootHookObject } from "mocha";

// ----------------------------------------------------------------------------

const originalLogFunction = console.log;
let output: string;

function suppressAndSaveLogs(this: Context, done: Done) {
  output = "";
  console.log = (msg) => {
    output += msg + "\n";
  };
  done();
}

function displayLogsOnError(this: Context, done: Done) {
  console.log = originalLogFunction; // undo dummy log function
  if (this.currentTest?.state === "failed") {
    console.log(output);
  }
  done();
}

// ----------------------------------------------------------------------------

/**
 * Root hooks common to all tests. To support parallel testing, it is assumed
 * to run before each test file.
 *
 * Log suppression is done with help from https://stackoverflow.com/a/53102024/4906586
 *
 * @see https://mochajs.org/#available-root-hooks
 */
export const mochaHooks: RootHookObject = {
  beforeEach: suppressAndSaveLogs,

  afterEach: displayLogsOnError,
};
