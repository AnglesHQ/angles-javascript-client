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

If you want to create your own reporter, you can instantiate the request classes yourself.
```javascript

// Option 2: you can import the invidividual TypeScript classes
import { BuildRequests, EnvironmentRequests } from 'angles-javascript-client';

// and instantiate the request classes yourself with your own axios instance.
const buildRequests = new BuildRequests(axios);
const environmentRequests = new EnvironmentRequests(axios);

```

To see more details about Angles Dashboard and e.g. how to set it up, have a look at our documentation on our [github](https://angleshq.github.io/) page.
