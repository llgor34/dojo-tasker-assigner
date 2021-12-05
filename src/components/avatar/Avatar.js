import './Avatar.css';

const Avatar = (props) => {
  const { src } = props;

  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
};

export default Avatar;
