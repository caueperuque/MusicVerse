import React, { Component } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

class Loading extends Component {
  render() {
    return (
      <div>
        {/* <h1>
          Carregando...
        </h1> */}
        <ClipLoader
          // cssOverride={ this.override }
          data-testid="loader"
        />
      </div>
    );
  }
}

export default Loading;
