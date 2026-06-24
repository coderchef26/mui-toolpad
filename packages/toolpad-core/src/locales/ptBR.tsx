import type { LocaleText } from '../AppProvider';
import { getLocalization } from './getLocalization';

const ptBRLabels: Partial<LocaleText> = {
  // Account
  accountSignInLabel: 'Entrar',
  accountSignOutLabel: 'Sair',

  // AccountPreview
  accountPreviewTitle: 'Conta',
  accountPreviewIconButtonLabel: 'Usuário atual',

  // SignInPage
  signInTitle: (brandingTitle?: string) =>
    brandingTitle ? `Entrar em ${brandingTitle}` : 'Entrar',
  signInSubtitle: 'Bem-vindo, por favor entre para continuar',
  signInRememberMe: 'Lembrar de mim',
  providerSignInTitle: (provider: string) => `Entrar com ${provider}`,

  // Common authentication labels
  email: 'E-mail',
  password: 'Senha',
  username: 'Nome de usuário',
  passkey: 'Chave de acesso',

  // Common action labels
  save: 'Salvar',
  cancel: 'Cancelar',
  ok: 'OK',
  or: 'Ou',
  to: 'Para',
  with: 'Com',
  close: 'Fechar',
  delete: 'Excluir',
  alert: 'Alerta',
  confirm: 'Confirmar',
  loading: 'Carregando…',

  // CRUD
  createNewButtonLabel: 'Criar novo',
  reloadButtonLabel: 'Recarregar dados',
  createLabel: 'Criar',
  createSuccessMessage: 'Item criado com sucesso.',
  createErrorMessage: 'Falha ao criar item. Motivo:',
  editLabel: 'Editar',
  editSuccessMessage: 'Item editado com sucesso.',
  editErrorMessage: 'Falha ao editar item. Motivo:',
  deleteLabel: 'Excluir',
  deleteConfirmTitle: 'Excluir item?',
  deleteConfirmMessage: 'Deseja excluir este item?',
  deleteConfirmLabel: 'Excluir',
  deleteCancelLabel: 'Cancelar',
  deleteSuccessMessage: 'Item excluído com sucesso.',
  deleteErrorMessage: 'Falha ao excluir item. Motivo:',
  deletedItemMessage: 'Este item foi excluído.',

  // Permissions
  accessDeniedMessage: 'Você não tem permissão para acessar este recurso.',
};

export default getLocalization(ptBRLabels);
