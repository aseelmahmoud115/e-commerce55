# FreshCart – E-Commerce (Next.js)

FreshCart is a full e-commerce app built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **NextAuth**, on top of the [Route E-commerce API](https://documenter.getpostman.com/view/5709532/2s93JqTRWN). It follows the FreshCart Figma design (desktop / tablet / mobile).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in NEXTAUTH_SECRET
npm run dev                  # http://localhost:3000
```

### Environment variables

| Name | Value |
| --- | --- |
| `BASE_URL` | `https://ecommerce.routemisr.com/api/v1` |
| `NEXTAUTH_URL` | the site address, e.g. `http://localhost:3000` (or your Vercel URL) |
| `NEXTAUTH_SECRET` | any long random string (`openssl rand -base64 32`) |
| `DOMAIN` | *(optional)* where Stripe sends the user back after paying. Defaults to the current site address |

On Vercel add the same variables in **Project → Settings → Environment Variables**.

## Features

| Area | What it does | API |
| --- | --- | --- |
| Home | hero slider (arrows + dots), features, categories, promo banners, featured products, newsletter | `GET /categories`, `GET /products` |
| Products | all products, filter by category / subcategory / brand, active filter chips, pagination, empty state | `GET /products?category[in]=&subcategory=&brand=` |
| Search | keyword search, category / brand / price filters, sort, grid & list view | `GET /products?keyword=&sort=&price[gte]=&price[lte]=` |
| Product details | gallery, quantity + live total, add to cart, buy now, wishlist, share, details / reviews / shipping tabs, related products | `GET /products/:id`, `GET/POST /products/:id/reviews` |
| Categories | all categories → subcategories of a category → products of a subcategory | `GET /categories/:id/subcategories` |
| Brands | all brands → products of a brand | `GET /brands`, `GET /products?brand=` |
| Cart | display, add, update quantity, remove item, clear cart, promo code | `GET/POST/PUT/DELETE /cart` |
| Wishlist | display, add, remove, add to cart from wishlist | `GET/POST/DELETE /wishlist` |
| Checkout | saved or new address, **Cash on Delivery** or **Pay Online (Stripe)** | `POST /orders/:cartId`, `POST /orders/checkout-session/:cartId` |
| Orders | all orders with status, payment method and expandable details | `GET /orders/user/:userId` |
| Auth | sign in, sign up (password strength), forgot password (email → code → new password) | `/auth/signin`, `/auth/signup`, `/auth/forgotPasswords`, `/auth/verifyResetCode`, `/auth/resetPassword` |
| Profile | addresses (add / edit / delete), update name / email / phone, change password | `/addresses`, `/users/updateMe`, `/users/changeMyPassword` |
| Other | contact page, shipping / returns / track order / privacy / terms / cookies pages, custom 404 | – |

Guests can use the cart and wishlist too (saved in the browser). When they sign in, the items are moved to their account automatically. Checkout, orders and profile pages require login (see `src/proxy.ts`).

## Project structure

```
src/
├─ app/
│  ├─ (components)/
│  │  ├─ (auth)/        login, register, forgot-password
│  │  ├─ (shop)/        products, products/[id], categories, brands, search, cart, wishlist
│  │  ├─ (info)/        shipping, returns, track-order, privacy, terms, cookies
│  │  ├─ _HomePages/    home page sections
│  │  ├─ checkout/  allorders/  profile/  contact/
│  ├─ _layoutComponents/  TopBar, Navbar, Footer, Providers
│  ├─ _sharedComponents/  ProductCard, PageHero, Stars, Reveal, EmptyState, ...
│  ├─ api/auth/[...nextauth]/route.ts
│  ├─ layout.tsx  page.tsx  not-found.tsx  loading.tsx  globals.css
├─ context/      cartContext, wishlistContext
├─ services/     one function per API call (server actions)
├─ interface/    TypeScript types of the API responses
├─ schema/       zod validation schemas
├─ next-auth/    NextAuth options (credentials provider)
├─ Utilites/     getMyToken (reads the Route token from the NextAuth JWT), apiRequest
└─ proxy.ts      route protection
```
