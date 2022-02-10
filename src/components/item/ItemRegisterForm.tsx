import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Shop.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  readonly onRegister: (
    itemName: string,
    price: number,
    description: string,
    file: File,
    previewFile: File,
  ) => void;
}

const ItemRegisterForm = ({ onRegister }: Props) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File>();
  const [previewFile, setPreviewFile] = useState<File>();
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
  const handleChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(Number.parseInt(e.target.value));
    },
    [],
  );
  // const handleChangeDescription = useCallback((e:React.ChangeEvent<HTMLTextAreaElement>)=> {
  //     setDescription(e.target.value);
  // },[]);
  const handleChangeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    },
    [],
  );
  const handleChangePreviewFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setPreviewFile(e.target.files[0]);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (file && previewFile) {
        onRegister(itemName, price, description, file, previewFile);
      }
    },
    [itemName, price, description, file, previewFile, onRegister],
  );

  return (
    <div className={styles.centered}>
      <br />
      <h2>상품 등록</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="staticItemName" className="col-sm-2 col-form-label">
            <strong>상품명</strong>
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control-plaintext"
              value={itemName}
              onChange={handleChangeItemName}
              id="staticItemName"
              placeholder="상품명을 입력해주세요."
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="staticPrice" className="col-sm-2 col-form-label">
            <strong>상품가격</strong>
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control-plaintext"
              value={price}
              onChange={handleChangePrice}
              id="staticPrice"
              placeholder="가격을 입력해주세요."
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="formFile" className="form-label">
            <strong>상품파일</strong>
          </label>
          <div className="col-sm-10" style={{ display: 'inlineFlex' }}>
            <label>
              <input
                type="file"
                className="form-control-plaintext"
                onChange={handleChangeFile}
                id="formFile"
              />
            </label>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="formPreviewFile" className="form-label">
            <strong>미리보기파일</strong>
          </label>
          <div className="col-sm-10" style={{ display: 'inlineFlex' }}>
            <label>
              <input
                type="file"
                className="form-control-plaintext"
                onChange={handleChangePreviewFile}
                id="formPreviewFile"
              />
            </label>
          </div>
        </div>
        <div className="mb-3 row">
          <label>
            <strong>상품설명</strong>
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
            style={{ minHeight: '300px', marginBottom: '6%' }}
            theme="snow"
            placeholder="내용을 입력해주세요."
          />
        </div>

        <div className={styles.align_center} style={{ marginBottom: '50px' }}>
          <button className="btn btn-dark btn-sm" type="submit">
            등록
          </button>
          <Link className="btn btn-light btn-sm" to="/item">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ItemRegisterForm;
