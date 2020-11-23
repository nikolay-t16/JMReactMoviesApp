import React from 'react';
import { Card, Rate } from 'antd';
import { format } from 'date-fns';
import classNames from 'classnames';

import './CardComponent.css';
import CardData from './CardData';
import { subStringWithWords } from '../../../helpers/StringHelper';
import TheMovieDB from '../../../helpers/TheMovieDB';
import GenreData from './GenreData';
import IndexPageContext from '../../pages/IndexPage/IndexPageContext';

export type CardComponentProps = { data: CardData; guestSession: string | null };
export type CardComponentState = { rate: number };
export type CardComponentContext = { genres: GenreData[] };

class CardComponent extends React.Component<CardComponentProps, CardComponentState> {
  public state: CardComponentState;

  public context: CardComponentContext = { genres: [] };

  constructor(props: CardComponentProps) {
    super(props);
    const {
      data: { rating: rate },
    } = props;
    this.state = { rate };
  }

  protected onChangeRate(rate: number) {
    const { guestSession, data } = this.props;
    if (guestSession === null) {
      return;
    }
    this.setState({ rate });
    TheMovieDB.rateMovie(guestSession, data.id, rate);
  }

  protected getGenres(): GenreData[] {
    const { genres } = this.context;
    const { data } = this.props;
    const cardGenres = genres.filter((genre) => data.genre_ids.includes(genre.id));
    return cardGenres.map<GenreData>(({ id, name }) => ({ id, name }));
  }

  public render() {
    const { data } = this.props;
    const { rate } = this.state;
    const bodyStyle = {
      padding: 0,
    };

    const getFormatDate = () => {
      try {
        return format(new Date(data.release_date), 'MMM d, yyyy');
      } catch {
        return '';
      }
    };

    const genresNode: JSX.Element[] = [];
    const genres = this.getGenres();
    if (genres && genres.length > 0) {
      const genresCount = genres.length <= 3 ? genres.length : 3;
      for (let i = 0; i < genresCount; i++) {
        const genre = genres[i];
        genresNode.push(
          <div key={genre.id} className="CardComponent__article-content-tags-item" title={genre.name}>
            {subStringWithWords(genre.name, 12)}
          </div>,
        );
      }
    }
    const imgStyle: any = {};
    let imgTag: JSX.Element;
    if (data.backdrop_path) {
      imgStyle.backgroundImage = `url(https://image.tmdb.org/t/p/w1280/${data.backdrop_path})`;
      imgTag = <div className="CardComponent__article-img" style={imgStyle} />;
    } else {
      imgTag = <div className="CardComponent__article-img">No image</div>;
    }
    return (
      <Card className="CardComponent" bodyStyle={bodyStyle}>
        <article className="CardComponent__article">
          {imgTag}
          <div className="CardComponent__article-content">
            <div className="CardComponent__article-content-header">
              <h2 className="CardComponent__article-content-header-title" title={data.title}>
                {subStringWithWords(data.title, 16)}
              </h2>
              <div
                className={classNames('CardComponent__article-content-header-reit', {
                  'CardComponent__article-content-header-reit_reit-low': data.vote_average < 3,
                  'CardComponent__article-content-header-reit_reit-mid':
                    data.vote_average >= 3 && data.vote_average < 5,
                  'CardComponent__article-content-header-reit_reit-high':
                    data.vote_average >= 5 && data.vote_average < 7,
                  'CardComponent__article-content-header-reit_reit-epic': data.vote_average >= 7,
                })}
              >
                {data.vote_average}
              </div>
            </div>

            <div className="CardComponent__article-content-date">{getFormatDate()}</div>
            {genresNode.length ? <div className="CardComponent__article-content-tags">{genresNode}</div> : null}
            <div className="CardComponent__article-content-text">{subStringWithWords(data.overview, 200)}</div>
            <Rate onChange={(value) => this.onChangeRate(value)} value={rate} count={10} />
          </div>
        </article>
      </Card>
    );
  }
}
CardComponent.contextType = IndexPageContext;

export default CardComponent;
