import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import './footer.js';

export default class BlazeWrapper extends React.Component {
  render() {
    return (
      <div>
        <Blaze template={this.props.templateName} />
      </div>
    )
  }
}