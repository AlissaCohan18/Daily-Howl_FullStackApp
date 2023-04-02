

const Photo = ({props}) => {
    console.log(props)
  return (
    <div>
      <img src={props} className="main-photo" alt="dog" />
    </div>
  );
};

export default Photo;
