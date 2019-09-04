# BIM Blockchain Manager

_This app was developed by Avalone Consultants Limited for the Robert Gordon University (RGU) Scott Sutherland School of Architecture & Built Environment._

_Authors: Andy Watt andy.watt@avalone.io, Colin McCrae colin.mccrae@avalone.io_

The full enviroment set-up is detailed separately. This README.md file simply describes how to get the app running once all the require software and components are installed.

Below is a non-exhaustive list of the software and components required:

- Rhino 5
- Grasshopper WIP for Rhino 5
- Thorton Tomassetti Plugin for Grasshopper (TT Toolbox)
- Millipede Plugin for Grasshopper
- LunchBox  Plugin for Grasshopper
- Chocolatey package installer
- Visual Studio (VS) Code
- Git
- Node Version Manager
- Node.js and Node Package Manager
- Truffle Development Framework
- Python (windows-build-tools)
- Ganache Command Line Local Blockchain
- Nodemon
- Metamask for Google Chrome Browser
- Interplanetary File System (IPFS)
- Drizzle including React components
- Postman


## Demo: Initialise

To initilise the demo, follow these steps.

1.	Start Ganache

    $ `ganache-cli -m "squeeze enough elephant crisp laundry rate turkey smooth clap dinosaur proud destroy" -p 7545`

2.	Start IPFS

    $ `ipfs daemon`

3.	In blockchain folder:

    $ `truffle migrate --reset`
4.	In the API folder:

    $ `npm run api`

5.	In the app folder:

    $ `npm run start`


## Demo: Workflow

To demo the app, follow these steps.

1.	Register as Problem Owner
2.	Create a new problem as the problem owner
3.	Click 'Load'
4.	Upload file to IPFS
5.	Send hash to problem contract, refresh
6.	Open the problem contract
7.	Register as a problem optimiser
8.	Create a new solution to an open problem ID
9.	Load solution
10.	Click 'IPFS File Link'
11.	Enter a value, say ‘10’, and then ‘Send Value’
12.	Open Rhino, then Grasshopper, and open the Optimisation Problem
13.	Click on ‘Blockchain’
14.	Drag and drop the one icon onto the flowsheet.
15.	Take the solution contract address from the web UI and paste that into ‘CtrAddr’ by right clicking and setting text.
16.	Paste in the private key for the account (0x291930bc51cb713ff90d332dc20d5289844c6bf996a8a68122361fe7326eb3d3) into ‘pkey’ by right clicking and setting text.
17.	Choose a value to send to the solution contract (say 20) and enter this into ‘Val’ by by right clicking and setting number.
18.	As a Problem Owner, click ‘Load’ to load the problem if not already loaded.
19.	Paste in the solution address to ‘_winner’ and click ‘Solve’
20.	Click ‘Complete’.
21.	Click ‘Cancel’
