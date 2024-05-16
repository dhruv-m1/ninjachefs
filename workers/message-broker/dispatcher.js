/**
 * 
 */

const kv = await Deno.openKv();

kv.listenQueue((message) => {

    switch (message.task) {
        case 'ai-assist':
            console.log(message.data);
            break;
        default:
            console.log('invalid');
            break;
    }

})

export default {};