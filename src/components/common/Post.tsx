import React, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

interface AddressData {
  address: string;
  zonecode: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

const Post = (props: {
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [bbb, setBoolean] = useState<boolean>(true);
  const [sss, setSss] = useState<boolean>(false);
  const [sebAddress, setSebAddress] = useState<string>('');

  const handleCloseClick = () => {
    setBoolean(!bbb);
    props.setClick(false);
  };

  const handleOpenAddress = () => {
    setSss(!sss);
  };

  const handleSebAddresss = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSebAddress(e.target.value);
  };

  const [address, setAddress] = useState<{
    fullAddress: string;
    zoneCode: string;
  }>({
    fullAddress: '',
    zoneCode: '',
  });

  const handleAddress = (data: AddressData) => {
    let AllAddress = data.address;
    let extraAddress = '';
    let zoneCodes = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress({
      fullAddress: AllAddress,
      zoneCode: zoneCodes,
    });
    setSss(false);
  };
  return (
    <>
      {bbb ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <button
            onClick={handleCloseClick}
            style={{
              position: 'fixed',
              top: '10%',
              borderRadius: '5px',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            닫기
          </button>
          <table>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <button onClick={handleOpenAddress}>우편번호 찾기</button>
                </td>
              </tr>
              <tr>
                <td>우편번호</td>
                <td>
                  <input value={address.zoneCode} />
                </td>
              </tr>
              <tr>
                <td>주소</td>
                <td>
                  <input value={address.fullAddress} />
                </td>
              </tr>
              <tr>
                <td>상세주소</td>
                <td>
                  <input value={sebAddress} onChange={handleSebAddresss} />
                </td>
              </tr>
            </tbody>
          </table>
          {sss ? <DaumPostCode onComplete={handleAddress} /> : ''}
        </div>
      ) : (
        ''
      )}
    </>
  );
};
export default Post;
