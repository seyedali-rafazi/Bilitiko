/**
 * Translates raw API / validation error messages (English) into Persian for display.
 * Backend currently returns FastAPI/Pydantic validation errors in English.
 */

type ErrorEntry = [RegExp | string, string | ((m: RegExpMatchArray) => string)];

const errorMap: ErrorEntry[] = [
  // Password
  [/string should have at least (\d+) characters/i, (m: RegExpMatchArray) =>
    `رمز عبور باید حداقل ${m[1]} کاراکتر داشته باشد.`],
  [/password.*too short/i, 'رمز عبور بسیار کوتاه است. حداقل ۸ کاراکتر وارد کنید.'],
  [/password.*too common/i, 'رمز عبور بسیار ساده است. رمز قوی‌تری انتخاب کنید.'],
  [/passwords do not match/i, 'رمز عبور و تکرار آن یکسان نیستند.'],

  // Email
  [/value is not a valid email/i, 'آدرس ایمیل معتبر نیست.'],
  [/email already (exists|registered|taken)/i, 'این ایمیل قبلاً ثبت شده است.'],
  [/user with this email already exists/i, 'این ایمیل قبلاً ثبت شده است.'],

  // Auth
  [/incorrect.*email.*password/i, 'ایمیل یا رمز عبور اشتباه است.'],
  [/invalid credentials/i, 'ایمیل یا رمز عبور اشتباه است.'],
  [/no active account/i, 'حساب کاربری با این مشخصات یافت نشد.'],
  [/account.*disabled/i, 'حساب کاربری غیرفعال است. با پشتیبانی تماس بگیرید.'],
  [/authentication credentials were not provided/i, 'لطفاً ابتدا وارد حساب کاربری خود شوید.'],
  [/token.*expired/i, 'نشست شما منقضی شده است. دوباره وارد شوید.'],
  [/unauthorized/i, 'دسترسی غیرمجاز. لطفاً دوباره وارد شوید.'],

  // Phone
  [/phone.*invalid/i, 'شماره موبایل معتبر نیست.'],
  [/enter a valid phone/i, 'شماره موبایل معتبر نیست.'],

  // General validation
  [/field required/i, 'تمام فیلدهای اجباری را پر کنید.'],
  [/value error/i, 'اطلاعات وارد شده معتبر نیست.'],

  // Network
  [/failed to fetch/i, 'خطا در اتصال به سرور. اینترنت خود را بررسی کنید.'],
  [/network.*error/i, 'خطا در ارتباط با سرور. دوباره تلاش کنید.'],

  // HTTP status
  ['API error 400', 'اطلاعات وارد شده معتبر نیست.'],
  ['API error 401', 'ایمیل یا رمز عبور اشتباه است.'],
  ['API error 403', 'دسترسی غیرمجاز.'],
  ['API error 404', 'منبع مورد نظر یافت نشد.'],
  ['API error 409', 'این اطلاعات قبلاً ثبت شده است.'],
  ['API error 422', 'اطلاعات وارد شده معتبر نیست.'],
  ['API error 429', 'تعداد درخواست‌ها بیش از حد مجاز است. کمی صبر کنید.'],
  ['API error 500', 'خطای سرور. لطفاً دوباره تلاش کنید.'],
];

export function toFarsiError(raw: string | unknown, fallback: string): string {
  const msg = raw instanceof Error ? raw.message : String(raw ?? '');

  for (const [pattern, translation] of errorMap) {
    if (typeof pattern === 'string') {
      if (msg.includes(pattern)) return typeof translation === 'string' ? translation : fallback;
    } else {
      const match = msg.match(pattern);
      if (match) {
        return typeof translation === 'function'
          ? (translation as (m: RegExpMatchArray) => string)(match)
          : translation;
      }
    }
  }

  // If the raw message is already Persian (contains Persian chars), return it as-is
  if (/[\u0600-\u06FF]/.test(msg)) return msg;

  return fallback;
}
