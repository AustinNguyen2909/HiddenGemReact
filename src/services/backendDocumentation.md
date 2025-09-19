## Hidden Gems Backend — API Reference

This document summarizes the backend API for use by frontend clients. For an interactive spec, open Swagger UI at `/docs` (serves `public/docs/index.html` which loads `public/docs/openapi.yaml`).

### Base URLs
- Dev: `http://127.0.0.1:8000`
- Local HTTPS (if configured): `https://localhost`

### Authentication
- Scheme: JWT Bearer
- Header: `Authorization: Bearer <access_token>`
- Obtain tokens via `POST /api/auth/login` or after `POST /api/auth/register` (depending on controller behavior).
- Refresh: `POST /api/auth/refresh` returns a new access token (and may rotate refresh token).
- Logout: `POST /api/auth/logout` (optionally include `refresh_token` in body).

Roles and access control are enforced with middleware:
- Admin-only: endpoints guarded by Admin middleware
- Shop-only: endpoints guarded by Shop middleware
- Admin or Shop: endpoints guarded by AdminOrShop middleware
- Authenticated user: endpoints guarded by Auth middleware

Tip: Call `GET /api/csrf-token` when your frontend needs a CSRF cookie/token for same-site forms or testing.

### Conventions
- Pagination params: `page`, `per_page`, or for some lists `limit`, `offset`.
- Common content-types: `application/json` for JSON, `multipart/form-data` for uploads.
- Date/time fields are ISO 8601 strings unless otherwise stated.

---

## Auth

### POST /api/auth/register
Register a new user.
- Body: `{ username, email, password }`
- Response: `201 Created`

### POST /api/auth/login
Login using email or username + password.
- Body: `{ email?, username?, password }`
- Response: `{ access_token, refresh_token }`

Examples:
```bash
# cURL
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"secret123"}'
```
```ts
// fetch (TypeScript)
const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com', password: 'secret123' })
});
const tokens: TokenResponse = await res.json();
```

### POST /api/auth/refresh
Exchange refresh token for a new access token.
- Body: `{ refresh_token }`

### POST /api/auth/logout
Logout and revoke refresh token.
- Auth: required
- Body (optional): `{ refresh_token }`

### POST /api/auth/forgot-password
Request password reset token.
- Body: `{ email }`

### POST /api/auth/reset-password
Reset password with token.
- Body: `{ token, new_password }`

### POST /api/auth/change-password
Change password for logged-in user.
- Auth: required
- Body: `{ current_password, new_password }`

### POST /api/auth/verify-email/request
Request email verification token.
- Auth: required

### POST /api/auth/verify-email/confirm
Confirm email verification token.
- Body: `{ token }`

### GET /api/users
List all users (Admin only).
- Auth: required (Admin)

### DELETE /api/me
Delete current user account.
- Auth: required

Example (login):
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"secret"}'
```

---

## Users & Privacy

### GET /api/me/profile
Get current user profile.
- Auth: required

Example:
```bash
curl http://127.0.0.1:8000/api/me/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

### PATCH /api/me/profile
Update profile fields.
- Auth: required
- Body: `{ full_name?, phone_number?, email? }`

### POST /api/me/consent
Record consent versions.
- Auth: required
- Body: `{ terms_version?, privacy_version? }`

### GET /api/me/export
Export user data.
- Auth: required

### GET /api/policies/terms
Get Terms of Service.

### GET /api/policies/privacy
Get Privacy Policy.

### GET /api/content/{slug}
Get content by slug (about, testimonials).
- Query: none

### PUT /api/content/{slug}
Update content by slug (Admin).
- Auth: required (Admin)
- Body: `{ content }`

---

## Stores (Cafes) and Reviews

### GET /api/cafes
List stores with pagination.
- Query: `page?`, `per_page? (1..50)`
- Response example shape:
```json
{
  "data": {
    "items": [
      {
        "id_cua_hang": 1,
        "ten_cua_hang": "Hidden Gem",
        "mo_ta": "Quan ca phe thu vi",
        "diem_danh_gia_trung_binh": 4.8,
        "luot_xem": 1234,
        "id_trang_thai": 2,
        "id_vi_tri": 1,
        "ngay_tao": "2025-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "per_page": 10
  }
}
```

Examples:
```bash
curl 'http://127.0.0.1:8000/api/cafes?page=1&per_page=10'
```
```ts
const res = await fetch('http://127.0.0.1:8000/api/cafes?page=1&per_page=10');
const data: CafeListResponse = await res.json();
```

