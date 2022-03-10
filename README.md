# RN Testing Lectures

This repository holds the examples that will be used in all 3 RN Testing Lectures as well as the practice exercises that will be presented at the end of each lecture as asynchronous material.

### Lecture #1: Testing with Jest

- Summary of the 3 lectures
- Brief explanation of what [Jest](https://jestjs.io/) is and what is used for
- How to approach a test
- Live practical testing examples on utils used in a real project
- How to view and interpret coverage
- Sharing & explaining asynchronous material

### Lecture #2: Testing Redux

- Q&A: Lecture #1 asynchronous material
- Introduction to [MSW](https://mswjs.io/) and asynchronous actions testing
- Brief explanation of the utils (getMockStore and getMockState) we use and what problems they solve
- Live practical examples of a reducer test
- Live practical examples of an action test
- Brief explanation of how to mock an API call with MSW
- Live practical examples of an asynchronous action test with a mocked API
- Sharing & explaining asynchronous material

### Lecture #3: Testing React Native Components

- Q&A: Lecture #2 asynchronous material
- Introduction to [RTL](https://testing-library.com/docs/react-native-testing-library/intro)
- Live practical examples of a simple component test
- Live practical examples of a component test with Redux
- Sharing & explaining asynchronous material

### Where to find the material

- First, checkout to the corresponding branch for the class you are taking

**Class 1**

You can find all we given during the class in the following path of the project:
`packages/lib/utils/demo`

Exercises:

Branch: `clase-1/exercises`
- Navigate to `packages/lib/utils/exercises`

**Class 2**

You can find all we given during the class in the following path of the project:
`packages/mobile/src/redux/modules/users`

Exercises:

Branch: `clase-2/exercises`
- Navigate to `packages/mobile/src/redux/modules/users/userReducers.test.ts`
- Go to the end of the file & you should see an incomplete test for you to finish
- Navigate to `packages/mobile/src/redux/modules/users/actions/exercises`
- In that folder are two actions that have missing tests, go ahead and write them!
- Navigate to `packages/mobile/src/redux/modules/todos`
- This redux module has 0% of coverage. Add test to reducers, actions and selectors. Remember to add new handlers in `packages/mobile/src/mocks/handlers.ts` for the API calls!

_Note: you can see the examples of class 2 if you feel lost_

**Class 3**

You can find all we given during the class in the following path of the project:
`packages/mobile/src/components`

Exercises:

Branch: `main`
- Navigate to `packages/mobile/src/components/UserList/UserList.test.tsx`
- This component have 3 missing tests, go ahead and write them!

_Note: you can see more examples about how to check if an action have_
_been called at the first render here `packages/mobile/src/components/Example/Example.test.tsx`_

## Workflow

Participants will have to fork this repo in order to publish their own asynchronous material solutions in the form of a PR, each class will have their own separate branches each already created. This is meant to be a way to keep track of each student's work and keep the repo tidy and reusable for future lectures.
