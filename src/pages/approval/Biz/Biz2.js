import React from 'react';
import ApvMenu from '../AprovalNav';
import ApvSummitBar from '../ApvSmmitbar';
import ApvSummitLine from '../ApvSummitline'; 
import './ApprovalBiz.css';
import '../Approval.css';



function Biz2() {
    return (

		<section>
			<ApvMenu />
			<div>
				<ApvSummitBar />
				<div className="container">
					<div className="apv-apvtitle">회의록</div>
					<ApvSummitLine />
					<div className="apv-content">
						<div className="apv-content-biz2">
							<div className="column1">제목</div>
							<div className="column2"><input className="input1" placeholder="제목 입력"/></div>
						</div>
						<div className="apv-content-biz2">
							<div className="column1">회의일자</div>
							<div className="column2"><input className="input1" placeholder="날짜 입력"/></div>
						</div>
						<div className="apv-content-biz2">
							<div className="column1">회의장소</div>
							<div className="column2"><input className="input1" placeholder="회의장소 입력"/></div>
						</div>
						<div className="apv-content-biz2">
							<div className="column1">참석자</div>
							<div className="column2"><input className="input1" placeholder="참석자 입력"/></div>
						</div>
						<div className="apv-content-biz2-last">
							<div className="column1">회의내용</div>
							<div><textarea placeholder="회의 내용 작성" rows="30"></textarea></div>
						</div>
					</div>
				</div>
			</div>
		</section>

    );
}

export default Biz2;