import React, { useState } from 'react';
import ReactQuill from 'react-quill';

function MyComponent() {
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
    
        const formats = [
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'video',
          ]
      

  const [value, setValue] = useState('');

  return( 
    <>
        <ReactQuill theme="snow" modules={modules}
            formats={formats} value={value} onChange={setValue} />
            {value}
    </>
  );
}

export default MyComponent;