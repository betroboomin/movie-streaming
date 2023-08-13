import React, { useEffect, useState , useRef} from 'react'
import PropTypes from 'prop-types'
import './Modal.css'
const Modal = props => {

    const [active, setActive] = useState(false);

    useEffect(()=> {
        setActive(props.active)
    },[props.active])
  return (
    <div id={props.id} className={`modal ${active ? 'active': ''}`} >
        {props.children}
    </div>
  )
}
Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}
export const ModalContent = props  => {
 const contentRef = useRef(null);
 const closeModal =()=>{
    contentRef.current.parentNode.classList.remove('active');
    if(props.onClose) props.onClose();
 }
 return(
    <div ref={contentRef} className="modal content">
        {
            props.children
        }
        <div className="modal content close" onClick={closeModal}>
            <i className='bx'></i>
        </div>

    </div>
 )
}
ModalContent.propTypes ={
    onClose: PropTypes.func
}

export default Modal