
const Icon = ({ name, width= 0, height = 0, color = 'currentColor', className}) => {
  return (
    <svg width={width} height={height} fill={color} className={className}>
      {/* Here we're linking to the sprite's ID using the "use" tag */}
      <use xlinkHref={`/src/assets/images/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;