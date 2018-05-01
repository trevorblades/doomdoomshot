/* global __DEV__ */
import io from 'socket.io-client';

const url = __DEV__
  ? 'http://localhost:3000'
  : 'https://server.doomdoomshot.com';
export default io(url, {
  autoConnect: false,
});
