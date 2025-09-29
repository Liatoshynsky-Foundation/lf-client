<a href="https://softserve.academy/"><img src="https://softserve.academy/pluginfile.php/1/theme_boost_union/logocompact/300x300/1739968192/softserve_academy_logo-2023.png" title="SoftServe Academy" alt="SoftServe Academy"></a>

<img src="./public/images/liatoshynsky-thumbnail.jpg" title="Liatoshynsky Foundation" alt="Liatoshynsky Foundation">

# Liatoshynsky Foundation

«Liatoshynsky Foundation» присвячений популяризації творчості Бориса Лятошинського – видатного українського композитора, представника модернізму та експресіонізму.

[![Github Issues](https://img.shields.io/github/issues/Liatoshynsky-Foundation/lf-client?style=flat-square)](https://github.com/Liatoshynsky-Foundation/lf-client/issues)
[![Pending Pull-Requests](https://img.shields.io/github/issues-pr/Liatoshynsky-Foundation/lf-client?style=flat-square)](https://github.com/Liatoshynsky-Foundation/lf-client/pulls)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

---

## Table of Contents

- [Installation](#installation)
  - [Required to install](#Required-to-install)
  - [Environment](#Environment)
  - [Clone](#Clone)
  - [Setup](#Setup)
  - [How to run local](#How-to-run-local)
  - [How to run Docker](#How-to-run-Docker)
- [Usage](#Usage)
  - [How to work with swagger UI](#How-to-work-with-swagger-UI)
  - [How to run tests](#How-to-run-tests)
  - [How to Checkstyle](#How-to-Checkstyle)
  - [Turnstile Captcha](#turnstile-captcha)
  - [WayforPay Integration](#wayforpay-integration)
- [Documentation](#Documentation)
- [Contributing](#contributing)
  - [git flow](#git-flow)
  - [issue flow](#git-flow)
- [Team](#team)
  - [Mentors](#mentors)
  - [Experts](#experts)
  - [Development team](#development-team)
  - [DevOps team](#devops-team)
  - [Designer team](#designer-team)
- [License](#license)

---

## Installation

---

## Turnstile Captcha

This project uses [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) for user verification before allowing donations. Turnstile is a privacy-focused captcha solution that helps prevent automated abuse while maintaining a smooth user experience.

- The captcha widget appears when a user initiates a donation.
- The backend verifies the token received from Turnstile before processing payment requests.
- See `TurnstileWidget` in the codebase for implementation details.

## WayforPay Integration

Donations are processed using [WayforPay](https://wayforpay.com/), a secure payment gateway widely used in Ukraine.

- When a donation is initiated and captcha verification succeeds, an invoice is created via the WayforPay API.
- The payment widget is loaded dynamically and presented to the user for completing the transaction.
- See the donation flow in `Donate.tsx` for integration details.

- All the `code` required to get started
- Images of what it should look like

### Required to install

- NodeJS (22.0.0)

### Environment

environmental variables

```properties
spring.datasource.url=${DATASOURCE_URL}
spring.datasource.username=${DATASOURCE_USER}
spring.datasource.password=${DATASOURCE_PASSWORD}
spring.mail.username=${EMAIL_ADDRESS}
spring.mail.password=${EMAIL_PASSWORD}
cloud.name=${CLOUD_NAME}
api.key=${API_KEY}
api.secret=${API_SECRET}
```

### Clone

- Clone this repo to your local machine using `git@github.com:Liatoshynsky-Foundation/lf-client.git`

### Setup

- If you want more syntax highlighting, format your code like this:

> update and install this package first

```shell
$ brew update
$ brew install SOMEREPOproductions
```

> now install npm and bower packages

```shell
$ npm install
$ bower install
```

- For all the possible languages that support syntax highlithing on GitHub (which is basically all of them), refer <a href="https://github.com/github/linguist/blob/master/lib/linguist/languages.yml" target="_blank">here</a>.

### How to run local

```bash
npm run dev
```

### How to run Docker

---

## Usage

### How to work with swagger UI

### How to run tests

- To run all unit tests open terminal and run `npm run test` in it.
- To run single unit test file run `npm run test -- {component}.test.tsx`.

### How to Checkstyle

---

## Documentation

### Folder structure

```markdown
app/
├── [lang]/
│ ├── events/
│ │ ├── page.tsx # /[lang]/events (list of events)
│ │ ├── [slug]/
│ │ │ └── page.tsx # /[lang]/events/:slug (individual event)
│ │ ├── layout.tsx # Optional layout for events
│ │ ├── components/ # Events-specific components
│ │ │ ├── Events.tsx
│ │ │ └── Event.tsx
│ ├── biography/
│ │ └── page.tsx # /[lang]/biography
│ ├── media-about-us/
│ │ └── page.tsx # /[lang]/media-about-us
│ ├── collaboration/
│ │ └── page.tsx # /[lang]/collaboration
├── shared/
│ ├── components/
│ │ ├── design-system/
│ │ │ └── button/
│ │ │ ├── Button.test.tsx
│ │ │ ├── Button.tsx
│ │ │ └── Button.styles.ts
│ │ ├── Header.tsx
│ │ └── Footer.tsx
│ └── hooks/
│ └── useAuth.ts
├── api/
│ ├── events/
│ │ ├── route.ts # /api/events (list, create)
│ │ └── [slug]/
│ │ └── route.ts # /api/events/:slug (read, update, delete)
├── models/
│ └── Event.ts # Mongoose Event schema and model
├── db/
│ └── connect.ts # MongoDB connection logic
├── middleware/
│ ├── logger.ts
│ └── authentication.ts
├── lib/
│ ├── axiosAPI.ts
│ └── db.ts # Optional alias to db/connect.ts
├── constants/
├── middleware.ts # Root-level middleware (i18n, auth)
├── config/
│ └── index.ts # Environment variable parsing and validation
```

---

## Contributing

### Git flow

```mermaid
gitGraph
   commit id: "Initial commit"
   branch develop
   checkout develop
   commit id: "Setup project structure"
   branch feature/login
   checkout feature/login
   commit id: "Add login UI"
   commit id: "Connect login to backend"
   checkout develop
   merge feature/login id: "Merge login feature"
   branch release/1.0
   checkout release/1.0
   commit id: "Prepare release 1.0"
   checkout main
   merge release/1.0 id: "Merge release 1.0 into main"
   commit id: "Tag version v1.0"
   checkout develop
   merge release/1.0 id: "Merge release 1.0 back into develop"

   checkout main
   branch hotfix/1.0.1
   checkout hotfix/1.0.1
   commit id: "Fix critical bug in production"
   checkout main
   merge hotfix/1.0.1 id: "Merge hotfix into main"
   commit id: "Tag version v1.0.1"
   checkout develop
   merge hotfix/1.0.1 id: "Merge hotfix into develop"

```

> To get started...

#### Step 1

- **Option 1**
  g - 🍴 Fork this repo!

- **Option 2**
  - 👯 Clone this repo to your local machine using `https://github.com/ita-social-projects/SOMEREPO.git`

#### Step 2

- **HACK AWAY!** 🔨🔨🔨

#### Step 3

- 🔃 Create a new pull request using <a href="https://github.com/Liatoshynsky-Foundation/lf-client/compare/" target="_blank">github.com/Liatoshynsky-Foundation/lf-client</a>.

### Issue flow

---

## Team

### Mentors

[![@kolyasalubov](https://avatars.githubusercontent.com/u/36229492?v=4&size=250)](https://github.com/kolyasalubov)
[![@vlad-khrychov](https://avatars.githubusercontent.com/u/67462207?v=4&size=250)](https://github.com/vlad-khrychov)

### Experts

[![@bandvov](https://avatars.githubusercontent.com/u/48312647?v=4&size=250)](https://github.com/bandvov)
[![@myevd](https://avatars.githubusercontent.com/u/177050012?v=4&size=250)](https://github.com/myevd)

### Development team

[![@Mav-Ivan](https://avatars.githubusercontent.com/u/110425368?v=4&size=250)](https://github.com/Mav-Ivan)
[![@VKormylo](https://avatars.githubusercontent.com/u/65959529?v=4&size=250)](https://github.com/VKormylo)
[![@SofiiaYevush](https://avatars.githubusercontent.com/u/142519729?v=4&size=250)](https://github.com/SofiiaYevush)
[![@yur4uwe](https://avatars.githubusercontent.com/u/157615455?v=4&size=250)](https://github.com/yur4uwe)
[![@uliaescha](https://avatars.githubusercontent.com/u/136600464?v=4&size=250)](https://github.com/uliaescha)
[![@Iarynovskyi](https://avatars.githubusercontent.com/u/164883382?v=4&size=250)](https://github.com/Iarynovskyi)
[![@danikua](https://avatars.githubusercontent.com/u/115005047?v=4&size=250)](https://github.com/danikua)
[![@lizabre](https://avatars.githubusercontent.com/u/108484546?v=4&size=250)](https://github.com/lizabre)
[![@oleg191006](https://avatars.githubusercontent.com/u/156513251?v=4&size=250)](https://github.com/oleg191006)
[![@IrynaKhylchuk](https://avatars.githubusercontent.com/u/141860021?v=4&size=250)](https://github.com/IrynaKhylchuk)
[![@luvthenika](https://avatars.githubusercontent.com/u/124041223?v=4&size=250)](https://github.com/luvthenika)
[![@irynalaitaruk](https://avatars.githubusercontent.com/u/30904237?v=4&size=250)](https://github.com/irynalaitaruk)
[![@Mike-Popovych](https://avatars.githubusercontent.com/u/125293578?v=4&size=250)](https://github.com/Mike-Popovych)
[![@TARDeus524](https://avatars.githubusercontent.com/u/142096148?v=4&size=250)](https://github.com/TARDeus524)

### DevOps team

[![@qwqw-333](https://avatars.githubusercontent.com/u/132368159?v=4&size=250)](https://github.com/qwqw-333)
[![@denchik911](https://avatars.githubusercontent.com/u/61146063?v=4&size=250)](https://github.com/denchik911)

### Designer team

[![@Nastia197](https://avatars.githubusercontent.com/u/76164279?v=4&size=250)](https://github.com/Nastia197)
[![@a-humanenko](https://avatars.githubusercontent.com/u/192996565?v=4&size=250)](https://github.com/a-humanenko)
[![@Valigura](https://avatars.githubusercontent.com/u/12103932?v=4&size=250)](https://github.com/Valigura)
[![@JuliaKharaim](https://avatars.githubusercontent.com/u/170419178?v=4&size=250)](https://github.com/JuliaKharaim)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2025 © <a href="https://softserve.academy/" target="_blank"> SoftServe Academy</a>.
