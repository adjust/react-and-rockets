# React & Rockets

**Description:** Home task for Frontend Developer

**Owner:** [Automate Frontend](https://mate.adjust.com/teams/automate-frontend)

**Contacts:** automate-team@adjust.com, pavel.prokudin@adjust.com

---

Welcome to our little coding exercise. During this test you will be given the opportunity to play with JavaScript, React and rockets in the same project.

We recommend you to block a time slot of 2-3 hours to complete the exercise, but feel free to accommodate your time as needed. Also, before you begin **please make sure that you have read and understood this readme file entirely**. If there's anything that you don't understand, please don't hesitate to reach out and ask. For that, you can create a GitHub issue in your fork repo, describe your question(s) and mention users from the "collaborators" list below, we will be notified about your question and reach out to clarify shortly. 

Ultimately, we would like to give all candidates the same opportunity to solve the exercise in their own way, because of this, we kindly ask you **not to fork or share this repo (nor your solution) with anybody**

<img align="center" src="https://i.imgur.com/ekyJNd9.jpg" width="600">

## Instructions

1. Read all of the 'Exercise' section before you begin.
2. You **MUST clone** this repo to a location of your choosing where you can work on your solution. [See how to clone a repository here](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)
3. Write your solutions inside of the files contained in **`src/solutions`**.
4. Complete each task before advancing to the next one. For this, we have provided tests for each solution which you can easily run with **`yarn test:N_task`** (where **`N`** is the number of the current task). **Make sure all tests are green, and please DO NOT modify anything inside of `src/tests`.**
5. Once you have finished all tasks you may run **`yarn test:all`** to double-check everything is working as expected.
6. Push your solution to a **private repo** in your **personal Github account**.
7. When you are ready for us to take a look, just add the following users as collaborators to your repo: `paul-pro`, `AragonCodes`, `Sc4ramouche`, `henderjarr`.

## Exercise

---

### PART 1 - JavaScript

---

### TASK 1

Implement `prepareData` higher order function, which takes an object of filter params `{year, customerName}`, and returns a function that processes a list of missions, by only showing the ones that were launched in `year` and carried a payload belonging to `customerName`.

**OBSERVATIONS**

- **Important: Please be aware that this task is significantly more complex than all the rest.**
- You can use any **utility** library you see fit.
- Missions should appear in inverse chronological order (sort), with the exception of those that carried more payloads should appear first.
- Payloads are carried in the second stage of a rocket and they can belong to multiple customers.
- It doesn't matter to which `customerName` each payload belongs to as long as `customerName` is the customer.

**EXAMPLE**

Considering we have the list of missions from `src/tests/__fixtures__/data.json`, and the following filter params:

```js
{
  year: 2018,
  customerName:
}
```

The expected result would be:

```js
[
  {
    flight_number: 62,
    mission_name: "Iridium NEXT Mission 6",
    payloads_count: 2,
  },
  {
    flight_number: 72,
    mission_name: "CRS-16",
    payloads_count: 1,
  },
  {
    flight_number: 64,
    mission_name: "CRS-15",
    payloads_count: 1,
  },
  {
    flight_number: 60,
    mission_name: "TESS",
    payloads_count: 1,
  },
  {
    flight_number: 59,
    mission_name: "CRS-14",
    payloads_count: 1,
  },
];
```

---

### PART 2 - React

---

### TASK 2

Implement `useRocketsData` hook, which takes an object of filter params `{year, customerName}`, fetches **the whole list of mission** from [SpaceX API](https://api.spacexdata.com/v3/launches/past), and returns an object `{rockets}`, where `rockets` are missions that have been processed with `prepareData`.

**OBSERVATIONS**

- Returned `rockets` should be re-processed with `prepareData` every time that filter params object (hook's argument) is updated.
- You are not allowed to use any of the filter parameters provided by the SpaceX API, just fetch all available data and process it with `prepareData` function.

---

### TASK 3

Implement `RocketItem` component which takes `rocket` as a prop and renders a `div` with a string using template literals. The string must have the following format: "#`flight_number` `mission_name` (`payloads_count`)"

**EXAMPLE**

Considering we have the following rocket:

```js
{
  flight_number: 99,
  mission_name: "Adjust Mission",
  payloads_count: 4,
}
```

The formatted string would be:

```txt
#99 Adjust Mission (4)
```

---

### TASK 4

Implement `RocketsList` component that uses `useRocketsData` hook with `FILTER_PARAMS` as argument (constant defined in solution file) and renders `rockets` as a list of `RocketItem`s.

**OBSERVATIONS**

- `FILTER_PARAMS` is already defined in `src/solutions/4_task.js` file

**EXAMPLE**

Considering we pass `FILTER_PARAMS` to `useRocketsData` hook, the expected render would be:

```txt
#62 Iridium NEXT Mission 6 (2)
#72 CRS-16 (1)
#64 CRS-15 (1)
#60 TESS (1)
#59 CRS-14 (1)
```

## Helpful links

- [SpaceX API Docs][spacex-api]
- [Inviting collaborators to a personal repository][github-collaborators]

[spacex-api]: https://docs.spacexdata.com/?version=latest#fce450d6-e064-499a-b88d-34cc22991bcc
[github-collaborators]: https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository
