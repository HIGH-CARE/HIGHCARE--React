import React from 'react';
import ApvMenu from '../AprovalNav';
import ApvSummitBar from '../ApvSmmitbar';
import ApvSummitLine from '../ApvSummitline'; 
import './ApprovalHrm.css';
import '../Approval.css';

function Hrm1() {
    return (
		<section>
			<ApvMenu />
			<div>
				<ApvSummitBar />
				<div className="container">
					<div className="apv-apvtitle">연차신청서</div>
					<ApvSummitLine />
					<div className="apv-content">
						<div className="apv-content-hrm1">
							<div className="column1">휴가 종류</div>
							<div className="column2">연차</div>
						</div>
											
						<div className="apv-content-hrm1">
							<div className="column1">반차 여부</div>
							<div className="column2">
								<label><input type="radio" name="offtype"/>오전 반차</label>
								<label><input type="radio" name="offtype"/>오후 반차</label>
							</div>
						</div>
						<div className="apv-content-hrm1">
							<div className="column1">시작일자</div>
							<div className="column2"><input className="input1" type="date"/></div>
						</div>
						<div className="apv-content-hrm1">
							<div className="column1">종료일자</div>
							<div className="column2"><input className="input1" type="date"/></div>
						</div>
						<div className="apv-content-hrm1">
							<div className="column1">기간</div>
							<div className="column2"></div>
						</div>
						<div className="apv-content-detail">-사유-</div>
						<div className="apv-content-detail-coment"><textarea placeholder="사유 작성" rows="20"></textarea></div>
					</div>
				</div>
			</div>									
		</section>
    );
}

export default Hrm1;
