/* global __DEV__ */
import io from 'socket.io-client';

export default io(
  __DEV__ ? 'http://localhost:3000' : 'https://server.doomdoomshot.com'
);
