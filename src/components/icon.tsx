function Icon({ number }: { number: number }) {
  return (
    <img
      src={`/icons/${number.toString().padStart(2, "0")}-s.png`}
      alt=""
      width="75"
      height="45"
    />
  );
}

export default Icon;
