# contabilidad
This is a project that extract key information from an excel document for creating a report of incomes and expenses.

This simple tool was developed in order to make easy the financial decision making process for the Gaviotas company.

## Prerequisites
### Install NodeJS compiler
* [Download](https://nodejs.org/en/download/).

## 1. Clone the project.
After installing the Docker CLI tool, now you're ready to start working with *contabilidad* app.

### 1.1 Clone the repository.
  ```
  git clone https://github.com/sandovaledwin/contabilidad
  ```

### 1.2 Go into the directory.
  ```
  cd contabilidad
  ```

## 2. Install dependencies.
In order to execute this project you must install the *exceljs* npm package

### 2.1 Clone the repository.
  ```
  npm run modules
  ```  

## 3. Creating the report.
Now, you're ready for creating your first financial report.

### 3.1 Copy the excel document that contains all the information into the next path.
  ```
  cp /Users/sandovaledwin/Downloads/gaviotas-contabilidad.xlsx input/.
  ```

### 3.2 Extracting the information and converting to JSON
  ```
  npm run start
  ```  
### 3.3 Report generation
  ```
  npm run report
  ```    