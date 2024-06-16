import React from "react";

const Icon = ({ name, className }) => {
  switch (name) {
    case "chevronDown":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-chevron-down`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
      );
    case "chevronUp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-chevron-up`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
          />
        </svg>
      );
    case "search":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-search`}
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      );
    case "heart":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-heart`}
          viewBox="0 0 16 16"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
        </svg>
      );
    case "heartFill":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-heart-fill`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          />
        </svg>
      );
    case "palette":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-palette`}
          viewBox="0 0 16 16"
        >
          <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
          <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
        </svg>
      );
    case "cardImage":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-card-image`}
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
        </svg>
      );
    case "personVcard":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-person-vcard`}
          viewBox="0 0 16 16"
        >
          <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
        </svg>
      );
    case "download":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-download`}
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-arrow-right`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      );
    case "arrowLeft":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-arrow-left`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      );
    case "share":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-share`}
          viewBox="0 0 16 16"
        >
          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-chevron-right`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      );
    case "fileEarmarkEasel":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-file-earmark-easel"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 6a.5.5 0 1 0-1 0h-2A1.5 1.5 0 0 0 4 7.5v2A1.5 1.5 0 0 0 5.5 11h.473l-.447 1.342a.5.5 0 1 0 .948.316L7.027 11H7.5v1a.5.5 0 0 0 1 0v-1h.473l.553 1.658a.5.5 0 1 0 .948-.316L10.027 11h.473A1.5 1.5 0 0 0 12 9.5v-2A1.5 1.5 0 0 0 10.5 6zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z" />
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
        </svg>
      );

    case "x":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-x`}
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      );
    case "Box-arrow-up-right":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-box-arrow-up-right`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
          />
          <path
            fillRule="evenodd"
            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
          />
        </svg>
      );
    case "canva":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="N8aMJ-jZ4-cfldZrsnvhda_iWw83PVcBpLw_gr1"
            x1="38.263"
            x2="10.15"
            y1="1373.62"
            y2="1342.615"
            gradientTransform="translate(0 -1333.89)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#823af3"></stop>
            <stop offset="0.36" stopColor="#4b66e1"></stop>
            <stop offset="0.906" stopColor="#01f1c4"></stop>
          </linearGradient>
          <path
            fill="url(#N8aMJ-jZ4-cfldZrsnvhda_iWw83PVcBpLw_gr1)"
            fillRule="evenodd"
            d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M29.194 26.962c-.835.915-2.007 1.378-2.556 1.378-.635 0-.982-.389-1.053-.974a2.374 2.374 0 01.024-.673c.21-1.31.692-2.124.662-2.372-.009-.071-.049-.106-.101-.106-.406 0-1.83 1.47-2.046 2.443l-.168.779c-.11.549-.648.902-1.018.902-.177 0-.311-.088-.334-.283a.853.853 0 01.021-.266l.079-.41c-.768.574-1.596.962-1.984.962-.53 0-.827-.283-.933-.709-.35.461-.813.709-1.306.709-.63 0-1.237-.417-1.528-1.034a7.246 7.246 0 01-1.496 1.299c-.869.55-1.836.992-2.982.992-1.058 0-1.956-.566-2.453-1.026-.737-.69-1.126-1.718-1.241-2.656-.362-2.957 1.438-6.834 4.227-8.533a3.927 3.927 0 012.008-.584c1.34 0 2.34.958 2.48 2.104.126 1.032-.286 1.924-1.431 2.501-.584.296-.874.282-.965.141-.061-.094-.026-.254.091-.351 1.076-.899 1.096-1.637.97-2.677-.082-.669-.522-1.098-1.016-1.098-2.115 0-5.149 4.745-4.727 8.197.165 1.346.99 2.904 2.682 2.904.564 0 1.162-.159 1.694-.425.928-.474 1.453-.85 1.98-1.464-.13-1.596 1.24-3.6 3.278-3.6.882 0 1.612.354 1.698 1.062.108.885-.646 1.062-.928 1.062-.247 0-.643-.071-.671-.301-.03-.248.534-.106.464-.673-.043-.354-.411-.478-.763-.478-1.269 0-1.97 1.77-1.835 2.869.061.496.315.991.774.991.37 0 .904-.531 1.109-1.31.13-.531.632-.885 1.003-.885.194 0 .328.088.352.283a.84.84 0 01-.021.266c-.042.23-.219.996-.21 1.154.006.138.086.328.326.328.19 0 .89-.378 1.538-.958l.474-2.454c.079-.426.232-.865 1.096-.865.177 0 .311.088.337.301.008.07.002.16-.021.266l-.242 1.093c.758-1.01 1.936-1.752 2.642-1.752.3 0 .531.158.57.478.022.178-.03.478-.147.814-.251.69-.533 1.727-.72 2.62-.04.19.026.476.373.476.277 0 1.166-.339 1.885-1.288-.005-.134-.007-.27-.007-.408 0-.744.053-1.346.194-1.787.141-.461.723-.902 1.11-.902.194 0 .335.106.335.318 0 .071-.018.16-.053.248-.264.779-.405 1.506-.405 2.231 0 .407.088 1.062.177 1.398.018.071.034.142.105.142.123 0 .952-.814 1.551-1.806-.53-.337-.829-.956-.829-1.718 0-1.274.758-1.93 1.498-1.93.582 0 1.11.425 1.11 1.274 0 .532-.212 1.134-.51 1.718 0 0 .123.018.176.018a1.32 1.32 0 001.006-.443c.088-.1.17-.178.248-.224.59-.713 1.455-1.228 2.47-1.228.864 0 1.61.337 1.696 1.045.11.902-.661 1.08-.926 1.08-.264 0-.661-.071-.689-.301s.551-.106.484-.654c-.043-.354-.413-.496-.766-.496-1.182 0-1.994 1.576-1.838 2.85.062.514.299 1.01.758 1.01.37 0 .923-.532 1.127-1.31.131-.514.632-.885 1.002-.885.176 0 .328.088.354.301.013.106-.03.337-.227 1.168a2.625 2.625 0 00-.066.903c.063.514.298.85.516 1.045.079.07.126.158.132.213.017.142-.091.266-.267.266-.053 0-.123 0-.181-.035-.908-.372-1.285-.991-1.391-1.576-.35.442-.814.69-1.29.69-.811 0-1.603-.709-1.715-1.629a2.86 2.86 0 01.123-1.184c-.329.203-.683.316-1.001.316-.106 0-.194 0-.299-.018-.793 1.15-1.622 1.947-2.257 2.302-.264.142-.51.213-.687.213-.142 0-.3-.035-.37-.159-.166-.277-.275-.713-.339-1.225zm2.873-3.771c0 .496.246 1.01.564 1.346.124-.337.194-.673.194-1.01 0-.638-.247-.921-.441-.921-.229 0-.317.32-.317.585z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    case "google-slide":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <path
            fill="#ffc107"
            d="M37 45H11a3 3 0 01-3-3V6a3 3 0 013-3h19l10 10v29a3 3 0 01-3 3z"
          ></path>
          <path fill="#ffecb3" d="M40 13H30V3z"></path>
          <path fill="#ffa000" d="M30 13l10 10V13z"></path>
          <path
            fill="#fff"
            d="M30 22H18c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V24c0-1.1-.9-2-2-2zm0 4v8H18v-8h12z"
          ></path>
        </svg>
      );
    case "google-sheet":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <path
            fill="#43a047"
            d="M37 45H11a3 3 0 01-3-3V6a3 3 0 013-3h19l10 10v29a3 3 0 01-3 3z"
          ></path>
          <path fill="#c8e6c9" d="M40 13H30V3z"></path>
          <path fill="#2e7d32" d="M30 13l10 10V13z"></path>
          <path
            fill="#e8f5e9"
            d="M31 23H15v14h18V23h-2zm-14 2h4v2h-4v-2zm0 4h4v2h-4v-2zm0 4h4v2h-4v-2zm14 2h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8v-2h8v2z"
          ></path>
        </svg>
      );
    case "google-doc":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <path
            fill="#2196f3"
            d="M37 45H11a3 3 0 01-3-3V6a3 3 0 013-3h19l10 10v29a3 3 0 01-3 3z"
          ></path>
          <path fill="#bbdefb" d="M40 13H30V3z"></path>
          <path fill="#1565c0" d="M30 13l10 10V13z"></path>
          <path
            fill="#e3f2fd"
            d="M15 23h18v2H15zm0 4h18v2H15zm0 4h18v2H15zm0 4h10v2H15z"
          ></path>
        </svg>
      );
    case "powerpoint":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FF8A65"
            d="M41 10H25v28h16a1 1 0 001-1V11a1 1 0 00-1-1z"
          ></path>
          <path
            fill="#FBE9E7"
            d="M24 29h14v2H24zm0 4h14v2H24zm6-18a6 6 0 000 12 6 6 0 006-6h-6v-6z"
          ></path>
          <path fill="#FBE9E7" d="M32 13v6h6a6 6 0 00-6-6z"></path>
          <path fill="#E64A19" d="M27 42L6 38V10l21-4z"></path>
          <path
            fill="#FFF"
            d="M16.828 17H12v14h3v-4.823h1.552c1.655 0 2.976-.436 3.965-1.304.988-.869 1.484-2.007 1.482-3.412C22 18.487 20.275 17 16.828 17zm-.534 6.785H15v-4.364h1.294c1.641 0 2.461.72 2.461 2.158 0 1.472-.82 2.206-2.461 2.206z"
          ></path>
        </svg>
      );
    case "eye-fill":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} bi bi-eye-fill`}
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
        </svg>
      );
    case "arrows-angle-expand":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-arrows-angle-expand`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"
          />
        </svg>
      );
    case "arrows-angle-contract":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-arrows-angle-contract`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"
          />
        </svg>
      );
    case "arrow-right-square":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-arrow-right-square`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fff"
            d="M4.868 43.303l2.694-9.835a18.941 18.941 0 01-2.535-9.489C5.032 13.514 13.548 5 24.014 5a18.867 18.867 0 0113.43 5.566A18.866 18.866 0 0143 23.994c-.004 10.465-8.522 18.98-18.986 18.98-.001 0 0 0 0 0h-.008a18.965 18.965 0 01-9.073-2.311l-10.065 2.64z"
          ></path>
          <path
            fill="#fff"
            d="M4.868 43.803a.499.499 0 01-.482-.631l2.639-9.636a19.48 19.48 0 01-2.497-9.556C4.532 13.238 13.273 4.5 24.014 4.5a19.367 19.367 0 0113.784 5.713A19.362 19.362 0 0143.5 23.994c-.004 10.741-8.746 19.48-19.486 19.48a19.535 19.535 0 01-9.144-2.277l-9.875 2.589a.457.457 0 01-.127.017z"
          ></path>
          <path
            fill="#cfd8dc"
            d="M24.014 5a18.867 18.867 0 0113.43 5.566A18.866 18.866 0 0143 23.994c-.004 10.465-8.522 18.98-18.986 18.98h-.008a18.965 18.965 0 01-9.073-2.311l-10.065 2.64 2.694-9.835a18.941 18.941 0 01-2.535-9.489C5.032 13.514 13.548 5 24.014 5m0-1C12.998 4 4.032 12.962 4.027 23.979a20.01 20.01 0 002.461 9.622L3.903 43.04a.998.998 0 001.219 1.231l9.687-2.54a20.026 20.026 0 009.197 2.244c11.024 0 19.99-8.963 19.995-19.98A19.856 19.856 0 0038.153 9.86 19.869 19.869 0 0024.014 4z"
          ></path>
          <path
            fill="#40c351"
            d="M35.176 12.832a15.673 15.673 0 00-11.157-4.626c-8.704 0-15.783 7.076-15.787 15.774a15.738 15.738 0 002.413 8.396l.376.597-1.595 5.821 5.973-1.566.577.342a15.75 15.75 0 008.032 2.199h.006c8.698 0 15.777-7.077 15.78-15.776a15.68 15.68 0 00-4.618-11.161z"
          ></path>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M19.268 16.045c-.355-.79-.729-.806-1.068-.82-.277-.012-.593-.011-.909-.011-.316 0-.83.119-1.265.594-.435.475-1.661 1.622-1.661 3.956 0 2.334 1.7 4.59 1.937 4.906.237.316 3.282 5.259 8.104 7.161 4.007 1.58 4.823 1.266 5.693 1.187.87-.079 2.807-1.147 3.202-2.255.395-1.108.395-2.057.277-2.255-.119-.198-.435-.316-.909-.554s-2.807-1.385-3.242-1.543c-.435-.158-.751-.237-1.068.238-.316.474-1.225 1.543-1.502 1.859-.277.317-.554.357-1.028.119s-2.002-.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285-.277-.474-.03-.731.208-.968.213-.213.474-.554.712-.831.237-.277.316-.475.474-.791.158-.317.079-.594-.04-.831-.117-.238-1.039-2.584-1.461-3.522z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    case "telegram":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
          x="0"
          y="0"
          viewBox="0 0 48 48"
        >
          <path fill="#29b6f6" d="M24 4a20 20 0 100 40 20 20 0 100-40z"></path>
          <path
            fill="#fff"
            d="M33.95 15l-3.746 19.126s-.161.874-1.245.874c-.576 0-.873-.274-.873-.274l-8.114-6.733-3.97-2.001-5.095-1.355S10 24.375 10 23.625c0-.625.933-.923.933-.923l21.316-8.468c-.001-.001.651-.235 1.126-.234.292 0 .625.125.625.5 0 .25-.05.5-.05.5z"
          ></path>
          <path
            fill="#b0bec5"
            d="M23 30.505l-3.426 3.374s-.149.115-.348.12a.494.494 0 01-.219-.043l.964-5.965L23 30.505z"
          ></path>
          <path
            fill="#cfd8dc"
            d="M29.897 18.196a.5.5 0 00-.701-.093L16 26s2.106 5.892 2.427 6.912c.322 1.021.58 1.045.58 1.045l.964-5.965 9.832-9.096a.499.499 0 00.094-.7z"
          ></path>
        </svg>
      );
    case "email":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-envelope-arrow-up-fill`}
          viewBox="0 0 16 16"
        >
          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016" />
        </svg>
      );
    case "play-btn":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-play-circle`}
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
        </svg>
      );
    case "arrow-counterclockwise":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-arrow-counterclockwise`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
        </svg>
      );
    case "list":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-list`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      );
    case "plus":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-plus`}
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      );
    case "dash":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-dash`}
          viewBox="0 0 16 16"
        >
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
        </svg>
      );
    case "sort-down":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-sort-down`}
          viewBox="0 0 16 16"
        >
          <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
        </svg>
      );
    case "funnel":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-funnel`}
          viewBox="0 0 16 16"
        >
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
        </svg>
      );
    case "filter-circle":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-filter-circle`}
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
        </svg>
      );
    case "exclamation-circle":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-exclamation-circle`}
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className={`${className} bi bi-chevron-down`}
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
      );
  }
};

export default Icon;
