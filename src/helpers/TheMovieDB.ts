class TheMovieDB {
  protected readonly API_KEY = '8b6a083ff6ff5868767db606c49d5b0b';

  protected readonly API_SEARCH_MOVIE_PATH = 'search/movie';

  protected readonly API_SEARCH_GENRE_PATH = 'genre/movie/list';

  protected readonly API_MOVIE_PATH = 'https://api.themoviedb.org/3/';

  protected makeQueryString(params: Object) {
    const esc = encodeURIComponent;

    return (
      Object.keys(params)
        // @ts-ignore
        .map((key: string) => `${esc(key)}=${esc(params[key])}`)
        .join('&')
    );
  }

  public async fetchMovies(query: string, page: number = 1) {
    const params = {
      page,
      query,
    };
    return this.fetch(this.API_SEARCH_MOVIE_PATH, params);
  }

  public async fetchGeneres() {
    return this.fetch(this.API_SEARCH_GENRE_PATH);
  }

  protected async fetch(path: string, params: object = {}, method: string = 'GET') {
    const queryString = this.makeQueryString({
      api_key: this.API_KEY,
      ...params,
    });
    const apiPath = `${this.API_MOVIE_PATH}${path}?${queryString}`;
    const response = await fetch(apiPath, { method });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
}

export default new TheMovieDB();
