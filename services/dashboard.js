'use strict';

const Service = require('@fabric/core/types/service');
const Site = require('@fabric/http/types/site');

/**
 * Implements a full-capacity (Native + Edge nodes) for a Fabric Dashboard. 
 */
class Dashboard extends Service {
  /**
   * Creates an instance of the {@link Dashboard}, which provides general statistics covering a target Fabric node.
   * @param {Object} [settings] Configuration values for the {@link Dashboard}.
   * @returns {Dashboard} Instance of the {@link Dashboard}.  Call `render(state)` to derive a new DOM element.
   */
  constructor (settings = {}) {
    // Adopt Fabric semantics
    super(settings);

    // Define local settings
    this.settings = Object.assign({
      authority: 'http://localhost:9332/services/fabric', // loopback service
    }, this.settings, settings);

    this.site = new Site(this.settings.site);

    // Set local state
    this._state = {
      content: {},
      status: 'PAUSED'
    };

    // Ensure chainability
    return this;
  }
}

module.exports = Dashboard;
