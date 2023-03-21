'use strict';

const assert = require('assert');
const settings = require('../settings/test')
const Dashboard = require('../services/dashboard');

describe('@fabric/dashboard/services/dashboard', function () {
  describe('Dashboard', function () {
    it('can smoothly create a default dashboard', function () {
      const dashboard = new Dashboard();

      assert.ok(dashboard);
      assert.ok(dashboard.id);
    });

    it('can smoothly create the test dashboard', function () {
      const dashboard = new Dashboard(settings);

      assert.ok(dashboard);
      assert.ok(dashboard.id);
    });
  });
});
