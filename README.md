![Screenshot of landing page](https://imgur.com/u8tfyr0.jpg)

# Game Storefront with Reviews

I built out a [GraphQL wrapper for OpenCritic's API](https://github.com/jakelear/opencritic-graphql) and then put this little interface, including a game search landing page and a game page that showcases the reviews.

![Screenshot of reviews page](https://i.imgur.com/KjNz2O9.jpg)

## Setup

You'll need the GraphQL server to deliver the OpenCritic API: clone https://github.com/jakelear/opencritic-graphql - follow instructions there to get the GraphQL server running.

Then in this repository:

1. `npm install`
2. `npm start`

## Info

The application is written in [React](https://reactjs.org/), styled with [css modules](https://github.com/css-modules/css-modules), and compiled with [Parcel](https://parceljs.org/). It uses [Apollo Client](https://github.com/apollographql/apollo-client) to query GraphQL, [Prettier](https://prettier.io/) for code formatting and is linted with [ESLint](https://eslint.org/).

## Attributions

The design of the review page is straight from Epic Games' Trello board.
The game reviews are provided by [OpenCritic](https://opencritic.com).
