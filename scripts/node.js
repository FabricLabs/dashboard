/**
 * Run the Dashboard service.
 */
const Dashboard = require('../services/dashboard');
const Node = require('@fabric/core/types/node');

const settings = require('../settings/local');

async function main (input = {}) {
  const node = new Node({
    service: Dashboard,
    settings: input
  });

  await node.start();

  return {
    id: node.id
  };
}

main(settings).catch((exception) => {
  console.error('[DASHBOARD:NODE]', 'Main Process Exception:', exception);
}).then((output) => {
  console.log('[DASHBOARD:NODE]', 'Main Process Output:', output);
});
