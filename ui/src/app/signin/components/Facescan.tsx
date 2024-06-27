import { SVGProps } from "react";

const FaceScan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="30em"
    height="30em"
    viewBox="0 0 250 250"
    xmlSpace="preserve"
    {...props}
  >
    <style type="text/css">
      {
        "\n\t.st0{opacity:1;}\n\t.st1{fill:none;stroke:#000000;stroke-width:5.3207;stroke-miterlimit:10;}\n\t.st2{fill:none;stroke:#000000;stroke-width:6.6498;stroke-linecap:round;stroke-miterlimit:10;}\n\t.st3{fill:none;stroke:#000000;stroke-width:7.449;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}\n"
      }
    </style>
    <g className="st0">
      <g id="hair">
        <path
          className="st1"
          d="M139.09,94.44c2.95,3.21,24.36,25,59.76,20.72c1.03-0.12,1.82-0.96,1.89-1.99 c3.14-47.09-34.66-78.76-76.09-78.28c-41.53,0.48-80.26,34.82-76.09,78.7c0.08,0.83,0.65,1.53,1.44,1.8 c7.85,2.62,49.82,14.26,88.34-20.97C138.56,94.22,138.89,94.23,139.09,94.44z"
        />
        <path className="st1" d="M57.12,125.97c0,0,12.24,11.99,21.12,12.7" />
        <path className="st1" d="M166.3,135.65c0,0,16.95-0.22,25.52-11.81" />
        <line className="st1" x1={106.99} y1={140.12} x2={138.73} y2={140.12} />
      </g>
      <g id="head">
        <path
          className="st1"
          d="M58,117.59c15.87,3.23,49.43,5.8,80.47-22.59c0.22-0.2,0.55-0.19,0.74,0.03c2.72,2.97,20.4,21.6,51.17,21.03 c0.6,4.39,0.99,9.27,1.15,14.7c0.14,4.82,0.1,10.06-0.14,15.78c-0.24,5.68-1.1,11.17-2.51,16.42 c-7.98,29.56-33.69,51.01-65.71,50.28c-37.7-0.86-66.7-32.11-66.7-69.82C56.47,133.43,57,124.89,58,117.59z"
        />
      </g>
      <g id="ears">
        <path
          className="st1"
          d="M191.6,130.87c0.13,4.47,0.09,10.01-0.13,15.32c-0.22,5.27-1.02,10.38-2.33,15.24 c10.21,1.52,16.12-5.03,18.19-10.07c1.61-3.93,1.7-8.37-0.02-12.25C205.45,134.95,200.24,130.43,191.6,130.87z"
        />
        <path
          className="st1"
          d="M56.41,129.89c-0.12,4.9-0.08,10.98,0.13,16.79c0.21,5.77,0.95,11.37,2.18,16.71 c-9.52,1.66-15.05-5.52-16.98-11.03c-1.51-4.31-1.59-9.17,0.02-13.43C43.48,134.37,48.35,129.41,56.41,129.89z"
        />
      </g>
      <g id="scan">
        <line className="st2" x1={20.19} y1={178.22} x2={229.48} y2={178.22} />
        <polyline
          className="st3"
          points="191.62,8.34 239.98,8.34 239.98,56.71  "
        />
        <polyline className="st3" points="8.76,56.71 8.76,8.34 57.12,8.34  " />
        <polyline
          className="st3"
          points="57.32,241.09 8.96,241.09 8.96,192.73  "
        />
        <polyline
          className="st3"
          points="240.18,192.73 240.18,241.09 191.82,241.09  "
        />
        <circle className="st1" cx={92.3} cy={145.62} r={15.68} />
        <circle className="st1" cx={153.71} cy={144.98} r={15.68} />
      </g>
    </g>
  </svg>
);

export default FaceScan;
