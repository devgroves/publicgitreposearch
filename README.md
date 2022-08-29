# gitreposearch
Simple UI to search the repos

# Next.js with TypeScript 

Next.js provides an integrated TypeScript experience, including zero-configuration set up and built-in types for Pages, APIs, and more.
Clone and deploy the TypeScript starter
View an example application
`create-next-app` support
You can create a TypeScript project with create-next-app using the --ts, --typescript flag like so:

```javascript 
npx create-next-app@latest --ts
```
 or

``` javascript
yarn create next-app --typescript
```
 or
```javascript 
pnpm create next-app --ts
```

# Existing projects
To get started in an existing project, create an empty tsconfig.json file in the root folder:

```javascript 
touch tsconfig.json
```

Next.js will automatically configure this file with default values. Providing your own tsconfig.json with custom compiler options is also supported.

You can also provide a relative path to a tsconfig.json file by setting typescript.tsconfigPath prop inside your 8*next.config.js*8 file.

Then, run next (normally npm run dev or yarn dev) and Next.js will guide you through the installation of the required packages to finish the setup:

```javascript
npm run dev
```

You're now ready to start converting files from .js to .tsx and leveraging the benefits of TypeScript! 

# Chackra Ui Installation#
 install Chakra UI by running either of the following:

```javascript 
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```
```javascript 
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6 
```
# Provider Setup#
After installing Chakra UI, you need to set up the ChakraProvider at the root of your application.

Go to ```pages/_app.js``` or ```pages/_app.ts```x (create it if it doesn't exist) and wrap the Component with the ChakraProvider:

```javascript 
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
```

# Customizing theme
If you intend to customise the default theme object to match your design requirements, you need to extend the theme.

Chakra UI provides an extendTheme function that deep merges the default theme with your customizations.

```javascript 
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;
```
