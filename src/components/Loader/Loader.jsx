import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
  const styles = {
    margin: '0 auto',
    display: 'block',
  };
  return (
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#9EBBFF"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={styles}
      wrapperClass="threeDots-spinner-wrapper"
    />
  );
}