### GET /api/cafes/search
Search stores by name.
- Query: `q`, `page?`, `per_page?`

Example:
```bash
curl 'http://127.0.0.1:8000/api/cafes/search?q=Hidden'
```

### GET /api/cafes/near
Find nearby stores by coordinates.
- Query: `lat`, `lng`, `radius_km?` (default 5km), `limit?` (default 20)
- Response includes center coordinates and radius info

Example:
```bash
curl 'http://127.0.0.1:8000/api/cafes/near?lat=10.762622&lng=106.660172&radius_km=10'
```

### GET /api/cafes/{id}
Get store detail by ID.

### GET /api/cafes/{id}/reviews
List reviews for a store.
- Query: `page?`, `per_page?`

### POST /api/cafes/{id}/reviews
Create a review.
- Auth: required
- Body: `{ rating (1..5), content }`

Examples:
```bash
curl -X POST http://127.0.0.1:8000/api/cafes/1/reviews \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"rating":5,"content":"Great coffee!"}'
```
```ts
await fetch('http://127.0.0.1:8000/api/cafes/1/reviews', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ rating: 5, content: 'Great coffee!' } as CreateReviewRequest)
});
```

---

## Store Management

### POST /api/stores
Create store (Shop role).
- Auth: required (Shop)
- Body: `{ ten_cua_hang, mo_ta }`

Examples:
```bash
curl -X POST http://127.0.0.1:8000/api/stores \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"ten_cua_hang":"Hidden Gem","mo_ta":"Quan ca phe thu vi"}'
```
```ts
await fetch('http://127.0.0.1:8000/api/stores', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ten_cua_hang: 'Hidden Gem', mo_ta: 'Quan ca phe thu vi' } as CreateStoreRequest)
});
```

### PATCH /api/stores/{id}
Update store (Owner/Admin).
- Auth: required

### POST /api/stores/{id}/branches
Create a branch for a store (Shop role).
- Auth: required (Shop)

### GET /api/me/stores
List stores owned by current user.
- Auth: required
- Query: `page?`, `per_page?`

### GET /api/stores/{id}/images
List images for a store.
- Query: none

### POST /api/stores/{id}/images
Upload store image.
- Auth: required
- Form-data: `file` (binary), `is_avatar?` (integer)

### GET /api/me/stores/{id}/dashboard
Get store dashboard metrics.
- Auth: required (owner or admin)
- Returns store analytics and metrics

Examples:
```bash
curl -X POST http://127.0.0.1:8000/api/stores/1/images \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F file=@/path/to/image.jpg \
  -F is_avatar=1
```
```ts
const fd = new FormData();
fd.append('file', fileInput.files![0]);
fd.append('is_avatar', '1');
await fetch('http://127.0.0.1:8000/api/stores/1/images', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: fd
});
```

---

## Global Search

### GET /api/search
Global search across categories.
- Query: `q`

---

## Vouchers

### POST /api/vouchers
Create voucher (Admin or Shop).
- Auth: required (Admin or Shop)
- Body: `{ ma_voucher, ten_voucher?, gia_tri_giam, loai_giam_gia: "percent"|"amount", ngay_het_han?, so_luong_con_lai? }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/vouchers \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"ma_voucher":"WELCOME10","gia_tri_giam":10,"loai_giam_gia":"percent"}'
```

### POST /api/vouchers/assign
Assign voucher to a store (Admin or Shop).
- Auth: required (Admin or Shop)
- Body: `{ id_voucher, id_cua_hang }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/vouchers/assign \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"id_voucher":1,"id_cua_hang":2}'
```

### GET /api/stores/{id}/vouchers
List vouchers assigned to a store by ID.

### GET /api/vouchers/global
List global vouchers available to all stores.

---

## Promotions

### POST /api/promotions
Create promotion (Admin).
- Auth: required (Admin)
- Body: `{ ten_chuong_trinh, mo_ta?, ngay_bat_dau, ngay_ket_thuc }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/promotions \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"ten_chuong_trinh":"Summer Sale","ngay_bat_dau":"2025-06-01T00:00:00Z","ngay_ket_thuc":"2025-06-30T23:59:59Z"}'
```

### POST /api/promotions/{id}/apply
Apply a store to promotion (Shop).
- Auth: required (Shop)
- Body: `{ id_cua_hang }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/promotions/1/apply \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"id_cua_hang":2}'
```

