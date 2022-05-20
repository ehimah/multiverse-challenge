# My submission for Multiverse Engineering Take Home test

# Requirements

This code contained in this repo requires Node.js and npm to be installed.

## How to run

1. install the dependencies:


```bash
npm install
# or
yarn
```

2. run the tests:
    
```bash
npm test
```

3. run with provided sample data:
    
```bash
npm start
```

### Extras
 With more time, I would like to add more features to the application.
1. Interface abstraction: I'd like for the components to not have direct dependencies on the other components, but rather to depend on a common interface. E.g. The reader and writer components should be described by an interface and the Runner should depend on that interface.

2. Input validation: I'd like to be able to validate the input before it is passed to the components. E.g. the reader should be able to validate that the inputs are indeed valid after parsing them before it is passed to the Runner.

3. Better error handling: I'd like to be able to handle errors in a more graceful way. 

4. More documentation: The code is somewhat self explanatory, but I'd like to add more documentation to the code.

5. More quality tests: I'd like to add more tests to the application. The current tests only tests the happy path. I'd like to introduce component level tests to ensure that the components are working as expected.

✌️