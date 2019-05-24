const URL_KEY = 'urlToRestore';

class UrlRestoringService {
  static setUrl(url) {
    sessionStorage.setItem(URL_KEY, url);
  }

  static getUrl() {
    const url = sessionStorage.getItem(URL_KEY);
    sessionStorage.removeItem(URL_KEY);

    return url;
  }
}

export default UrlRestoringService;
