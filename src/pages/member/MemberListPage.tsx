import React from "react";
import MemberListContainer from "../../containers/member/MemberListContainer";
import MainLayout from "../../layout/MainLayout";

const MemberListPage = () => {
    return (
        <MainLayout>
            <MemberListContainer />
        </MainLayout>
    );
};

export default MemberListPage;