### POST /api/promotions/{id}/review
Review a promotion application (Admin).
- Auth: required (Admin)
- Body: `{ id_cua_hang, trang_thai: "da_duyet"|"tu_choi" }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/promotions/1/review \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"id_cua_hang":2,"trang_thai":"da_duyet"}'
```

### GET /api/stores/{id}/promotions
List promotions a store participates in.

### GET /api/promotions/global
List global promotions.
- Query: `trang_thai?` (default: "dang_hoat_dong")

---

## Blog

### GET /api/blog
List/search blog posts.
- Query: `q?`, `page?`, `per_page?`

### POST /api/blog
Create blog post (Admin).
- Auth: required (Admin)
- Body: `{ tieu_de, noi_dung, trang_thai? }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/blog \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"tieu_de":"Hello","noi_dung":"World"}'
```

### PATCH /api/blog/{id}
Update blog post (Admin).
- Auth: required (Admin)
- Body: `{ tieu_de, noi_dung, trang_thai? }`

### PATCH /api/admin/blog/{id}/status
Update blog post status (Admin).
- Auth: required (Admin)
- Body: `{ trang_thai: "nhap"|"cong_bo"|"an" }`

---

## Banners

### GET /api/banners
List banners.
- Query: `vi_tri?`, `active?`
- Response items include: `{ id_banner, tieu_de?, mo_ta?, url_anh, link_url?, vi_tri?, thu_tu, active, thoi_gian_tao }`

Example:
```bash
curl 'http://127.0.0.1:8000/api/banners?vi_tri=home_top&active=1'
```

### POST /api/banners
Create banner (Admin).
- Auth: required (Admin)
- Body: `{ tieu_de?, url_anh, link_url?, vi_tri?, thu_tu?, active? }`

### PATCH /api/banners/{id}
Update banner (Admin).
- Auth: required (Admin)
- Body: partial banner fields

### PATCH /api/banners/reorder
Reorder banners (Admin).
- Auth: required (Admin)
- Body: `{ order: [id1, id2, ...] }`

### DELETE /api/banners/{id}
Delete banner (Admin).
- Auth: required (Admin)

---

## Chat

### POST /api/chat/send
Send a direct message.
- Auth: required
- Body: `{ noi_dung, to_user_id? }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/chat/send \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"noi_dung":"Hi there!","to_user_id":42}'
```

### GET /api/chat/messages
List messages.
- Auth: required
- Query: `with?`, `limit?`, `offset?`

### GET /api/chat/conversations
List conversations.
- Auth: required

### PATCH /api/chat/read
Mark messages as read.
- Auth: required
- Body: `{ from_user_id?, message_ids? }`

### GET /api/chat/unread-counts
Get unread message counts per conversation.
- Auth: required

### POST /api/chat/send-file
Send a file message.
- Auth: required
- Form-data: `file` (binary), `to_user_id?`, `caption?`

---

## Wallet

### GET /api/me/wallet
Get wallet balance.
- Auth: required

Example:
```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" http://127.0.0.1:8000/api/me/wallet
```

### GET /api/me/wallet/history
List wallet transactions.
- Auth: required
- Query: `limit?`, `offset?`

Example:
```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" 'http://127.0.0.1:8000/api/me/wallet/history?limit=20&offset=0'
```

### GET /api/me/wallet/deposit-instructions
Get deposit instructions.
- Auth: required

### POST /api/simulate/bank-transfer
Simulated bank webhook (dev/testing).
- Body: `{ noi_dung, so_tien }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/simulate/bank-transfer \
  -H 'Content-Type: application/json' \
  -d '{"noi_dung":"TOPUP 12345","so_tien":150000}'
```

---

## Advertising (Ads)

### GET /api/ads/packages
List available advertising packages.

### POST /api/ads/requests
Create ad request (Shop).
- Auth: required (Shop)
- Body: `{ id_cua_hang, goi, ngay_bat_dau? (YYYY-MM-DD) }`

Example:
```bash
curl -X POST http://127.0.0.1:8000/api/ads/requests \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"id_cua_hang":2,"goi":"home_top","ngay_bat_dau":"2025-06-01"}'
```

### GET /api/ads/requests/my
List my ad requests.
- Auth: required

### GET /api/ads/active
List active ads.
- Query: `tai_ngay?` (YYYY-MM-DD or Y-m-d H:i:s)

Admin review:
- `GET /api/admin/ads/requests/pending` — pending requests (Admin, Auth)
- `POST /api/admin/ads/requests/{id}/review` — review one (Admin, Auth), Body `{ trang_thai: "da_duyet"|"tu_choi" }`

