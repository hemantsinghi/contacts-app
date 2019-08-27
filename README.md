# contacts-app

## Introduction
Contacts app inserts, modifies and deletes the contacts. 
### Pages
#### 1. Add contacts
    The home page is the adding of contacts page, where on Submit action the contact is added in the localstorage. 
    Validation checks are implemented on name, email and telephone where name and email have required and email validation checks and telephone number checks for valid phone number using regex.
    Checks are implemented to prevent duplicate contacts based on the conditions name, telephone and email are unique in the form. If contact is added alert showing the *Contact is added* else *Duplicate contact*.
#### 2. View Edit contacts
    This page shows 2 lists, first shows *Favorite* with total number of favorite contacts and second shows *All Contacts* with total contacts.
    The *All Contacts* page shows the contacts and when the user clicks on the contact an accordion is displayed which shows all the information of the user with input box disabled (for styling reasons).
    There are 2 buttons in the same row of contact name, which are *Edit* and *Delete*. Clicking on *Edit* button a accordion is open with the form pre-filled with the values to edit and on clicking the *Submit* changes are reflected in localstorage else the changes are temporary. There is another button called *Reset* which resets the form values with the one stored in locastorage.
    The *Delete* button deletes the contact from local storage and if the contact is a favorite, then it is removed in the *Favorite* contacts list.
    
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

## Project notes
1. ESLint is pre-configured with AirBnb and custom linter options
2. Future versions may include 1 common form component that can be used in both ViewEdit and Add contacts page.
3. Implememtation of Firestore is planned, so that we can remove the dependency on localstorage.
4. Adding of test cases.
