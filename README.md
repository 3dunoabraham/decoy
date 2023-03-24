# decoy

To clone and run this application, you'll need [Node.js](https://nodejs.org/) (which comes with npm) installed on your computer. From your command line:

First, clone this repository:
```bash
git clone https://github.com/amitmerchant1990/electron-markdownify
```

To get started with the project, first install the required dependencies:
```bash
npm install
```
Then create a .env.local file at the root directory of your application and add the variables to it:
```bash
BINANCE_SECRET=". . ."
BINANCE_PUBLIC=". . ."
```
To get your binance api keys, click here.

Then run the development server:
```bash
npm run dev
```
Alternatively, you can run the server using https:
```bash
node server.js
```
You can view the app by navigating to http://localhost:3000 in your web browser.

 
Finally, you can run the test suite:
```bash
npm run test
```