import React, {useCallback, useMemo, useRef, useState} from "react";
import { Link } from "react-router-dom";
import styles from "../../Shop.module.css";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 

interface Props {
    readonly onRegister: (title:string, content:string) => void;
}

const BoardRegisterForm = ({onRegister}:Props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const quillRef = useRef<ReactQuill>();

    const modules = useMemo(
        () => ({
            toolbar: { // 툴바에 넣을 기능
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                    ],
                ],
            },
        }), []
    );


    const handleChangeTitle = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    },[]);

    // const handleChangeContent = useCallback((e:React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setContent(e.target.value);
    // },[]);

    const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        onRegister(title, content);
    }, [title, content, onRegister]);

    return (
        <div className={styles.centered}>
            <br/>
            <h2>게시판 등록</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label"><strong>TITLE</strong></label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" value={title} onChange={handleChangeTitle} id="staticEmail" placeholder="제목을 입력해주세요." />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label><strong>CONTENT</strong></label>
                    <ReactQuill
                        ref={(element) => {
                            if (element !== null) {
                                quillRef.current = element;
                            }
                        }}
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        style={{minHeight: '500px', marginBottom: '6%'}}
                        theme="snow"
                        placeholder="내용을 입력해주세요."
                    />
                </div>

                <div className={styles.align_center} style={{marginBottom: "50px"}}>
                    <button className="btn btn-dark btn-sm" type="submit">등록</button>
                    <Link className="btn btn-light btn-sm" to="/board">취소</Link>
                </div>
            </form>
        </div>
    );
};

export default BoardRegisterForm;