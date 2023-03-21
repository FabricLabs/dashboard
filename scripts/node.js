/**
 * Run the Dashboard service.
 */

// Fabric Types
const Node = require('@fabric/core/types/node');

// Dashboard
const Dashboard = require('../services/dashboard');
const settings = require('../settings/local');

// Main Process
async function main (input = {}) {
  const node = new Node({
    peering: false,
    service: Dashboard,
    settings: input
  });

  await node.start();

  return {
    id: node.id
  };
}

// Execute
main(settings).catch((exception) => {
  console.error('[DASHBOARD:NODE]', 'Main Process Exception:', exception);
}).then((output) => {
  console.log('[DASHBOARD:NODE]', 'Main Process Output:', output);
});
