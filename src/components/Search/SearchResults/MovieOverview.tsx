import { Movie } from "@jodi/tmdb-typescript-api";
import * as React from "react";
import { isMovieMulti } from "../utils";
import { GetImageUrl } from "../utils/GetImageUrl";

export interface IMovieOverview {
  data: Movie;
  getImageUrl: GetImageUrl["buildPath"];
}

export class MovieOverview extends React.Component<IMovieOverview> {
  public shouldComponentUpdate(nextProps: IMovieOverview) {
    return this.props.data.id !== nextProps.data.id;
  }

  public render() {
    const { data, getImageUrl } = this.props;
    const bgImage = getImageUrl(data.backdrop_path, "backdrop", 1000);
    const style = bgImage ? { backgroundImage: `url("${bgImage}")` } : {};

    return (
      <div
        className="searchResults__item searchResults__item--movie"
        style={style}
      >
        <div className="searchResults__item__text">
          <h2 className="searchResults__item__title">{data.title}</h2>
          {isMovieMulti(data) &&
            data.media_type && (
              <h3 className="searchResults__item__type">Movie</h3>
            )}
        </div>
      </div>
    );
  }
}
