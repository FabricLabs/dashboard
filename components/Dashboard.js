const LIMIT_PER_PAGE = 3;

import React from 'react';
import '../styles/dashboard.css';
// import '../libraries/fomantic/dist/semantic.css';

import {
  Button,
  Card,
  Header,
  Segment
} from 'semantic-ui-react';

// import d3 from 'd3';
import * as Plot from '@observablehq/plot';

// Internal Components
// import Feed from './Feed';
// import Quote from './Quote';
// import Rate from './Rate';

export default class Dashboard extends React.Component {
  state = {
    network: 'playnet'
  }

  constructor (props = {}) {
    super(props);

    this._state = {
      assets: {},
      content: this.state // TODO: inherit get state () from Actor
    };

    this.ref = React.createRef();
    this.chart = React.createRef();

    return this;
  }

  componentDidMount () {
    console.log('[DASHBOARD]', 'Mounted!', this);
  }

  trust (source) {
    source.on('log', this._handleSourceLog.bind(this));
  }

  _handleBridgeChange (change) {
    console.log('[DASHBOARD] Bridge Reported Change:', change);
  }

  _handleBridgeReady (info) {
    console.log('[DASHBOARD] Bridge Reported Ready:', info);
  }

  _handleSourceLog (log) {
    this.emit('log', `Source log: ${log}`);
  }

  render () {
    return (
      <fabric-content-page className="ui page" ref={this.ref}>
        <Segment>
          <Header>
            <h1>@fabric/dashboard</h1>
          </Header>
        </Segment>
        {/* <FabricBridge path="/" onChange={this._handleBridgeChange.bind(this)} host="localhost" port="3000" secure="false" /> */}
        {/* <Sample host="localhost" secure="false" port="3000" /> */}
      </fabric-content-page>
    );
  }
}
