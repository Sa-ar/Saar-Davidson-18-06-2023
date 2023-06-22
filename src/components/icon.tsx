function Icon({ number }: { number: number }) {
  return (
    <img src={`/icons/${number.toString().padStart(2, "0")}-s.png`} alt="" />
  );
}

export default Icon;