Example (review):
```bash
curl -X POST http://127.0.0.1:8000/api/admin/ads/requests/10/review \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"trang_thai":"da_duyet"}'
```

---

## Admin

### GET /api/admin/dashboard
Admin dashboard metrics.
- Auth: required (Admin)
- Response example:
```json
{ "data": { "users": 100, "shops": 10, "stores": 50, "reviews": 200, "vouchers": 5, "promos": 3 } }
```

Example:
```bash
curl -H "Authorization: Bearer $ACCESS_TOKEN" http://127.0.0.1:8000/api/admin/dashboard
```

### GET /api/admin/users
List users with pagination and filters.
- Auth: required (Admin)
- Query: `page?`, `per_page?`, `q?`, `role?`

### GET /api/admin/search
Search across different domains.
- Auth: required (Admin)
- Query: `domain` (reviews|promotions|users), `q?`, `trang_thai?`, `role?`, `page?`, `per_page?`

### GET /api/admin/reports/summary
Get reports summary with optional date range.
- Auth: required (Admin)
- Query: `from?`, `to?`, `format?` (json|csv)
- Returns CSV if format=csv

### POST /api/admin/users/role
Set user role.
- Auth: required (Admin)
- Body: `{ id_user, role: "admin"|"shop"|"customer" }`

### DELETE /api/admin/users/{id}
Delete user.
- Auth: required (Admin)

### GET /api/admin/pending-stores
List pending stores for approval.
- Auth: required (Admin)

### POST /api/admin/stores/{id}/approve
Approve or reject a store.
- Auth: required (Admin)
- Body: `{ action: "approve"|"reject" }`

### GET /api/contact
Get contact information.
- Returns: email, zalo, phone from environment

### PATCH /api/admin/reviews/{id}
Update review status (Admin).
- Auth: required (Admin)
- Body: `{ trang_thai: "cho_duyet"|"da_duyet"|"tu_choi"|"an" }`

### GET /api/admin/comments
List comments for moderation.
- Auth: required (Admin)
- Query: `page?`, `per_page?`, `q?`, `trang_thai?`, `loai?`

### PATCH /api/admin/comments/{id}
Update comment status.
- Auth: required (Admin)
- Body: `{ trang_thai: "cho_duyet"|"da_duyet"|"tu_choi"|"an" }`

---

## Operations & Health

### GET /
API root.

### GET /api/csrf-token
Issue CSRF token and set cookie.

Example:
```bash
curl -i http://127.0.0.1:8000/api/csrf-token
```

### GET /health
Liveness probe.

### GET /ready
Readiness probe (DB ping). Returns `200` if ready, `500` if not.

---

## Curl Examples

Authenticated request template:
```bash
ACCESS_TOKEN="..." # from /api/auth/login or /api/auth/refresh
curl -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H 'Content-Type: application/json' \
     http://127.0.0.1:8000/api/me/profile
```

Upload example:
```bash
ACCESS_TOKEN="..."
curl -X POST http://127.0.0.1:8000/api/stores/1/images \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -F file=@/path/to/image.jpg \
  -F is_avatar=1
```

Typed fetch helper (optional):
```ts
async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${errText}`);
  }
  return res.json() as Promise<T>;
}

// Usage
const cafes = await apiFetch<CafeListResponse>('http://127.0.0.1:8000/api/cafes?page=1');
```

---

## Schemas (key fields)

Cafe:
- `id_cua_hang`, `id_cua_hang_cha?`, `id_chu_so_huu`, `ten_cua_hang`, `mo_ta?`, `diem_danh_gia_trung_binh`, `luot_xem`, `id_trang_thai?`, `id_vi_tri?`, `ngay_tao`

Banner:
- `id_banner`, `tieu_de?`, `mo_ta?`, `url_anh`, `link_url?`, `vi_tri?`, `thu_tu`, `active`, `thoi_gian_tao`

AdminDashboardResponse:
- `data: { users, shops, stores, reviews, vouchers, promos }`

Refer to Swagger (`/docs`) for full schemas and examples.

---

## TypeScript types (request/response)

Use these in your React (TypeScript) client. Adjust as your API returns more fields.

```ts
// Shared helpers
export type ISODateTimeString = string; // e.g. "2025-01-01T00:00:00Z"
export type ISODateString = string; // e.g. "2025-01-01"

// Auth
export type LoginRequest = {
  email?: string;
  username?: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string; // min 6
};

