# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

<br/>

### Features Implemented 
- Allow teachers to upload a link to the YouTube video on teacher view
![Features Implemented](https://i.imgur.com/Yi9WZBy.jpg)
- Show teachers a preview of the YouTube video and have pause breaks for interactivity 
![Features Implemented](https://i.imgur.com/TU9jMCc.jpg)
- Show the video in the student view
![Features Implemented](https://i.imgur.com/SGQ9J6q.jpg)
- Styling of YouTube video in the student view
![Features Implemented](https://i.imgur.com/VWoYy3F.jpg)
- Generate a transcript of the YouTube video <br>
![Features Implemented](https://i.imgur.com/ztxRJhC.jpg)
- Implement a comments feature for students to ask questions about the video
![Features Implemented](https://i.imgur.com/YvkroNi.jpg)
- Create a video editor, where teachers can have interactive pop up questions at various pause breaks throughout the video
![Features Implemented](https://i.imgur.com/TU9jMCc.jpg)

### Instructions for how to run the project locally 

`casmm-client-dev`

1. Install [Node](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)
2. Run `yarn` to install project dependencies
3. Run `yarn start` to startup the client (please note that much of the functionality will not work without also starting up the backend services)
4. Run `yarn add dotenv axios` to include the necessary packages for the OpenAI transcription API
5. Run `yarn add react-player` to include the necessary packages for to utilze the YouTube videos in the development enviornment in the program.
6. Navigate to chrome://flags/ and enable the #enable-experimental-web-platform-features flag (This will provide your browser access to serial ports)
7. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

8. Install [docker](https://docs.docker.com/get-docker/)

9. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted

### How to update database
- To update the database, follow all instructions to run the project locally FIRST
- Then input the following into your browser `http://localhost:1337/admin`
- This will give you access to the Strapi database if updates are needed

### Outstanding Work
- Create transcription field in Strapi database so the transcription of each video can be saved in the backend as team was having software issues with Strapi and was no able to get it implemented in the backend. Currently lacks the persistence from Teacher to Student view.
- Comments section is very buggy and fails to save in backend majority of times
- Pose timestamps of pause breaks in the Video Editor for teachers for them to easily view where the time stamps are

### Built Upon
- Utilized OpenAI's API for AI based transcription: https://platform.openai.com/docs/overview
- All other code is own based on various sources of documentation of necessary packages and logic. 

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **working** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **originalpull** - initial version of the forked repository 
- **CommentsJackie** - initial work for comments section
- **video** - video editor branch 

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **working** should squash and merge
- PRs to all other branches should create a merge commit
