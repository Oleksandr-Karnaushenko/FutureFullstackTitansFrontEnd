
const Icon = ({ name, width= 12, height = 12, color = 'currentColor', className}) => {
  return (
    <svg width={width} height={height} fill={color} className={className}>
      {/* Here we're linking to the sprite's ID using the "use" tag */}
      <use xlinkHref={`/src/assets/images/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;