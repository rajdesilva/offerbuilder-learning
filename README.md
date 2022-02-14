This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `Steps to run projects locally`

To run the code need to set an environment on
step 1: Open editor through 'sudo nano /etc/hosts'
Step 2: Edit, add port and local environment
127.0.0.1 local.kognitiv.com
then save file

Step 3: yarn && yarn start
Step 4: After yarn start browser will open in https://localhost:3000/
Step 5: Replace 'localhost' url text to 'local.kognitiv.com' i.e. https://local.kognitiv.com:3000/
Step 6: Sign in with your credential and we'll be able to run project locally
step 7: If page redirects you to https://offerbuilder-dev.kognitiv.com/ dont worry just replace it with https://local.kognitiv.com:3000/

### Check Development and Production

Step 1: open api.config.js file
Step 2: Assign main url to 'API_URL_BASE'.
Step 3: Save it and then run 'yarn start'

### `Run test cases`

For single file run following below command

- yarn test -u "filename.test.js"

To run all file with code coverage

- yarn test -u

Note: -u use to update the snapshot file

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

Let's Roll it up on your local.

Added i18n keys on the webtranslate part.

### Debugging test cases

screen.debug(null, 2000000); // Print DOM Tree.
