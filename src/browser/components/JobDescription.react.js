import React from 'react';

if (process.env.IS_BROWSER) {
  require('./JobDescription.styl');
}

const JobDescription = (props, {data = {}}) => {
  const position = props.data;
  return (
    <div className="content job">
      <div className="container-thin">
        <h1 className="heading-1">
          {position.position} {position.title}
        </h1>
        <p className="screen-desc">
          {position.desc}
        </p>
        <h3>What is your mission in Scalac?</h3>
        <ul>
          {position.mission && position.mission.map(item => <li key={item.id}>{item.desc}</li>)}
        </ul>
      </div>
    </div>
  );
};

JobDescription.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default JobDescription;
