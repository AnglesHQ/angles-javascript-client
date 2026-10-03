# angles-javascript-client

The angles-javascript-client has all the necessary functions to store your test results in the Angles Dashboard. 

### Installation
To install the angles javascript client in your project simply run the following command.
``` bash
# if your only using whilst running your tests (otherwise remove --save-dev)
npm install  angles-javascript-client --save-dev

```

### Usage
You should be able to use the angles-javascript-client with any javascript execution framework to help you store your test results and do your image comparison. You make use of the client in the following ways.

``` javascript
// Option 1 (preferred): You can import an (singleton) instance of the anglesReporter
import anglesReporter from 'angles-javascript-client';

// And you can then point it to your instance of the Angles dashboard.
anglesReporter.setBaseUrl('http://127.0.0.1:3000/rest/api/v1.0/');
await anglesReporter.startBuild('TestRunName', 'Team', 'Environment', 'Component');

// store the versions of your system under test (so you can compare builds)
const artifact = new Artifact('angles-ui', 'anglesHQ', '1.0.0');
const artifactArray: Artifact[] = [];
artifactArray.push(artifact);
await anglesReporter.addArtifacts(artifactArray);

// Called e.g. in the "before"
anglesReporter.startTest('test1', 'suite1');

// This will group all the loging afterwards in this action
anglesReporter.addAction('My first action');

// Using the following two requests you can store your screenshots (with a view name and platform details)
const platform = new ScreenshotPlatform('Android', '10', 'Chrome', '89.0', 'Samsung Galaxy S9');
const screenshot = await anglesReporter.saveScreenshotWithPlatform(
  '/path/to/your/screenshot.png',
  'view_1',
  platform,
);

// this will add your screenshot to the info and display a thumbnail.
anglesReporter.infoWithScreenshot('Checking my view on android', screenshot._id);

// these methods don't do an assertion, but just report on the result (and change the state of the test run in Angles).
anglesReporter.pass('Assertion', 'true', 'true', 'Just doing an assertion');
anglesReporter.fail('Assertion', 'true', 'false', 'Just doing an assertion');

// Needs to be called once the test is done to send it to the Angles Dashboard.
await anglesReporter.saveTest();

```

### Attachments
A test can attach files to its results: console logs, network HAR files, videos, Playwright traces, page HTML snapshots and images. Angles shows each one on the test (or the step) with a viewer that suits it. The file extension decides how it is shown, so keep the real one: `.log`/`.txt`, `.json`, `.har`, `.webm`/`.mp4`, `.zip` (shown as a Playwright trace when the name contains "trace"), `.html`/`.htm`, `.png`/`.jpg`/`.jpeg`/`.gif`/`.webp`. Requires an Angles server with test attachment support.

``` javascript
anglesReporter.startTest('Guest user can pay with a saved card', 'Checkout');
anglesReporter.addAction('Pay with card');
anglesReporter.fail('Order confirmation', 'Order confirmed', 'Payment declined', '');

// Attach to the step you just reported, e.g. the page as it was when the assertion failed.
await anglesReporter.attachDataToLastStep(await page.content(), 'page.html');
await anglesReporter.attachFileToLastStep('/path/to/failure.png');

// Attach to the whole test, e.g. what Playwright recorded.
await anglesReporter.attachFile(await page.video().path(), 'checkout.webm');
await anglesReporter.attachFile('/path/to/trace.zip');
await anglesReporter.attachFile('/path/to/network.har');
await anglesReporter.attachData(consoleLines.join('\n'), 'console.log');

// Await the attach calls before saving: the file is linked when the test is saved.
await anglesReporter.saveTest();
```

Files are uploaded against the current build as soon as you attach them, so this works in batch mode too.

### Batch mode
By default every call to `saveTest()` sends the test execution to the Angles API straight away. If you'd rather send the whole test run in a single request at the end (e.g. for large runs), you can enable batch mode. The build is still created up-front and screenshots are still uploaded individually as the tests run (they need the build id), but the executions are gathered by the reporter until you call `saveAllTests()`.

``` javascript
anglesReporter.setBatchMode(true);
await anglesReporter.startBuild('TestRunName', 'Team', 'Environment', 'Component');

// run your tests as usual: startTest(), saveScreenshot(), pass()/fail() and saveTest()
// saveTest() now stores the executions in the reporter rather than sending them.

// once all tests are done, store all the executions against the build in one request.
await anglesReporter.saveAllTests();
```

If you want to create your own reporter, you can instantiate the request classes yourself.
```javascript

// Option 2: you can import the invidividual TypeScript classes
import { BuildRequests, EnvironmentRequests } from 'angles-javascript-client';

// and instantiate the request classes yourself with your own axios instance.
const buildRequests = new BuildRequests(axios);
const environmentRequests = new EnvironmentRequests(axios);

```

To see more details about Angles Dashboard and e.g. how to set it up, have a look at our documentation on our [github](https://angleshq.github.io/) page.
