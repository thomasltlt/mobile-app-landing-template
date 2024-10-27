interface Props {
  src: string;
}

function IphoneFrame({ src }: Props) {
  return (
    <div className="relative rounded-[14%] h-full">
      <div className="absolute top-2 bottom-2 left-0.5 right-0.5 rounded-[14%] overflow-hidden">
        <img
          src={src}
          alt="screenshot"
          className="absolute rounded-[14%] overflow-hidden"
        />
      </div>
      <img
        src="/misc/iphone-frame.webp"
        alt="iphone-frame"
        className="relative z-10 h-full"
      />
    </div>
  );
}

export default IphoneFrame;
