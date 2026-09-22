import React, { createContext, useContext } from 'react';
import i18next from 'i18next';
import translations from '../../../libraries/react-shared-libraries/src/translation/locales/pt/translation.json';

export const CalendarContext = createContext({});
export const useCalendar = () => useContext(CalendarContext);
export const useT = () => (key, fallback) =>
  translations[key] || fallback || key;
export const useFetch = () => () => {
  throw new Error('Network is disabled in the screenshot fixture');
};
export const useUser = () => ({ isSuperAdmin: false });
export const useVariables = () => ({ disableXAnalytics: true });
export const useModals = () => ({
  openModal: () => {
    throw new Error('Modals are disabled in the screenshot fixture');
  },
});
export const useToaster = () => ({ show: () => {} });
export const useAddProvider = () => () => {};
export const ExistingDataContextProvider = React.Fragment;
export const StatisticsModal = () => null;
export const MissingReleaseModal = () => null;
export const AddEditModal = () => null;
export const CreationMethodBadge = () => null;
export const deleteDialog = async () => false;
export const stripHtmlValidation = (_format, content) =>
  content.replace(/<[^>]*>/g, '');
export const Button = ({ children }) => <button>{children}</button>;
export default function SafeImage(props) {
  return <img {...props} />;
}
await i18next.init({
  lng: 'pt',
  resources: { pt: { translation: translations } },
});
