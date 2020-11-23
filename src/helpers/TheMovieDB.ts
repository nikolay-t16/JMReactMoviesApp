type GuestSessionData = {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
};

class TheMovieDB {
  protected readonly API_KEY = '8b6a083ff6ff5868767db606c49d5b0b';

  protected readonly API_SEARCH_MOVIE_PATH = 'search/movie';

  protected readonly API_SEARCH_GENRE_PATH = 'genre/movie/list';

  protected readonly API_GUEST_SESSIONS = 'authentication/guest_session/new';

  protected readonly API_GET_RATED_MOVIES = 'guest_session/{guest_session_id}/rated/movies';

  protected readonly API_RATE_MOVIE = 'movie/{movie_id}/rating';

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

  public async fetchMovies({ search, page = 1 }: { search: string; page: number }) {
    const params = {
      page,
      query: search,
    };
    return this.fetch(this.API_SEARCH_MOVIE_PATH, params);
  }

  public async fetchGeneres() {
    return this.fetch(this.API_SEARCH_GENRE_PATH);
  }

  public async fetchGuestSession(): Promise<GuestSessionData> {
    return this.fetch(this.API_GUEST_SESSIONS);
  }

  public async fetchRatedMovies({ sessionId, page = 1 }: { sessionId: string; page: number }) {
    const params = { page };
    return this.fetch(this.API_GET_RATED_MOVIES.replace('{guest_session_id}', sessionId), params);
  }

  public async rateMovie(sessionId: string, movieId: number, value: number) {
    const params = { guest_session_id: sessionId };
    const body = { value };
    const path = this.API_RATE_MOVIE.replace('{movie_id}', movieId.toString());
    return this.fetch(path, params, 'POST', body);
  }

  protected async fetch(path: string, getParams: object = {}, method: string = 'GET', postParams: object = {}) {
    const queryString = this.makeQueryString({
      api_key: this.API_KEY,
      ...getParams,
    });
    const apiPath = `${this.API_MOVIE_PATH}${path}?${queryString}`;
    const params: any = { method };
    if (method !== 'GET') {
      params.body = JSON.stringify(postParams);
      params.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    }
    const response = await fetch(apiPath, params);
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
}

export default new TheMovieDB();
