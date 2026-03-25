# Bai tap Inventory - Huong dan test va bao cao

## 1) Cac endpoint da implement

- POST /api/v1/products
  - Tao product va tu dong tao inventory tuong ung (stock=0, reserved=0, soldCount=0)
- GET /api/v1/inventories
  - Lay tat ca inventory, co populate thong tin product
- GET /api/v1/inventories/:id
  - Lay inventory theo id, co populate thong tin product
- POST /api/v1/inventories/add-stock
  - Body: { "product": "<productId>", "quantity": 10 }
  - Tang stock
- POST /api/v1/inventories/remove-stock
  - Body: { "product": "<productId>", "quantity": 3 }
  - Giam stock
- POST /api/v1/inventories/reservation
  - Body: { "product": "<productId>", "quantity": 2 }
  - Giam stock, tang reserved
- POST /api/v1/inventories/sold
  - Body: { "product": "<productId>", "quantity": 1 }
  - Giam reserved, tang soldCount

## 2) Thu tu chay Postman de chup hinh

1. Tao product bang POST /api/v1/products
2. Goi GET /api/v1/inventories de xac nhan inventory duoc tao tu dong
3. Goi POST /api/v1/inventories/add-stock
4. Goi POST /api/v1/inventories/remove-stock
5. Goi POST /api/v1/inventories/reservation
6. Goi POST /api/v1/inventories/sold
7. Goi lai GET /api/v1/inventories hoac GET /api/v1/inventories/:id de doi chieu ket qua

## 3) Lenh Postman + Body cu the

Luu y chung:
- Base URL: http://localhost:3000
- Header cho tat ca request POST: Content-Type: application/json

### 3.1 Tao product
Method: POST
URL: http://localhost:3000/api/v1/products
Body (raw - JSON):
{
  "title": "Noi chien khong dau A1",
  "price": 1200,
  "images": ["https://placehold.co/600x400"],
  "description": "San pham test inventory"
}

### 3.2 Lay all inventories
Method: GET
URL: http://localhost:3000/api/v1/inventories
Body: Khong co body

### 3.3 Lay inventory theo id
Method: GET
URL: http://localhost:3000/api/v1/inventories/<inventoryId>
Body: Khong co body

### 3.4 Add stock
Method: POST
URL: http://localhost:3000/api/v1/inventories/add-stock
Body (raw - JSON):
{
  "product": "<productId>",
  "quantity": 10
}

### 3.5 Remove stock
Method: POST
URL: http://localhost:3000/api/v1/inventories/remove-stock
Body (raw - JSON):
{
  "product": "<productId>",
  "quantity": 3
}

### 3.6 Reservation
Method: POST
URL: http://localhost:3000/api/v1/inventories/reservation
Body (raw - JSON):
{
  "product": "<productId>",
  "quantity": 2
}

### 3.7 Sold
Method: POST
URL: http://localhost:3000/api/v1/inventories/sold
Body (raw - JSON):
{
  "product": "<productId>",
  "quantity": 1
}

### 3.8 Thu tu chay de chup hinh
1. Chay 3.1 de tao product
2. Chay 3.2 de kiem tra inventory duoc tao tu dong va lay inventoryId, productId
3. Chay 3.4
4. Chay 3.5
5. Chay 3.6
6. Chay 3.7
7. Chay lai 3.2 hoac 3.3 de chup ket qua cuoi

## 4) Noi dung file Word de nop

- Trang bia: Mon hoc, ten de tai, MSSV, ho ten
- Muc 1: Phan tich yeu cau
  - Kien truc du an Express + MongoDB
  - Model Inventory va y nghia cac truong
  - Luong nghiep vu add/remove/reservation/sold
- Muc 2: Anh Postman
  - Anh 1: Tao product thanh cong
  - Anh 2: GET all inventories
  - Anh 3: GET inventory by id
  - Anh 4: Add stock
  - Anh 5: Remove stock
  - Anh 6: Reservation
  - Anh 7: Sold
- Muc 3: Ket qua va nhan xet
  - Doi chieu gia tri stock/reserved/soldCount sau moi thao tac
  - Cac dieu kien loi da xu ly (quantity <= 0, khong du stock, khong du reserved)
- Muc 4: Link GitHub repository

## 5) Lenh Git de nop bai

- git add .
- git commit -m "feat: add inventory model and stock management APIs"
- git push

Neu can tao branch rieng:
- git checkout -b feature/inventory
- git add .
- git commit -m "feat: implement inventory requirements"
- git push -u origin feature/inventory
