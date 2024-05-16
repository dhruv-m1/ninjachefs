/***
 * Message Broker to handle service worker transactions
 */

import './dispatcher.js';
const kv = await Deno.openKv();

const MessageBroker = {};

MessageBroker.enqueue = async(task, action, data) => {

    await kv.enqueue({task: task, action: action, data: data});
    await kv.set([`${task}-transactions`, data._id], {status: [], action: action}, { expireIn: 300000 });

}

MessageBroker.setTransactionStatus = async(type, id, status) => {
    
    const transaction = await kv.get([`${type}-transactions`, id]);
    transaction.status.push(status);
    await kv.set([`${type}-transactions`, id], transaction);
}

export default MessageBroker;