export type RefreshRequest = { refresh_token: string };
export type LogoutRequest = { refresh_token?: string };
export type ForgotPasswordRequest = { email: string };
export type ResetPasswordRequest = { token: string; new_password: string };
export type ChangePasswordRequest = { current_password: string; new_password: string };
export type VerifyEmailConfirmRequest = { token: string };

// Users
export type UpdateProfileRequest = {
  full_name?: string;
  phone_number?: string;
  email?: string;
};

export type ConsentRequest = {
  terms_version?: string;
  privacy_version?: string;
};

// Stores (Cafes)
export type Cafe = {
  id_cua_hang: number;
  id_cua_hang_cha?: number | null;
  id_chu_so_huu: number;
  ten_cua_hang: string;
  mo_ta?: string | null;
  diem_danh_gia_trung_binh: number; // float
  luot_xem: number;
  id_trang_thai?: number | null;
  id_vi_tri?: number | null;
  ngay_tao: ISODateTimeString;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  per_page: number;
};

export type CafeListResponse = { data: Paginated<Cafe> };

export type CreateStoreRequest = {
  ten_cua_hang: string;
  mo_ta?: string;
};

export type UploadStoreImageRequest = {
  file: File | Blob; // multipart/form-data
  is_avatar?: number; // 0/1
};

// Reviews
export type CreateReviewRequest = {
  rating: number; // 1..5
  content: string;
};

// Vouchers
export type CreateVoucherRequest = {
  ma_voucher: string;
  ten_voucher?: string;
  gia_tri_giam: number;
  loai_giam_gia: 'percent' | 'amount';
  ngay_het_han?: ISODateTimeString;
  so_luong_con_lai?: number;
};

export type AssignVoucherRequest = {
  id_voucher: number;
  id_cua_hang: number;
};

// Promotions
export type CreatePromotionRequest = {
  ten_chuong_trinh: string;
  mo_ta?: string;
  ngay_bat_dau: ISODateTimeString;
  ngay_ket_thuc: ISODateTimeString;
};

export type PromotionApplyRequest = { id_cua_hang: number };
export type PromotionReviewRequest = { id_cua_hang: number; trang_thai: 'da_duyet' | 'tu_choi' };

// Blog
export type BlogCreateRequest = { tieu_de: string; noi_dung: string };
export type BlogUpdateRequest = { tieu_de: string; noi_dung: string };

// Banners
export type Banner = {
  id_banner: number;
  tieu_de?: string | null;
  mo_ta?: string | null;
  url_anh: string;
  link_url?: string | null;
  vi_tri?: string | null;
  thu_tu: number;
  active: boolean;
  thoi_gian_tao: ISODateTimeString;
};

export type BannerCreateRequest = {
  tieu_de?: string;
  url_anh: string;
  link_url?: string;
  vi_tri?: string;
  thu_tu?: number;
  active?: number; // 0/1 per spec
};

export type BannersListResponse = { data: Banner[] };

// Chat
export type ChatSendRequest = { noi_dung: string; to_user_id?: number };
export type ChatMarkReadRequest = { from_user_id?: number; message_ids?: number[] };
export type ChatSendFileRequest = { to_user_id?: number; caption?: string; file: File | Blob };

// Wallet
export type SimulateBankTransferRequest = { noi_dung: string; so_tien: number };

// Ads
export type AdsCreateRequest = {
  id_cua_hang: number;
  goi: string;
  ngay_bat_dau?: ISODateString; // YYYY-MM-DD
};

// Admin
export type AdminDashboardData = {
  users: number;
  shops: number;
  stores: number;
  reviews: number;
  vouchers: number;
  promos: number;
};

export type AdminDashboardResponse = { data: AdminDashboardData };

export type AdminSetRoleRequest = { id_user: number; role: 'admin' | 'shop' | 'customer' };
export type AdminStoreApproveRequest = { action: 'approve' | 'reject' };
export type AdminReviewStatusRequest = { trang_thai: 'cho_duyet' | 'da_duyet' | 'tu_choi' | 'an' };
export type AdminCommentStatusRequest = { trang_thai: 'cho_duyet' | 'da_duyet' | 'tu_choi' | 'an' };
export type AdminBlogStatusRequest = { trang_thai: 'nhap' | 'cong_bo' | 'an' };

// Content
export type ContentUpdateRequest = { content: string };

// Generic API shapes (optional, use if your backend wraps lists/data consistently)
export type ApiSuccess<T> = T;
export type ApiError = { message: string; code?: string; details?: unknown };
```


