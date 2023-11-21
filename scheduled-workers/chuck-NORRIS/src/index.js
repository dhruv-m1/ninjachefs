/*
	CloudFlare Worker to clean up pending submission logs
 */

import actions from './actions';
import * as Realm from 'realm-web';

export default {
	async scheduled(controller, env, ctx) {

		try {

			console.log("Connnecting to Realm...");

			let realm = new Realm.App({ id: env.REALM_ID});
			let credentials = Realm.Credentials.apiKey(env.REALM_KEY);
			
			let user = await realm.logIn(credentials);

			let client = user.mongoClient('mongodb-atlas');
			const collection = client.db(env.REALM_DB).collection('pendingsubmissions');

			console.log('... Connected to Realm.');
			console.log("[START CALL CHAIN]");
			
			await actions.cleanSuccessLogs(collection, (24 * 60 * 60 * 1000)); // olderThan = 1 day
			await actions.cleanHangingImages(collection, (24 * 60 * 60 * 1000), env); // olderThan = 1 day
			await actions.cleanUnsuccessfulLogs(collection, (30 * 24 * 60 * 60 * 1000)); // olderThan = 1 month

			console.log("[END CALL CHAIN]");


		} catch (e) {
			console.log(e);
			console.log("[CALL CHAIN TERMINATED]");
		}

	}
};
