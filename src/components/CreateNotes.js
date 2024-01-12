
import { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaRegWindowClose } from 'react-icons/fa';
import { LuImagePlus } from "react-icons/lu";
import { RiVideoAddLine } from "react-icons/ri";
import { IoColorPaletteOutline } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CirclePicker, SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import React from 'react';


function CreateNotes() {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const {register, handleSubmit, formState: {errors}} = useForm()

  const onFormSubmit = (formObj)=>{
    console.log(formObj);
  }

  const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
  }

  const formats = ['header','font','size','bold','italic','underline','strike','blockquote','list','bullet','indent','link','image','video'];
  const [value, setValue] = useState('');

  var [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  });



  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker })
  };

  const handleClose = () => {
    setState({ ...state, displayColorPicker: false })
  };

  const handleChange = (color) => {
    setState({ ...state, color: color.rgb })
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <>

      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal  show={openModal} size='lg' popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
        <form onSubmit={handleSubmit(onFormSubmit)} className ='mx-auto'>
            <div className='m-5 mb-3'>
                <h3>Title</h3>
                <input type = "text" id = "title" className="form-control" {...register("title", {required: true})}/>
                {errors.title?.type === 'required' && <p>*Title Required</p>}
                <FaRegWindowClose style={{position:"absolute", top:"0.5vw", right:"0.5vw"}} onClick={()=>setOpenModal(false)} size={"5%"}/>
            </div>
            <h3 className='ms-5'>Text Editor</h3>
            <div className='text-editor mt-0 m-5 mb-3'>
                <ReactQuill theme="snow" modules={modules} formats={formats} value={value} onChange={setValue} />
            </div>
            <div className='row m-5 mt-0 mb-3'>
                <div className='col-5 row'>
                    <div className='col-2'>
                      <LuImagePlus size={"2rem"}/>
                    </div>
                    <div className='col-10'>
                      <input type = "text" id = "image" placeholder="Add Image Link" className="form-control" {...register("imagelink", {required: true})} />
                    </div>
                </div>
                <div className='col-5 row'>
                    <div className='col-2'>
                      <RiVideoAddLine size={"2rem"}/>
                    </div>
                    <div className='col-10 '>
                      <input type = "text" id = "video" placeholder="Add video Link" className="form-control" {...register("videolink", {required: true})} />
                    </div>
                </div>
                <div className='col-1'>
                    <IoColorPaletteOutline size={"2rem"}/>
                </div>
                <div className='col-1'>
                    <div style={ styles.swatch } onClick={ handleClick }>
                        <div style={ styles.color } />
                    </div>
                    {state.displayColorPicker
                    ? 
                      <div style={styles.popover }>
                        <div style={ styles.cover } onClick={ handleClose }/>
                        <SketchPicker color={ state.color } onChange={ handleChange }/>
                      </div>
                    : null 
                    }
                </div>
            </div>
            <button className='ms-5 p-1 ps-2 pe-2 bg-white text-dark rounded text-light mt-2' onClick={()=>setOpenModal(false)}>Cancel</button>
            <button type = "Submit" className='ms-3 p-1 ps-2 pe-2 mb-3 bg-dark rounded text-light mt-2'>Create</button>
        </form>
      </Modal>
    </>
  );
}

export default CreateNotes;