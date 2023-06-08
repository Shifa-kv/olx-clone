import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import './info.css'
import { infoPopupContext } from '../../store/Context';
import {Link} from 'react-router-dom'

const Info = () => {
    const{setInfo, ...info} = useContext(infoPopupContext);  
    const handleClose = () => setInfo({...info, show:false});
    // const handleShow = () => setInfo({...info, show:true});  
  return (
    <Modal
        show={info.show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`popupInfo ${info.status}`}
    >
        <button className='popupClose' onClick={handleClose}>X</button>
        <Modal.Body className='popupContent'>
          <h3>{info.message}</h3>
          <Link to="/" className='popup-btn'>Go to home</Link>
        </Modal.Body>
    </Modal>
  )
}
export default Info