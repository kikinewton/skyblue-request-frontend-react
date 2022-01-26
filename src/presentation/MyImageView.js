import React from 'react';
import PropTypes from "prop-types"

const MyImageView = ({src}) => {
  return (
    <>
      <img src={src} alt="image" width={400} />
    </>
  )
}

MyImageView.propTypes = {
  src: PropTypes.string.isRequired
}

export default MyImageView