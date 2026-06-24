/**
 * Arabic locale for Toolpad Core.
 *
 * @note Arabic is written right-to-left (RTL). When using this locale, set
 * `dir="rtl"` on your root element and apply an RTL-compatible MUI theme
 * (see https://mui.com/material-ui/guides/right-to-left/).
 */
import type { LocaleText } from '../AppProvider';
import { getLocalization } from './getLocalization';

const arLabels: Partial<LocaleText> = {
  // Account
  accountSignInLabel: 'تسجيل الدخول',
  accountSignOutLabel: 'تسجيل الخروج',

  // AccountPreview
  accountPreviewTitle: 'الحساب',
  accountPreviewIconButtonLabel: 'المستخدم الحالي',

  // SignInPage
  signInTitle: (brandingTitle?: string) =>
    brandingTitle ? `تسجيل الدخول إلى ${brandingTitle}` : 'تسجيل الدخول',
  signInSubtitle: 'مرحباً، يرجى تسجيل الدخول للمتابعة',
  signInRememberMe: 'تذكّرني',
  providerSignInTitle: (provider: string) => `تسجيل الدخول عبر ${provider}`,

  // Common authentication labels
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  username: 'اسم المستخدم',
  passkey: 'مفتاح المرور',

  // Common action labels
  save: 'حفظ',
  cancel: 'إلغاء',
  ok: 'موافق',
  or: 'أو',
  to: 'إلى',
  with: 'بواسطة',
  close: 'إغلاق',
  delete: 'حذف',
  alert: 'تنبيه',
  confirm: 'تأكيد',
  loading: 'جارٍ التحميل…',

  // CRUD
  createNewButtonLabel: 'إنشاء جديد',
  reloadButtonLabel: 'إعادة تحميل البيانات',
  createLabel: 'إنشاء',
  createSuccessMessage: 'تم إنشاء العنصر بنجاح.',
  createErrorMessage: 'فشل إنشاء العنصر. السبب:',
  editLabel: 'تعديل',
  editSuccessMessage: 'تم تعديل العنصر بنجاح.',
  editErrorMessage: 'فشل تعديل العنصر. السبب:',
  deleteLabel: 'حذف',
  deleteConfirmTitle: 'حذف العنصر؟',
  deleteConfirmMessage: 'هل تريد حذف هذا العنصر؟',
  deleteConfirmLabel: 'حذف',
  deleteCancelLabel: 'إلغاء',
  deleteSuccessMessage: 'تم حذف العنصر بنجاح.',
  deleteErrorMessage: 'فشل حذف العنصر. السبب:',
  deletedItemMessage: 'تم حذف هذا العنصر.',

  // Permissions
  accessDeniedMessage: 'ليس لديك صلاحية الوصول إلى هذا المورد.',
};

export default getLocalization(arLabels);
