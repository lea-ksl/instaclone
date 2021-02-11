import socketIOClient from 'socket.io-client';
import { update } from './features/posts/postsSlice';

const connect = (url, store) => {
    const io = socketIOClient(url);
    console.log('socker connected');

    io.on('UPDATE', data => {
        console.log('socker received', data);
        store.dispatch(update(data));
    });
}

export default connect;