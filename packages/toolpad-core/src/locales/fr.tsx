import type { LocaleText } from '../AppProvider';
import { getLocalization } from './getLocalization';

const frLabels: Partial<LocaleText> = {
  // Account
  accountSignInLabel: 'Se connecter',
  accountSignOutLabel: 'Se déconnecter',

  // AccountPreview
  accountPreviewTitle: 'Compte',
  accountPreviewIconButtonLabel: 'Utilisateur actuel',

  // SignInPage
  signInTitle: (brandingTitle?: string) =>
    brandingTitle ? `Se connecter à ${brandingTitle}` : 'Se connecter',
  signInSubtitle: 'Bienvenue, veuillez vous connecter pour continuer',
  signInRememberMe: 'Se souvenir de moi',
  providerSignInTitle: (provider: string) => `Se connecter avec ${provider}`,

  // Common authentication labels
  email: 'E-mail',
  password: 'Mot de passe',
  username: "Nom d'utilisateur",
  passkey: "Clé d'accès",

  // Common action labels
  save: 'Enregistrer',
  cancel: 'Annuler',
  ok: 'OK',
  or: 'Ou',
  to: 'À',
  with: 'Avec',
  close: 'Fermer',
  delete: 'Supprimer',
  alert: 'Alerte',
  confirm: 'Confirmer',
  loading: 'Chargement…',

  // CRUD
  createNewButtonLabel: 'Créer',
  reloadButtonLabel: 'Recharger les données',
  createLabel: 'Créer',
  createSuccessMessage: 'Élément créé avec succès.',
  createErrorMessage: "Impossible de créer l'élément. Raison :",
  editLabel: 'Modifier',
  editSuccessMessage: 'Élément modifié avec succès.',
  editErrorMessage: "Impossible de modifier l'élément. Raison :",
  deleteLabel: 'Supprimer',
  deleteConfirmTitle: "Supprimer l'élément ?",
  deleteConfirmMessage: 'Souhaitez-vous supprimer cet élément ?',
  deleteConfirmLabel: 'Supprimer',
  deleteCancelLabel: 'Annuler',
  deleteSuccessMessage: 'Élément supprimé avec succès.',
  deleteErrorMessage: "Impossible de supprimer l'élément. Raison :",
  deletedItemMessage: 'Cet élément a été supprimé.',

  // Permissions
  accessDeniedMessage: "Vous n'avez pas la permission d'accéder à cette ressource.",
};

export default getLocalization(frLabels);
