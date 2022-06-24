import { Row, Col } from "antd"
import PropTypes from "prop-types"

const CommentText = props => {
  const {
    text,
    self
  } = props
  return (
    <>
      <Row>
        <Col span={24} style={{margin: 5,display: 'flex', flexDirection: 'row', justifyContent: self ?  'flex-start' : 'flex-end', width: '100%'}}>
          <div 
            style={{
              borderRadius: self ? '20px 0px 10px 0px' : '0px 10px 0px 20px', width: 300, padding: 7,
              backgroundColor: '#ffffff', textAlign: 'center'
            }}
          >
            <span>{text}</span>
          </div>
        </Col>
      </Row>
    </>
  )
}

CommentText.propTypes = {
  text: PropTypes.string.isRequired,
  self: PropTypes.bool.isRequired
}

export default CommentText