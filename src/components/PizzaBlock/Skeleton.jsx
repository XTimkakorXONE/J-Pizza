import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
  >
    <rect x="1" y="0" rx="40" ry="40" width="260" height="260" />
    <rect x="0" y="280" rx="8" ry="8" width="260" height="40" />
    <rect x="0" y="336" rx="15" ry="15" width="260" height="88" />
    <rect x="0" y="452" rx="8" ry="8" width="115" height="30" />
    <rect x="130" y="442" rx="14" ry="14" width="142" height="45" />
  </ContentLoader>
);
