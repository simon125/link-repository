import { toast } from 'react-toastify';

export default (msg, type) => toast[type](msg, {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
