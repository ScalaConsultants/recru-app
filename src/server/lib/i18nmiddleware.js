function extractLocaleFromReq(req, locales) {
  return req.acceptsLanguages(locales);
}

export default function middleware({appLocales, defaultLocale, getLocaleFromRequest = extractLocaleFromReq}) {

  return (req, res, next) => {
    let userLocale = getLocaleFromRequest(req, appLocales);
    if (appLocales.indexOf(userLocale) === -1) userLocale = defaultLocale;
    req.i18n = {
      locale: userLocale
    };
    next();
  };

}
