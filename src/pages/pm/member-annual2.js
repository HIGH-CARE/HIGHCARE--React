import React, { useEffect, useState } from 'react';
import './pm-member.css'
import PmNav from './pmNav';
import { useDispatch, useSelector } from 'react-redux';
import { callPmAnnualAPI } from '../../apis/PmAPICalls';


function PmMemberAnnual() {
    const dispatch = useDispatch();
    const pmresult = useSelector(state => state.pmannual);
    // const total = pmresult.

    const pminfo = useSelector(state => state.authes);
    const empNo = pminfo.empNo;
    const depart = pminfo.dept;
    

    useEffect(() => {
        dispatch(callPmAnnualAPI(empNo));
      },[]);

	return (
<section>
<PmNav/>
<div className="apv-navibox">
        <div className="pm-de-top">
            <div className="pm-div-font">개인 연차 조회</div>
        </div>
                <div className="pm-ma-top">
                <div className='div3'></div>
                    <div className="pm-ma-plus">
                <div className="pm-ma-box2">
                    <div className="pm-ma-font">총연차</div>
                    <div className="pm-ma-number">{pmresult[0]?.totalAnnual && pmresult[0]?.totalAnnual}</div>
                </div>
                <div className="pm-line"></div>
                <div className="pm-ma-box">
                    <div>발생 연차</div>
                    {pmresult[0]?.basicAnnual > 1 && (
                        <div className="pm-ma-number">{pmresult[0]?.basicAnnual}</div>
                    )}
                    {pmresult[0]?.basicAnnual <= 1 && (
                        <div className="pm-ma-number">00</div>
                    )}
                </div>
                <div className="pm-line"></div>
                <div className="pm-ma-box">
                    <div>발생 월차</div>
                    {pmresult[0]?.basicAnnual < 2 && (
                        <div className="pm-ma-number">{pmresult[0]?.basicAnnual}</div>
                    )}
                    {pmresult[0]?.basicAnnual >= 1 && (
                        <div className="pm-ma-number"></div>
                    )}
                </div>
                {/* <div className="pm-line"></div>
                <div className="pm-ma-box">
                    <div>조정 연차</div>
                    <div className="pm-ma-number">00</div>
                </div>
                <div className="pm-line"></div>
                <div className="pm-ma-box">
                    <div>이월 연차</div>
                    <div className="pm-ma-number">00</div>
                </div> */}
                <div className="pm-line"></div>
                <div className="pm-ma-box">
                    <div>사용 연차</div>
                    <div className="pm-ma-number">00</div>
                </div>
                <div className="pm-line"></div>
                <div className="pm-ma-box">
                    <div>잔여 연차</div>
                    <div className="pm-ma-number">00</div>
                </div>
                </div>
                </div>
                    <table className="pm-ma-table">
                        <tbody>
                    <tr>
                        <th className="columnpm1">이름</th>
                        <th className="columnpm2">부서명</th>
                        <th className="columnpm3">휴가 종류</th>
                        <th className="columnpm4">사용 연차</th>
                        <th className="columnpm7">연차 사용 시작일</th>
                        <th className="columnpm5">연차 사용 종료일 </th>
                        <th className="columnpm7">비고</th>
                    </tr>
                    {Array.isArray(pmresult) && pmresult
                        .map((result) => (
                            <tr key={result.empNo}>
                                <td>{result.anEmployee[0].empName}</td>
                                <td>{result.anEmployee[0].dt.name}</td>
                                <td>{result.vacation.type}</td>
                                <td>{result.vacation.amount}</td>
                                <td>{result.vacation.startDate}</td>
                                <td>{result.vacation.endDate}</td>
                                <td>{result.reason}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
    </section>
	);
}

export default PmMemberAnnual;
