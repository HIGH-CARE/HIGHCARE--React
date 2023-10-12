import React, { useEffect, useState } from 'react';
import './pm-member.css'
import PmNav from './pmNav';
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeAPI } from '../../apis/PmAPICalls';
import { Link } from 'react-router-dom';


function PmMenu() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const dispatch = useDispatch();
    const results = useSelector(state => state.treeview);
    const [selectedStatus, setSelectedStatus] = useState('사원조회');
 
    const [pageEnd, setPageEnd] = useState(1);
    const pageInfo = results.pageInfo;

    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i<= pageInfo.pageEnd; i++){
            pageNumber.push(i);
            console.log('page----->>', pageInfo);
        }
    }


    useEffect(() => {
        console.log('--------------------->>>>>>>>>', currentPage);
      
        dispatch(callEmployeeAPI({currentPage}));
        
    },
    [currentPage]);

    // const history = useHistory();
    // const handleEmployeeClick = (empNo) => {
    //     // 선택된 사원의 정보를 URL 파라미터로 전달하면서 PmMemberResist로 이동
    //     history.push(`/pm-resist/${empNo}`);
    //   }


	return (
        <div>
<section>
<PmNav/>
<div className="apv-navibox">
        <div className="pm-de-top" style={{margin:'auto'}}>
            <div className="pm-div-font">사원 조회
                <input className="pm-department-search" type="text" name="name" placeholder="사원이름을 입력하세요."/>
                <button className="pm-department-button">검색</button>
            </div>
            </div>
            <br />

            <div className='pm-divbox'>
                <table className="pm-boxresult-table">
                    <tbody>
                    <tr>
                        <th className="columnpm1">사원명</th>
                        <th className="columnpm2">직급</th>
                        <th className="columnpm3">휴대폰</th>
                        <th className="columnpm4">부서</th>
                        <th className="columnpm5">내선전화</th>
                        <th className="columnpm6">입사일</th>
                        <th className="columnpm7">이메일</th>
                    </tr>
                    {Array.isArray(results.data) && results.data
                        .map((result) => (
                            // <tr key={result.empNo} onClick={() => handleEmployeeClick(result.empNo)}>
                            <tr key={result.empNo} >
                                <td> <Link to={`/pm/pm-resist/${result.empNo}`}>
                                    {result.empName}
                                    </Link>
                                </td>
                                <td>{result.job.name}</td>
                                <td>{result.phone}</td>
                                <td>{result.dt.name}</td>
                                <td>{result.telephone}</td>
                                <td>{result.startDate}</td>
                                <td>{result.empEmail}</td>
                            </tr>
                        ))
                    }
                    { console.log('================>',results.data)}
                    </tbody>
                </table>
            </div>
            <div style={{width:'auto'}}>
                </div>

            {/* 페이징 처리를 위한 버튼  */}
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(results) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(results) && pageInfo != null &&
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
        </div>
    </section>
        <br></br>
        <br></br>
        </div>
	);
}

export default PmMenu;
