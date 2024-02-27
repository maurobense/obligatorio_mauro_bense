import { Toast } from 'react-bootstrap';
const MyToast = ({ show, message, type, onClose }) => {
  return (
    <Toast show={show} onClose={onClose} delay={3000} autohide style={{ position: 'absolute', top: 0, right: 0, left: 0, margin: 'auto', backgroundColor: "#f3dfb3" , color:'#161616'}}>
      <Toast.Header closeButton={false} bg={type === 'success' ? 'success' : 'danger'} style={{ backgroundColor: "#f3dfb3" }}>
        <strong className="mr-auto">{type === 'success' ? 'Éxito' : 'Error'}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};
export default MyToast;



