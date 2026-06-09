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
  - [Required to install](#required-to-install)
  - [Environment](#environment)
  - [Clone](#clone)
  - [Setup](#setup)
  - [How to run local](#how-to-run-local)
  - [How to run Docker](#how-to-run-docker)
- [Usage](#usage)
  - [How to run tests](#how-to-run-tests)
  - [How to Checkstyle](#how-to-checkstyle)
  - [Turnstile Captcha](#turnstile-captcha)
  - [WayforPay Integration](#wayforpay-integration)
- [Documentation](#documentation)
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

### API Documentation

Documentation is rendered with [Redoc](https://redocly.github.io/redoc/) at `/api-docs`.

#### File Structure

```
app/
├── api/
│   ├── docs/
│   │   └── route.ts         # Combines all specs and serves OpenAPI JSON
│   └── [your-endpoint]/
│       ├── openapi.json     # Endpoint API specification
│       └── route.ts         # Endpoint API handler
└── api-docs/
    ├── layout.tsx           # Isolated layout for docs page
    └── page.tsx             # Redoc renderer
```

#### Adding New API Documentation

1. Create `openapi.json` in your endpoint folder:

```
   app/api/[your-endpoint]/openapi.json
```

2. Import and merge in `app/api/docs/route.ts`:

```ts
import newSpec from '../[your-endpoint]/openapi.json';

export async function GET() {
  return Response.json({
    // ... info, servers ...
    paths: {
      ...existingSpec.paths,
      ...newSpec.paths
    },
    components: {
      schemas: {
        ...existingSpec.components?.schemas,
        ...newSpec.components?.schemas
      }
    }
  });
}
```

3. Verify at `/api-docs`

### How to run tests

- To run all unit tests open terminal and run `npm run test` in it.
- To run single unit test file run `npm run test -- {component}.test.tsx`.

### How to Checkstyle

---

## Documentation

### Folder structure

```markdown
├── public/ # Static assets (icons, images, mock news images)
│ └── images/ # Categorized image assets (biography, events, partners)
├── app/ # Main application source (Next.js App Router)
│ ├── [lang]/ # Localization-based routing wrapper
│ │ ├── about-us/ # Foundation history and mission pages
│ │ ├── archive/ # Digital archives ([fund] and [case] dynamic routes)
│ │ ├── artistry/ # Creative and artistic activity sections
│ │ ├── biography/ # Liatoshynsky biography with interactive content
│ │ ├── contacts/ # Contact pages with feedback info
│ │ ├── news/ # Media center and foundation news
│ │ ├── research/ # Scientific research and publications section
│ │ └── war-in-ukraine/ # Dedicated section for current events/impact
│ ├── api/ # Server-side API routes (Route Handlers)
│ │ ├── compositions/ # CRUD for musical compositions (data, filters, titles)
│ │ ├── scientific-works/ # Management of scientific publications and filtering
│ │ ├── blob-url/ # Azure Storage integration for media URLs
│ │ ├── create-invoice/ # Payment and donation processing logic
│ │ └── health/ # API health monitoring endpoint
│ ├── di/ # Dependency Injection layer
│ │ └── modules/ # Inversify or custom DI module definitions
│ ├── domain/ # Core business logic and types
│ │ └── dto/ # Data Transfer Objects for API-Client communication
│ ├── infrastructure/ # Data Access Layer
│ │ ├── db/ # Database connection logic
│ │ ├── models/ # Database schemas (Archive, News, ScientificWorks)
│ │ └── repositories/ # Repository pattern for DB abstraction
│ ├── services/ # Application Business Services
│ │ ├── scientific-works/ # Business logic for scientific data
│ │ ├── email/ # Email sending services and templates
│ │ ├── pages-data/ # Dynamic content aggregation for various pages
│ │ └── upload/ # File handling and Azure Blob Storage services
│ ├── shared/ # Reusable core codebase
│ │ ├── components/ # Global UI Components
│ │ │ ├── design-system/ # Atomic components
│ │ │ ├── blocks/ # Complex UI sections
│ │ │ ├── tables/ # Advanced data tables
│ │ │ ├── forms/ # Specialized forms
│ │ │ ├── Header/ # Site navigation with AudioPlayer integration
│ │ │ ├── Footer/ # Multi-section footer with social media links
│ │ │ └── design-system/ # Atomic design system
│ │ ├── hooks/ # React hooks
│ │ ├── context/ # Global state management
│ │ ├── layouts/ # Shared page layouts
│ │ └── exceptions/ # Custom error handling and domain-specific errors
│ ├── types/ # Global TypeScript definitions, enums, and interfaces
│ ├── validators/ # Data validation schemas
│ └── middleware/ # Next.js middleware
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

#### Team Lv-680.5

[![@Mav-Ivan](https://avatars.githubusercontent.com/u/110425368?v=4&size=250)](https://github.com/Mav-Ivan)

#### Team Lv-680.10

<a href="https://github.com/Mike-Popovych"><img src="https://avatars.githubusercontent.com/u/125293578?v=4" width="250" alt="@Mike-Popovych"></a>

#### Team Lv-680.11

[![@Renatavl](https://avatars.githubusercontent.com/u/86105228?v=4&size=250)](https://github.com/Renatavl)

#### Team Lv-680.12

<a href="https://github.com/markgol777"><img src="https://avatars.githubusercontent.com/u/66869816?v=4" width="250" alt="@markgol777"></a>
[![@VKormylo](https://avatars.githubusercontent.com/u/65959529?v=4&size=250)](https://github.com/VKormylo)
<a href="https://github.com/nebby2105"><img src="https://avatars.githubusercontent.com/u/154923065?v=4" width="250" alt="@nebby2105"></a>
[![@SofiiaYevush](https://avatars.githubusercontent.com/u/142519729?v=4&size=250)](https://github.com/SofiiaYevush)
[![@ArtemHolikov](https://avatars.githubusercontent.com/u/102384883?v=4&size=250)](https://github.com/ArtemHolikov)
[![@sandrvvu](https://avatars.githubusercontent.com/u/105361812?v=4&size=250)](https://github.com/sandrvvu)

#### Team Lv-680.13

[![@yur4uwe](https://avatars.githubusercontent.com/u/157615455?v=4&size=250)](https://github.com/yur4uwe)
[![@uliaescha](https://avatars.githubusercontent.com/u/136600464?v=4&size=250)](https://github.com/uliaescha)
[![@Iarynovskyi](https://avatars.githubusercontent.com/u/164883382?v=4&size=250)](https://github.com/Iarynovskyi)
[![@danikua](https://avatars.githubusercontent.com/u/115005047?v=4&size=250)](https://github.com/danikua)
[![@lizabre](https://avatars.githubusercontent.com/u/108484546?v=4&size=250)](https://github.com/lizabre)
[![@oleg191006](https://avatars.githubusercontent.com/u/156513251?v=4&size=250)](https://github.com/oleg191006)
<a href="https://github.com/TARDeus524"><img src="https://avatars.githubusercontent.com/u/142096148?v=4" width="250" alt="@TARDeus524"></a>
[![@IrynaKhylchuk](https://avatars.githubusercontent.com/u/141860021?v=4&size=250)](https://github.com/IrynaKhylchuk)
[![@luvthenika](https://avatars.githubusercontent.com/u/124041223?v=4&size=250)](https://github.com/luvthenika)
[![@irynalaitaruk](https://avatars.githubusercontent.com/u/30904237?v=4&size=250)](https://github.com/irynalaitaruk)

#### Team UA-5044

[![@ssashayurchenko](https://avatars.githubusercontent.com/u/160735952?v=4&size=250)](https://github.com/ssashayurchenko)
<a href="https://github.com/bohuslavstan"><img src="https://avatars.githubusercontent.com/u/156684724?v=4" width="250" alt="@bohuslavstan"></a>
[![@Kryzhanivsky](https://avatars.githubusercontent.com/u/77616134?v=4&size=250)](https://github.com/Kryzhanivsky)

#### Team UA-5195

[![@qqwz0](https://avatars.githubusercontent.com/u/105491259?v=4&size=250)](https://github.com/qqwz0)
[![@NatalyKrvch](https://avatars.githubusercontent.com/u/105675637?v=4&size=250)](https://github.com/NatalyKrvch)
[![@stsvt](https://avatars.githubusercontent.com/u/167477637?v=4&size=250)](https://github.com/stsvt)
[![@Taras-ep](https://avatars.githubusercontent.com/u/151529282?v=4&size=250)](https://github.com/Taras-ep)
[![@ruslansymonenko](https://avatars.githubusercontent.com/u/99801898?v=4&size=250)](https://github.com/ruslansymonenko)
[![@alisa-korniienko](https://avatars.githubusercontent.com/u/33879792?v=4&size=250)](https://github.com/alisa-korniienko)
[![@LischenkoYaroslav](https://avatars.githubusercontent.com/u/47635043?v=4&size=250)](https://github.com/LischenkoYaroslav)
[![@MaksFullJs](https://avatars.githubusercontent.com/u/182541010?v=4&size=250)](https://github.com/MaksFullJs)
<a href="https://github.com/Xlopuk"><img src="https://avatars.githubusercontent.com/u/182114610?v=4" width="250" alt="@Xlopuk"></a>
[![@kolibri753](https://avatars.githubusercontent.com/u/89083538?v=4&size=250)](https://github.com/kolibri753)
[![@DenisGordProgrammer](https://avatars.githubusercontent.com/u/152603666?v=4&size=250)](https://github.com/DenisGordProgrammer)
[![@krxllll](https://avatars.githubusercontent.com/u/51999128?v=4&size=250)](https://github.com/krxllll)

#### Team UA-5353

[![@dest411](https://avatars.githubusercontent.com/u/146329542?v=4&size=250)](https://github.com/dest411)
[![@kandyba](https://avatars.githubusercontent.com/u/11414249?v=4&size=250)](https://github.com/kandyba)
[![@Jevgan](https://avatars.githubusercontent.com/u/134773983?v=4&size=250)](https://github.com/Jevgan)
[![@navimov](https://avatars.githubusercontent.com/u/108539100?v=4&size=250)](https://github.com/navimov)
[![@Fedorieieva](https://avatars.githubusercontent.com/u/115637318?v=4&size=250)](https://github.com/Fedorieieva)
[![@Th0mas-H0ward](https://avatars.githubusercontent.com/u/86684680?v=4&size=250)](https://github.com/Th0mas-H0ward)

#### Team UA-5354

[![@annak413](https://avatars.githubusercontent.com/u/126970705?v=4&size=250)](https://github.com/annak413)
[![@LightOrden](https://avatars.githubusercontent.com/u/88787118?v=4&size=250)](https://github.com/LightOrden)
[![@varenichek22](https://avatars.githubusercontent.com/u/141062073?v=4&size=250)](https://github.com/varenichek22)
[![@dmitryzh100](https://avatars.githubusercontent.com/u/171498292?v=4&size=250)](https://github.com/dmitryzh100)
[![@telare](https://avatars.githubusercontent.com/u/123264591?v=4&size=250)](https://github.com/telare)
[![@yuliiayarova](https://avatars.githubusercontent.com/u/239369502?v=4&size=250)](https://github.com/yuliiayarova)
[![@vladashvch](https://avatars.githubusercontent.com/u/144835895?v=4&size=250)](https://github.com/vladashvch)
[![@pALINchuk](https://avatars.githubusercontent.com/u/104020656?v=4&size=250)](https://github.com/pALINchuk)
[![@Halyna-Trush](https://avatars.githubusercontent.com/u/216411684?v=4&size=250)](https://github.com/Halyna-Trush)
[![@Yushchyk-Roman](https://avatars.githubusercontent.com/u/182556428?v=4&size=250)](https://github.com/Yushchyk-Roman)
[![@Fronik123](https://avatars.githubusercontent.com/u/81983712?v=4&size=250)](https://github.com/Fronik123)
[![@premiumderyn](https://avatars.githubusercontent.com/u/219176726?v=4&size=250)](https://github.com/premiumderyn)
[![@dianajnxv](https://avatars.githubusercontent.com/u/121499947?v=4&size=250)](https://github.com/dianajnxv)

### DevOps team

[![@qwqw-333](https://avatars.githubusercontent.com/u/132368159?v=4&size=250)](https://github.com/qwqw-333)
<a href="https://github.com/denchik911"><img src="https://avatars.githubusercontent.com/u/61146063?v=4" width="250" alt="@denchik911"></a>

### Designer team

[![@Nastia197](https://avatars.githubusercontent.com/u/76164279?v=4&size=250)](https://github.com/Nastia197)
[![@a-humanenko](https://avatars.githubusercontent.com/u/192996565?v=4&size=250)](https://github.com/a-humanenko)
[![@Valigura](https://avatars.githubusercontent.com/u/12103932?v=4&size=250)](https://github.com/Valigura)
<a href="https://github.com/JuliaKharaim"><img src="https://avatars.githubusercontent.com/u/170419178?v=4" width="250" alt="@JuliaKharaim"></a>

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2025 © <a href="https://softserve.academy/" target="_blank"> SoftServe Academy</a>.
