# راهنمای نصب و راه‌اندازی

## مشکل PowerShell Execution Policy

اگر با خطای زیر مواجه شدید:
```
running scripts is disabled on this system
```

### راه حل 1: تغییر موقت Execution Policy

در PowerShell با دسترسی Administrator اجرا کنید:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### راه حل 2: استفاده از Command Prompt

به جای PowerShell از Command Prompt (cmd) استفاده کنید.

## مراحل نصب

### 1. نصب وابستگی‌ها

در پوشه `aircraft-tickets` دستور زیر را اجرا کنید:

**با npm:**
```bash
npm install
```

**یا با yarn:**
```bash
yarn install
```

### 2. اجرای برنامه

**حالت توسعه:**
```bash
npm run dev
```

**یا:**
```bash
yarn dev
```

برنامه روی آدرس `http://localhost:3000` اجرا خواهد شد.

### 3. ساخت نسخه تولید

```bash
npm run build
npm start
```

## وابستگی‌های مورد نیاز

پروژه به وابستگی‌های زیر نیاز دارد که به صورت خودکار نصب می‌شوند:

- react
- react-dom
- next
- typescript
- tailwindcss
- postcss
- autoprefixer

## مشکلات رایج

### خطای Module Not Found

اگر با خطای "Cannot find module" مواجه شدید:
```bash
npm install
```

### خطای Port Already in Use

اگر پورت 3000 در حال استفاده است:
```bash
npm run dev -- -p 3001
```

### خطاهای TypeScript

خطاهای TypeScript قبل از نصب وابستگی‌ها طبیعی است و پس از نصب برطرف می‌شوند.

## نکات مهم

1. حتماً Node.js نسخه 18 یا بالاتر نصب باشد
2. اتصال اینترنت برای نصب وابستگی‌ها لازم است
3. فونت فارسی از CDN بارگذاری می‌شود

## تست برنامه

پس از اجرا:
1. صفحه اصلی را باز کنید
2. فرم جستجو را پر کنید
3. پروازها را مشاهده کنید
4. یک پرواز انتخاب کنید
5. اطلاعات مسافران را وارد کنید
6. به صفحه پرداخت بروید

## پشتیبانی

در صورت بروز مشکل:
- فایل‌های لاگ را بررسی کنید
- مطمئن شوید تمام وابستگی‌ها نصب شده‌اند
- نسخه Node.js را چک کنید