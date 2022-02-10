import React, { useState, useCallback, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import styles from '../../Shop.module.css';

interface Props {
  readonly attachments: string[];
  readonly onRegister: (itemName: string, description: string) => void;
  readonly onAddAttach: (file: File) => void;
  readonly onRemoveAttach: (index: number) => void;
}

function PdsRegisterForm({
  attachments,
  onRegister,
  onAddAttach,
  onRemoveAttach,
}: Props) {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const quillRef = useRef<ReactQuill>();

  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
        ],
      },
    }),
    [],
  );

  const handleChangeItemName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setItemName(e.target.value);
    },
    [],
  );

  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        onAddAttach(e.target.files[0]);
      }
    },
    [onAddAttach],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onRegister(itemName, description);
    },
    [itemName, description, onRegister],
  );

  const getOriginalName = (fileName: string) => {
    const idx = fileName.indexOf('_') + 1;

    return fileName.substr(idx);
  };

  const removeAttach = (index: number) => {
    onRemoveAttach(index);
  };

  return (
    <div className={styles.centered}>
      <br />
      <h2>공개자료실 등록</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            <strong>자료명</strong>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control-plaintext"
              value={itemName}
              onChange={handleChangeItemName}
              id="staticEmail"
              placeholder="제목을 입력해주세요."
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticWriter" className="col-sm-2 col-form-label">
            <strong>파일</strong>
          </label>
          <div className="col-sm-10">
            <input type="file" onChange={handleChangeFile} />
            <div>
              {attachments.map((attachment, index) => (
                <div key={index}>
                  {getOriginalName(attachment)}
                  <span
                    className="btn btn-light btn-sm"
                    style={{ cursor: 'pointer' }}
                    onClick={() => removeAttach(index)}
                  >
                    X
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label>
            <strong>자료설명</strong>
          </label>
          <ReactQuill
            ref={(element) => {
              if (element !== null) {
                quillRef.current = element;
              }
            }}
            value={description}
            onChange={setDescription}
            modules={modules}
            style={{ minHeight: '500px', marginBottom: '6%' }}
            theme="snow"
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div className={styles.align_center}>
          <button type="submit" className="btn btn-light btn-sm">
            등록
          </button>
          <Link to="/pds" className="btn btn-dark btn-sm">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PdsRegisterForm;
