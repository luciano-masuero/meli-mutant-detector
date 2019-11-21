# meli-mutant-detector
API REST to detect mutants based in DNA

## Requirements
**IMPORTANT**: The development of this app was done on a VagrantBox with Ubuntu as OS Guest. Instructions will apply to command line.
You will need to have installed:
* node (https://nodejs.org/es/): the project was developed using version 13.1.0 
* mongo (https://docs.mongodb.com/manual/administration/install-on-linux/): the project was developed using version 4.0.9. Before start check that mongo service is alive and run into mongo shell with: 

    ```bash
    mongo
    ```

    **NOTE**: Is possilbe also to use external mongo db and configure properly the connection string

## Steps
1. Create project folder and go to it
1. Clone project

    ```bash 
    git clone git@github.com:luciano-masuero/meli-mutant-detector.git . 
    ```
1. Inside project root folder run 

    ```bash 
    npm install 
    ```
1. Copy config.json.example to config.json

    ```bash 
    cp config.json.example config.json 
    ```
1. Check values of configs
1. Run application

    ```bash 
    npm start 
    ```
    
## Tests
To run tests just go to project folder and run 
    ```bash 
    npm test 
    ```
