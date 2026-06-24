import type { LocaleText } from '../AppProvider';
import { getLocalization } from './getLocalization';

const deLabels: Partial<LocaleText> = {
  // Account
  accountSignInLabel: 'Anmelden',
  accountSignOutLabel: 'Abmelden',

  // AccountPreview
  accountPreviewTitle: 'Konto',
  accountPreviewIconButtonLabel: 'Aktueller Benutzer',

  // SignInPage
  signInTitle: (brandingTitle?: string) =>
    brandingTitle ? `Bei ${brandingTitle} anmelden` : 'Anmelden',
  signInSubtitle: 'Willkommen, bitte melden Sie sich an, um fortzufahren',
  signInRememberMe: 'Angemeldet bleiben',
  providerSignInTitle: (provider: string) => `Mit ${provider} anmelden`,

  // Common authentication labels
  email: 'E-Mail',
  password: 'Passwort',
  username: 'Benutzername',
  passkey: 'Passkey',

  // Common action labels
  save: 'Speichern',
  cancel: 'Abbrechen',
  ok: 'OK',
  or: 'Oder',
  to: 'An',
  with: 'Mit',
  close: 'Schließen',
  delete: 'Löschen',
  alert: 'Warnung',
  confirm: 'Bestätigen',
  loading: 'Wird geladen…',

  // CRUD
  createNewButtonLabel: 'Neu erstellen',
  reloadButtonLabel: 'Daten neu laden',
  createLabel: 'Erstellen',
  createSuccessMessage: 'Element erfolgreich erstellt.',
  createErrorMessage: 'Element konnte nicht erstellt werden. Grund:',
  editLabel: 'Bearbeiten',
  editSuccessMessage: 'Element erfolgreich bearbeitet.',
  editErrorMessage: 'Element konnte nicht bearbeitet werden. Grund:',
  deleteLabel: 'Löschen',
  deleteConfirmTitle: 'Element löschen?',
  deleteConfirmMessage: 'Möchten Sie dieses Element löschen?',
  deleteConfirmLabel: 'Löschen',
  deleteCancelLabel: 'Abbrechen',
  deleteSuccessMessage: 'Element erfolgreich gelöscht.',
  deleteErrorMessage: 'Element konnte nicht gelöscht werden. Grund:',
  deletedItemMessage: 'Dieses Element wurde gelöscht.',

  // Permissions
  accessDeniedMessage: 'Sie haben keine Berechtigung, auf diese Ressource zuzugreifen.',
};

export default getLocalization(deLabels);
