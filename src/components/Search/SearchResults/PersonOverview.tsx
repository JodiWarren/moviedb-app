import { Person } from "@jodi/tmdb-typescript-api";
import * as React from "react";
import { isPersonMulti } from "../utils";
import { GetImageUrl } from "../utils/GetImageUrl";

export interface IPersonOverview {
  data: Person;
  getImageUrl: GetImageUrl["buildPath"];
}

export class PersonOverview extends React.Component<IPersonOverview> {
  public shouldComponentUpdate(nextProps: IPersonOverview) {
    return this.props.data.id !== nextProps.data.id;
  }

  public render() {
    const { data, getImageUrl } = this.props;
    const bgImage =
      data.known_for.length && data.known_for[0].backdrop_path
        ? getImageUrl(data.known_for[0].backdrop_path, "backdrop", 1000)
        : "";
    const style = bgImage ? { backgroundImage: `url("${bgImage}")` } : {};

    return (
      <div
        className="searchResults__item searchResults__item--person"
        style={style}
      >
        <div className="searchResults__item__text">
          <h2 className="searchResults__item__title">{data.name}</h2>
          {isPersonMulti(data) &&
            data.media_type && (
              <h3 className="searchResults__item__type">Person</h3>
            )}
        </div>
      </div>
    );
  }
}
