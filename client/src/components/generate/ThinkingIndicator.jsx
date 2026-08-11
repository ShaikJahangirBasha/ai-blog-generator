import { useId } from "react";

function ThinkingIndicator() {
  const filterId = useId().replace(/:/g, "");

  const blobDelays = [
    "0.2s",
    "0.4s",
    "0.6s",
    "0.8s",
    "1s",
    "1.2s",
  ];

  return (
    <>
      <style>{`
        .thinking-blobs {
          width: 300px;
          height: 300px;
          position: relative;
          overflow: hidden;
          border-radius: 70px;
          transform-style: preserve-3d;
          filter: url(#goo-${filterId});
        }

        .thinking-blobs .blob-center {
          transform-style: preserve-3d;
          position: absolute;
          background: #1d1d1d;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          transform-origin: left top;
          transform: scale(0.9) translate(-50%, -50%);
          animation: blob-grow-2 3.4s linear infinite;
          border-radius: 50%;
          box-shadow: 0 -10px 40px -5px #1d1d1d;
        }

        .thinking-blobs .blob {
          position: absolute;
          background: #1d1d1d;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          animation: blobs-2 3.4s ease-out infinite;
          transform: scale(0.9) translate(-50%, -50%);
          transform-origin: center top;
          opacity: 0;
        }

        @keyframes blobs-2 {
          0% {
            opacity: 0;
            transform: scale(0)
              translate(calc(-330px - 50%), -50%);
          }

          1% {
            opacity: 1;
          }

          35%,
          65% {
            opacity: 1;
            transform: scale(0.9)
              translate(-50%, -50%);
          }

          99% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: scale(0)
              translate(calc(330px - 50%), -50%);
          }
        }

        @keyframes blob-grow-2 {
          0%,
          39% {
            transform: scale(0)
              translate(-50%, -50%);
          }

          40%,
          42% {
            transform: scale(1, 0.9)
              translate(-50%, -50%);
          }

          43%,
          44% {
            transform: scale(1.2, 1.1)
              translate(-50%, -50%);
          }

          45%,
          46% {
            transform: scale(1.3, 1.2)
              translate(-50%, -50%);
          }

          47%,
          48% {
            transform: scale(1.4, 1.3)
              translate(-50%, -50%);
          }

          52% {
            transform: scale(1.5, 1.4)
              translate(-50%, -50%);
          }

          54% {
            transform: scale(1.7, 1.6)
              translate(-50%, -50%);
          }

          58% {
            transform: scale(1.8, 1.7)
              translate(-50%, -50%);
          }

          68%,
          70% {
            transform: scale(1.7, 1.5)
              translate(-50%, -50%);
          }

          78% {
            transform: scale(1.6, 1.4)
              translate(-50%, -50%);
          }

          80%,
          81% {
            transform: scale(1.5, 1.4)
              translate(-50%, -50%);
          }

          82%,
          83% {
            transform: scale(1.4, 1.3)
              translate(-50%, -50%);
          }

          84%,
          85% {
            transform: scale(1.3, 1.2)
              translate(-50%, -50%);
          }

          86%,
          87% {
            transform: scale(1.2, 1.1)
              translate(-50%, -50%);
          }

          90%,
          91% {
            transform: scale(1, 0.9)
              translate(-50%, -50%);
          }

          92%,
          100% {
            transform: scale(0)
              translate(-50%, -50%);
          }
        }
      `}</style>

      {/* SVG Goo Filter */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="0"
        height="0"
        aria-hidden="true"
        style={{
          position: "absolute",
        }}
      >
        <defs>
          <filter id={`goo-${filterId}`}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />

            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -7
              "
              result="goo"
            />

            <feBlend
              in="SourceGraphic"
              in2="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Blob Animation */}

      <div className="flex items-center justify-center">
        <div className="thinking-blobs">
          <div className="blob-center" />

          {blobDelays.map(
            (delay, index) => (
              <div
                key={index}
                className="blob"
                style={{
                  animationDelay: delay,
                }}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default ThinkingIndicator;