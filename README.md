# Frat E-Com

A **Next.js + Tailwind CSS** e-commerce storefront that you can push to GitHub and deploy on Vercel in under 5 minutes.  
**Features**:
- **Silver & Black Theme**  
- **Firebase Firestore** to store products  
- **Firebase Storage** to upload & serve product images  
- **Admin UI** at `/admin` to add products **without coding**:  
  - **Manually** (upload a picture, enter name, price, description)  
  - **Automatically** (paste an AliExpress URL; it fetches via RapidAPI & adds to Firestore)  
- **User UI**: Browse products, view details, add to cart, view cart.  

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Setup Firebase](#setup-firebase)  
3. [Setup RapidAPI (AliExpress Data)](#setup-rapidapi-aliexpress-data)  
4. [Environment Variables](#environment-variables)  
5. [Local Development](#local-development)  
6. [Deploy to Vercel](#deploy-to-vercel)  
7. [How to Add Products (No Coding)](#how-to-add-products-no-coding)  
8. [Folder/File Explanation](#folderfile-explanation)  

---

## Prerequisites

- **Node.js** (v16+) & **npm**  
- **Git**  
- **Firebase Account** (for Firestore & Storage)  
- **RapidAPI Account** (subscribe to an AliExpress Data provider)  
- **Vercel Account** (for deployment)

---

## Setup Firebase

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project (e.g., “FratEcom”).  
2. In the sidebar, under **Build → Firestore Database**, click “Create database.” Choose “Start in test mode” (for quick setup).  
3. Under **Build → Storage**, click “Get Started.” Choose “Start in test mode.” Accept defaults.  
4. In **Project Settings → Your apps**, add a new **Web app**.  
   - Copy the **Firebase SDK config** object (you’ll need each field for `.env.local` under `NEXT_PUBLIC_FIREBASE_…`).  
5. In **Project Settings → Service Accounts → Firebase Admin SDK**, click “Generate new private key.”  
   - It will download a `serviceAccountKey-XXXXX.json` file. **Rename** it to `serviceAccountKey.json` and place it in the project root (next to `package.json`).  
   - **Important**: Do not commit `serviceAccountKey.json` to GitHub! Add it to `.gitignore`.

---

## Setup RapidAPI (AliExpress Data)

1. Go to [https://rapidapi.com](https://rapidapi.com) and sign in.  
2. Search for **“AliExpress Data”** (one example is “AliExpress-Data Provider”).  
3. Subscribe (free or paid) to that API.  
4. Note:
   - **`X-RapidAPI-Key`** (your RapidAPI Key).  
   - **`X-RapidAPI-Host`** (the host string shown in RapidAPI’s “Endpoints” panel; e.g. `aliexpress-data-provider.p.rapidapi.com`).  
5. We will put these two values into `.env.local` and Vercel’s Environment Variables (`RAPIDAPI_KEY`, `RAPIDAPI_HOST`).

---

## Environment Variables

1. At the project root, create a file named `.env.local` with the following contents (replace placeholders):

   ```bash
   # ── FIREBASE CLIENT SDK (Admin page image upload) ──
   NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

   # ── FIREBASE ADMIN SDK ──
   FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com

   # ── RAPIDAPI (AliExpress Data) ──
   RAPIDAPI_KEY=YOUR_RAPIDAPI_KEY
   RAPIDAPI_HOST=YOUR_RAPIDAPI_HOST
   ```

2. **Ensure**:
   - The `serviceAccountKey.json` file is in the project root (so `import "../serviceAccountKey.json"` works).  
   - Both `.env.local` and `serviceAccountKey.json` are in `.gitignore`.

3. In **Vercel → Project Settings → Environment Variables**, add the **same keys** (without `NEXT_PUBLIC_` prefix for server-only vars):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   FIREBASE_STORAGE_BUCKET
   RAPIDAPI_KEY
   RAPIDAPI_HOST
   ```
   And either:
   - Upload `serviceAccountKey.json` contents as one single var `FIREBASE_SERVICE_ACCOUNT`, then update `firebase/adminApp.js` accordingly;  
   - Or, temporarily commit `serviceAccountKey.json` to the repo so that it’s available, then remove it later.

---

## Local Development

1. **Clone** (or copy) this repository to your machine:
   ```bash
   git clone https://github.com/your-username/frat-ecom.git
   cd frat-ecom
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create** `.env.local` as described above.  
   **Place** `serviceAccountKey.json` in the project root.

4. **Run** the development server:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) → see the home page.  
   - Go to [http://localhost:3000/admin](http://localhost:3000/admin) → you can add products manually or via AliExpress.  
   - Once you add a product, it will appear on the home page automatically.

---

## Deploy to Vercel

1. In your GitHub account, **create a new repository** (e.g. `frat-ecom`) but **do not** add a `README` or `.gitignore` yet (you will push your local version).  
2. In your local project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Frat E-Com storefront"
   git branch -M main
   git remote add origin https://github.com/your-username/frat-ecom.git
   git push -u origin main
   ```
3. Go to [Vercel](https://vercel.com), sign in with GitHub, click **“New Project”**, and import `frat-ecom`.  
4. During the setup, Vercel auto-detects Next.js.  
5. In **Vercel Project → Settings → Environment Variables**, add:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   FIREBASE_STORAGE_BUCKET
   RAPIDAPI_KEY
   RAPIDAPI_HOST
   ```
   And either:
   - Upload `serviceAccountKey.json` contents as one single var `FIREBASE_SERVICE_ACCOUNT`, then update `firebase/adminApp.js` accordingly;  
   - Or, temporarily commit `serviceAccountKey.json` to the repo so that it’s available, then remove it later.

6. Click **“Deploy”**. Vercel will build, deploy, and give you a URL like `https://frat-ecom.vercel.app`.  
7. Open that URL → you now have a live store. Go to `/admin` → add products → they appear on the public home page instantly—no further coding required.

---

## How to Add Products (No Coding)

1. **Manual Add** (upload image + enter details):
   - Visit `https://<your-vercel-subdomain>/admin`.  
   - Under **Manual Add**, type in:  
     - **Name** (text)  
     - **Price** (number, e.g. 19.99)  
     - **Description** (text)  
     - **Image** (choose a local file; JPG/PNG).  
   - Click **“Add Manually”**. The image is uploaded to Firebase Storage, then Firestore gets a new document with those details.  
   - Once it’s successfully saved, reload the Home page (`/`) → your product will appear automatically.

2. **AliExpress Import** (just paste a URL):
   - Under **Import from AliExpress**, paste a valid AliExpress product URL (e.g. `https://www.aliexpress.com/item/1005001234567890.html`).  
   - Click **“Fetch & Add”**.  
   - The serverless function (`/api/addProduct`) parses out the numeric product ID, calls the AliExpress Data API on RapidAPI → extracts `title`, `min_price`, `image_url`, `product_description` → writes a new Firestore document.  
   - When you see **“AliExpress product added successfully!”**, go back to Home → your newly imported product shows up (with the AliExpress image, name, price, description).

---

## Folder/File Explanation

```
frat-ecom/
├── README.md                ← This file (setup & deploy instructions)
├── package.json             ← npm scripts & dependencies
├── next.config.js           ← Next.js configuration
├── tailwind.config.js       ← Tailwind (silver & black theme)
├── postcss.config.js        ← PostCSS setup
├── serviceAccountKey.json   ← (Firebase Admin SDK key; DO NOT commit)
├── .gitignore               ← Files/folders to ignore
├── public/
│   └── favicon.ico          ← Your favicon (32×32)
├── styles/
│   └── globals.css          ← Tailwind base + global overrides
├── firebase/
│   ├── clientApp.js         ← Initialize Firebase CLIENT SDK (storage)
│   └── adminApp.js          ← Initialize Firebase ADMIN SDK (firestore)
├── context/
│   └── CartContext.js       ← React Context for Cart (add/remove items)
├── components/              ← Reusable UI components
│   ├── Header.js            ← Site navigation (Home, Admin, Cart)
│   ├── Footer.js            ← Site footer
│   ├── ProductCard.js       ← Product grid card on Home
│   └── CartItem.js          ← One line item in Cart
└── pages/                   ← All Next.js pages & API routes
    ├── _app.js              ← Wrap pages in CartProvider, Header, Footer
    ├── index.js             ← Home page; lists products
    ├── cart.js              ← Cart page; shows cart contents
    ├── admin.js             ← Admin page; + Add Product manually or via AliExpress
    ├── products/
    │   └── [id].js          ← Dynamic product detail page
    └── api/
        ├── getProducts.js   ← GET: fetch all products from Firestore
        └── addProduct.js    ← POST: add a new product (manual or AliExpress)
```
