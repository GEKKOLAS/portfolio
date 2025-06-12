import React from "react";

export const Social = () => {
  return (
    <section className="bg-transparent dark:bg-transparent">
      <div>
        <div className="grid grid-cols-5 pt-4 text-gray-500 sm:h-6 lg:grid-cols-5 dark:text-gray-400 items-center justify-center">
          {/* linkedIn */}
          <a
            href="https://www.linkedin.com/in/gekko"
            className="flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:text-[#0A66C2]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="48"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 256"
            >
              <path
                d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                fill="#0A66C2"
              />
            </svg>
          </a>
          {/* GitHub */}
            <a
            href="https://github.com/GEKKOLAS"
            className="flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
            >
            <span className="bg-gray-800 dark:bg-transparent rounded-full p-2 flex items-center justify-center">
              <svg
              width="48"
              height="48"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#ffff"
              />
              </svg>
            </span>
            </a>
          {/* cv */}
            <a
            href="https://oumha429zaujvejc.public.blob.vercel-storage.com/NickLatestCV-D2AWjDoc85jZwNiyVQWpt77Gpk5qfi.pdf"
            download
            className="flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:text-pink-500"
            target="_blank"
            rel="noopener noreferrer"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d22828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down-icon lucide-file-down"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
            </a>
          {/* InfoJobs */}
          <a
            href="#"
            className="flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:text-[#167db7]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              id="Logo_reduced"
              width="48"
              height="48"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 138 136.1"
            >
              <path
                id="BG"
                d="M138 113c0 12.8-10.3 23.1-23.1 23.1H23.1C10.3 136.1 0 125.7 0 113V23.1C0 10.3 10.3 0 23.1 0h91.8C127.7 0 138 10.3 138 23.1V113z"
                style={{ fill: "#167db7" }}
              />
              <g id="IJ">
                <path
                  d="M57.9 89.3c-.1.7-.7 1.2-1.5 1.2H45.3c-.7 0-1.3-.4-1.3-1.1l.1-.2 7.1-59.3c.1-.7.2-1 1-1.1h12c.6 0 .9.4.9 1v.2l-7.2 59.3zM86.2 91.3c-1.6 12.9-9.7 15.9-19.4 15.9-5.7 0-6.5-.2-8-.4-.7-.1-1.5-.2-1.5-1.3v-.5l.6-4.8c.2-1.4.7-1.7 2-1.7 1.2-.1 2.7-.1 4.5-.2 4.3-.2 7.3-.6 8.1-6.7L80 30c.1-.7.7-1.1 1.4-1.2l11.3.2h.2c.7 0 1 .4 1 1l-7.7 61.3z"
                  fill="#fff"
                />
              </g>
            </svg>
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/573102957334"
            className="flex justify-center items-center transition-transform duration-300 hover:scale-110 hover:text-[#25D366]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 256 259"
              width="48"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
                fill="#00E676"
              />
              <path
                d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
                fill="#FFF"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
