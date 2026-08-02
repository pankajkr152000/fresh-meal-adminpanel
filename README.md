# 🍽️ FreshMeal Admin Panel

<div align="center">

## 🚀 Enterprise Feature-Based React Architecture

_A scalable, maintainable, and modular React application built using Feature-Driven Design._

---

**Tech Stack**

⚛️ React • ⚡ Vite • 🎨 Bootstrap • 🌐 Axios • 📦 Feature-Based Architecture

</div>

---

# 📖 Table of Contents

- 🌟 Project Overview
- 🏗️ Architecture Overview
- 📂 Folder Structure
- 🎯 Architecture Principles
- 🧩 Feature Architecture
- 🌍 Global Shared Architecture
- 🖥️ Application Shell
- 📦 Folder Responsibilities
- 📋 Development Guidelines
- 🚫 What NOT To Do
- ➕ Adding a New Feature
- 📈 Future Scalability

---

# 🌟 Project Overview

FreshMeal Admin Panel follows a **Feature-Based Architecture**.

Instead of scattering files across folders like:

```
components/
pages/
hooks/
services/
utils/
```

each business module owns everything it needs.

Example:

```
Foods
Orders
Customers
Restaurants
Offers
```

Each feature is completely independent.

---

# 🏗️ Architecture Overview

```text
                           ┌────────────────────┐
                           │     React App      │
                           └─────────┬──────────┘
                                     │
         ┌───────────────────────────┼────────────────────────────┐
         │                           │                            │
         ▼                           ▼                            ▼

    ┌───────────┐              ┌────────────┐              ┌──────────┐
    │ Features  │              │   Global   │              │  Shell   │
    └─────┬─────┘              └─────┬──────┘              └────┬─────┘
          │                          │                          │
          │                          │                          │
   Foods, Orders,             Shared Components          Sidebar
   Customers...               Shared Utils               Menubar
                              Shared Services
                              Shared Constants
```

---

# 📂 Project Structure

```text
src/
│
├── api/
│
├── assets/
│
├── features/
│   ├── foods/
│   ├── orders/
│   ├── customers/
│   ├── restaurants/
│   └── offers/
│
├── global/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── layouts/
│   ├── prop-types/
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── routes/
│
├── shell/
│   ├── Menubar/
│   └── Sidebar/
│
├── App.jsx
└── main.jsx
```

---

# 🎯 Architecture Principles

## ✅ Feature First

Business logic belongs inside the feature.

```
features/
    foods/
```

---

## ✅ Global Only When Shared

If two or more features use it, move it to:

```
global/
```

Examples

- Pagination
- DataTable
- CommonInput
- ConfirmationModal
- ApiClient
- formatCurrency()

---

## ✅ Shell Contains Application Layout

```
shell/
```

Contains:

- Menubar
- Sidebar
- Footer (future)
- Navigation

---

## ✅ Infrastructure

```
api/
routes/
assets/
```

Contains only application infrastructure.

---

# 🧩 Feature Architecture

Every feature follows exactly the same structure.

```
features/
└── foods/
    │
    ├── pages/
    ├── components/
    ├── hooks/
    ├── services/
    ├── constants/
    ├── utils/
    ├── styles/
    ├── assets/
    ├── types/
    └── index.js
```

---

## 📌 Responsibilities

| Folder        | Responsibility              |
| ------------- | --------------------------- |
| 📄 pages      | Feature screens             |
| 🧩 components | UI specific to the feature  |
| 🪝 hooks      | Feature business logic      |
| 🌐 services   | API communication           |
| ⚙️ constants  | Feature configuration       |
| 🛠️ utils      | Feature helper functions    |
| 🎨 styles     | Feature CSS                 |
| 🖼️ assets     | Feature images/icons        |
| 📝 types      | PropTypes and feature types |

---

# 🌍 Global Shared Architecture

```
global/
│
├── components/
├── constants/
├── hooks/
├── layouts/
├── services/
├── styles/
├── utils/
└── prop-types/
```

---

## Shared Components

Examples

- Pagination
- DataTable
- Badge
- SearchBox
- CommonInput
- CommonSelect
- ConfirmationModal
- DetailCard
- LoadingSpinner

---

## Shared Utilities

Examples

- formatCurrency()
- formatDate()
- formatNumber()
- ImageUtils
- DateUtils

---

## Shared Services

Examples

- ApiClient
- AuthService (future)
- StorageService (future)

---

# 🖥️ Application Shell

```
shell/
│
├── Menubar/
└── Sidebar/
```

These are **application layout components**, not reusable UI components.

---

# 📦 Dependency Flow

```
                    +-------------------+
                    |       App         |
                    +---------+---------+
                              |
               +--------------+--------------+
               |                             |
               ▼                             ▼
          Features                      Global
               │                             │
               │                             │
               ▼                             ▼
            Services                    Shared Utils
               │
               ▼
            API Client
```

---

# 📋 Development Guidelines

## ✅ DO

✔ Keep feature code inside the feature.

✔ Reuse global components.

✔ Keep business logic inside hooks.

✔ Keep API calls inside services.

✔ Keep constants organized.

✔ Keep helper functions inside utils.

✔ Use meaningful folder names.

---

# 🚫 DON'T

❌ Don't put Food components inside Global.

❌ Don't import one feature into another.

❌ Don't duplicate reusable components.

❌ Don't place business logic inside pages.

❌ Don't scatter files across unrelated folders.

---

# ➕ Adding a New Feature

Create a new folder:

```
features/
└── orders/
```

Copy the structure:

```
pages/
components/
hooks/
services/
constants/
utils/
styles/
assets/
types/
```

Implement business logic.

Done.

---

# 📈 Scalability

Current

```
Features
│
├── Foods
└── Orders
```

Future

```
Features
│
├── Foods
├── Orders
├── Customers
├── Restaurants
├── Categories
├── Offers
├── Users
├── Coupons
├── Reports
├── Notifications
└── Settings
```

No architecture changes required.

---

# ⭐ Architecture Rules

### Rule 1

Feature-specific code belongs inside:

```
features/
```

---

### Rule 2

Reusable code belongs inside:

```
global/
```

---

### Rule 3

Application layout belongs inside:

```
shell/
```

---

### Rule 4

Infrastructure belongs inside:

```
api/
routes/
assets/
```

---

### Rule 5

Every feature must follow the same structure.

No exceptions.

---

# 🎉 Conclusion

This architecture provides:

- 🚀 High Scalability
- 🧩 Modular Features
- ♻️ Maximum Reusability
- 🛠️ Easy Maintenance
- 👥 Team-Friendly Structure
- 📈 Enterprise-Level Organization

The **Food** module serves as the reference implementation, and every future feature should follow the same blueprint to keep the project consistent and maintainable.

---

<div align="center">

## ❤️ Happy Coding!

**FreshMeal Admin Panel**
_Built with clean architecture, consistency, and scalability in mind._

</div>
