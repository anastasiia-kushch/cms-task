# Campaign Management App

This project is a React-based web application implementing a CRUD interface for managing sales campaigns. It allows sellers to create, edit, delete, and view campaigns for their products. The app is built to be responsive and user-friendly, with mock backend data served via `json-server`.

---

## Project Overview

The main goal of this project was to implement a campaign management system with the following features:

- **Create**, **Read**, **Update**, and **Delete** (CRUD) campaigns.
- Campaigns contain essential fields:
  - Campaign name (mandatory)
  - Keywords (mandatory, with pre-populated typeahead suggestions)
  - Bid amount (mandatory, minimum value enforced)
  - Campaign fund (mandatory, deducted from the Emerald account balance, which updates live)
  - Status (on/off, mandatory)
  - Town (selectable from a predefined dropdown list)
  - Radius (mandatory, in kilometres)
- Responsive design to work smoothly on different screen sizes.
- Clean, readable, and styled UI using CSS (with optional CSS preprocessor support).
- Mock backend using `json-server` to simulate data persistence (not evaluated but included for completeness).

---

## Getting Started

To get familiar with the project, follow these steps:

### Prerequisites:

Node.js and npm installed on your machine

### Installation and running locally

1.  Clone the repository:

```bash
git clone https://github.com/anastasiia-kushch/cms-task.git
cd cms-task
```

2.  Install dependencies:

```bash
npm install
```

3.  Start the mock backend server:

```bash
npm run server
```

This will start `json-server` at `http://localhost:3001`.

4. Open your browser and go to [cms-task-eight.vercel.app](https://cms-task-eight.vercel.app/)

OR

4. Start the React development server:

```bash
npm run dev
```

5.  Open your browser and go to:

```
http://localhost:3000
```

You can now interact with the app locally.

---

## Features

- Add new campaigns with validation on required fields.
- Edit existing campaigns.
- Delete campaigns.
- Real-time update of account balance after deducting campaign funds.
- Searchable and pre-populated keywords with typeahead support.
- Selection of towns from a dropdown.
- Responsive and clean user interface.

---

## Notes

- The backend is mocked with `json-server` to simulate data storage.

---