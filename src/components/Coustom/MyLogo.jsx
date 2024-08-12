const IroomieLogo = ({ logo = true }) => (
  <div className={`font-marhey text-4xl text-blue-500 flex items-center gap-2`}>
    {logo && <SVGComponent className="h-8 w-8" />}
    <span className="h-[1.6rem]">iRoomie</span>
  </div>
);
export default IroomieLogo;
<div className={`font-marhey text-4xl text-blue-500 text-center`}>iRoomie</div>;

const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={880}
    height={880}
    viewBox="0 0 880 880"
    xmlSpace="preserve"
    {...props}
  >
    <g transform="matrix(1 0 0 1 440 440)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(8.8 0 0 8.8 0 0)">
          <polygon
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(33,150,243)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            points="45.2,47.8 37.2,47.8 37.2,0.7 0,-36.5 -37.2,0.7 -37.2,27.5 20,27.5 20,35.5 -45.2,35.5 -45.2,-2.6 0,-47.8 45.2,-2.6 "
          />
        </g>
        <g transform="matrix(8.8 0 0 8.8 -56.32 78.31)">
          <polygon
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(33,150,243)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            points="38.8,38.9 -38.8,38.9 -38.8,30.9 30.8,30.9 30.8,-3.2 6.4,-27.6 -18,-3.2 -18,14.2 -26,14.2 -26,-6.5 6.4,-38.9 38.8,-6.5 "
          />
        </g>
      </g>
    </g>
  </svg>
);
