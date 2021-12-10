# React & Rockets

**Description:** Challenge for Adjust Frontend Developer

**Owner:** [adjust](https://github.com/adjust)

**Contacts:** frontend-hiring@adjust.com

---

## Welcome to our little coding exercise! 👋

Here you will be given the opportunity to play with JavaScript and Rockets in the same project. For this, we recommend you to block 2-3 hours of your time to complete it.

**Please make sure you have read this page entirely, before starting the challenge**. If you have any doubts, please reach out to us by [opening an issue](https://github.com/adjust/react-and-rockets#how-to-request-help) as described at the bottom of this page.

**Importantly**, we would like to give all candidates taking this test the same opportunity to solve the exercise in their own way. Because of this, **please do not fork or share this repo (nor your solution) with anybody 🙏🏻**

<img align="center" src="https://i.imgur.com/ekyJNd9.jpg" width="600">

## Instructions

1. You **MUST [clone this repo](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)** to a location of your choosing where you can work on your solution
2. Write your solutions inside of the files contained in **`src/solutions`**, making sure the provided tests are green. **Please do not modify anything inside of `src/tests`**
3. Push your solution to a **private repo** in your **personal Github account**
4. When you are ready for us to take a look, please add [adjust-frontend-hiring][adjust-frontend-hiring] (GitHub user) as collaborator

## Important rules

Your challenge submission will be disqualified and automatically rejected if any of the following happens:

- Your **repo was not properly cloned** as specified on step #1 of Instructions. [See how to clone a repository here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository). **Note:** If you cloned the repo properly, previous commits from this (original) repo, must be showing on your git history.
- Your **tests are not passing** (green) as specified on step #2 of Instructions. **Note:** You can run tests with `npm run test` or `yarn test` (according to the package manager you are using).
- You **have modified any of the files inside of `src/tests`** as specified on step #2 of Instructions.
- Your **repo visibility is not set to private** as specified on step #3 of Instructions. [See how to make a repository private here](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).

---

## Exercise

### TASK #1 - JavaScript

Implement `prepareData` higher order function, which takes an object of filter params `{year, customerName}`, and returns a function that processes a list of missions, by only showing the ones that were launched in `year` and carried a payload belonging to `customerName`.

**Observations:**

- You can use any **utility** library you see fit
- Missions should appear in inverse chronological order (sort), with the exception of those that carried more payloads should appear first.
- Payloads are carried in the second stage of a rocket and they can belong to multiple customers.
- It doesn't matter to which `customerName` 'program' each payload belongs to as long as `customerName` is the customer.

**Example:**

Considering we have the list of missions from this [data fixture][data-fixture], and the following filter params:

```js
{
  year: 2018,
  customerName: "NASA"
}
```

The expected result should be:

```js
[
  {
    flight_number: 62,
    mission_name: 'Iridium NEXT Mission 6',
    payloads_count: 2,
  },
  {
    flight_number: 72,
    mission_name: 'CRS-16',
    payloads_count: 1,
  },
  {
    flight_number: 64,
    mission_name: 'CRS-15',
    payloads_count: 1,
  },
  {
    flight_number: 60,
    mission_name: 'TESS',
    payloads_count: 1,
  },
  {
    flight_number: 59,
    mission_name: 'CRS-14',
    payloads_count: 1,
  },
];
```

---

### TASK #2 - React & Hooks

Implement `RocketsList` component with the following specifications:

1. It takes `filerParams` object (with shape described in [task #1][task-1]) as a prop
2. It obtains a list of 'missions' from a [custom hook][custom-hook], which uses [global fetch][global-fetch] (`window.fetch`) to _GET_ **the whole list of missions** from [SpaceX API][spacex-api] and processes them with `prepareData` function (from [task #1][task-1]) and `filterParams` prop
3. For each 'mission' obtained from the custom hook, it renders a string using [template literals][template-literals] with the following format: "#`flight_number` `mission_name` (`payloads_count`)"
4. While 'missions' are being fetched from API, it renders `"Loading..."` to screen
5. If no 'missions' are obtained from the custom hook, it renders `"No data"` to screen

**Observations:**

- Missions processing with `prepareData` must happen **inside** the custom hook
- The list of missions should be re-processed if `filterParams` prop changes, **BUT no new API calls should happen** to [SpaceX API][spacex-api]
- You are not allowed to use any of the filter parameters provided by the [SpaceX API docs][spacex-api-docs], just fetch all available data and process it with `prepareData` function
- Only [global fetch][global-fetch] (`window.fetch`) can be used to make API requests

**Example:**

Considering we pass the following `filterParams` as a prop:

```js
{
  year: 2018,
  customerName: "NASA"
}
```

The expected render should be:

```txt
#62 Iridium NEXT Mission 6 (2)
#72 CRS-16 (1)
#64 CRS-15 (1)
#60 TESS (1)
#59 CRS-14 (1)
```

## How to request help

If you have any doubts, you can reach out to us by simply [creating a GitHub issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue#creating-an-issue-from-a-repository) in your private repo.

Describe your question(s) and [mention](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#mentioning-people-and-teams) [adjust-frontend-hiring][adjust-frontend-hiring] in your comments (don't forget to add user as collaborator). We will then receive a notification and get back to you as soon as possible.

## Helpful links

- [SpaceX API Docs][spacex-api-docs]
- [Inviting collaborators to a personal repository][github-collaborators]

[spacex-api]: https://api.spacexdata.com/v3/launches/past
[spacex-api-docs]: https://docs.spacexdata.com/?version=latest#fce450d6-e064-499a-b88d-34cc22991bcc
[github-collaborators]: https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository
[task-1]: https://github.com/adjust/react-and-rockets#task-1---javascript
[template-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[custom-hook]: https://reactjs.org/docs/hooks-custom.html
[data-fixture]: https://github.com/adjust/react-and-rockets/tree/main/src/tests/__fixtures__/data.json
[adjust-frontend-hiring]: https://github.com/adjust-frontend-hiring
[global-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/fetch
