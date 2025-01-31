export const useGetNavigatorLocale = () => {
  const navigatorLocale = navigator.languages
    ? navigator.languages[0] || navigator.language || 'fr'
    : navigator.language || 'fr';

  return navigatorLocale.includes('fr') ? 'fr' : navigatorLocale.includes('en') ? 'en' : 'fr';
};
