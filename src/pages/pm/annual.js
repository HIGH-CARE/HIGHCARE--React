import React, { useEffect, useState } from 'react';
import './pm-member.css'
import PmNav from './pmNav';
import { useDispatch, useSelector } from 'react-redux';
import { callAnnualAPI } from '../../apis/PmAPICalls';
import { callSearchNameAPI } from "../../apis/PmAPICalls";
import { GET_PM_SEARCHNAME } from "../../modules/PmMeModule";

function PmAnnual() {

    let [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const dispatch = useDispatch();
    let result = useSelector((state) => state.pmannual);

    const empinfo = useSelector(state => state.authes);
    const name = empinfo.name;
    const dept = empinfo.dept;
    const job = empinfo.job; 

    const [pageEnd, setPageEnd] = useState(1);
    let pageInfo = result?.pageInfo;
    console.log(pageInfo);
    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i<= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    console.log('----------',result);
  
    const [empName, setSearchName] = useState(""); // 검색어를 저장하는 상태 추가

    const updateSearchResults = (data) => {
      return {
        type: "GET_PM_SEARCHNAME",
        payload: data,
      };
    };
  
    const searchResults = useSelector((state) => state.serchName?.data);
    console.log(searchResults);
    const handleSearch = async () => {
      // 검색어가 비어있으면 아무 작업도 수행하지 않습니다.
      if (!empName) {
              
              dispatch({type: GET_PM_SEARCHNAME, payload: () => {}})
              return;
      }
  
      try {
        // 검색 API 호출
        // const response = await dispatch(callSearchNameAPI({ name: empName }));
        const response = await dispatch(callSearchNameAPI(empName));
        console.log("-이건호출결과를위한거---------------------1--", searchResults.data)
        // API 호출 결과를 처리합니다.
        if (response.data && response.data.length > 1) {

          console.log("-이건호출결과를위한거----------------222-------", response.data)
        } else {
          // 검색 결과가 없을 경우에 대한 처리
        }
      } catch (error) {
        // 에러 처리
      }
    };
    // const empinfo = useSelector(state => state.authes);
    // const empNum = empinfo.empNo;
    // const department = empinfo.dept;
    // const empName = empinfo.empName;
  
    // console.log('================================================empnNum>>>>',empNum);
  
    useEffect(() => {
        console.log('--------------------->>>>>>>>>', currentPage);
      dispatch(callAnnualAPI({currentPage}));
    },[currentPage]);
  
	return (
        <div>
<section>
<PmNav/> 
        <div display="flex">
            <br />
            <div>
                <div className="pm-de-top">
                <div className="pm-div-font">전체 사원 연차 내역
                <input
                className="pm-department-search"
                type="text"
                name="name"
                placeholder="사원이름을 입력하세요."
                value={empName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button className="pm-department-button" onClick={handleSearch}>
                검색
              </button>
                    {/* <label className="label-font">이름
                    <input className="pm-an-search" type="text" name="name" placeholder="사원이름을 입력하세요."/></label>
                    <label className="label-font2">부서명
                    <input className="pm-an-search2" type="text" name="name" placeholder="사원이름을 입력하세요."/></label>
                    <button className="pm-department-button">검색</button> */}
                </div>
                <div className="pm-de">
                    <table className="pm-department-table">
                        <tbody>
                    <tr>
                        <th className="columnpm1">이름</th>
                        <th className="columnpm2">입사날짜</th>
                        <th className="columnpm3">직책</th>
                        <th className="columnpm4">부서</th>
                        <th className="columnpm5">휴가종류</th>
                        <th className="columnpm6">사용연차</th>
                        <th className="columnpm7">연차사용일</th>
                        <th className="columnpm7">비고</th>
                    </tr>
                    {/* {Array.isArray(result?.data) && result?.data
                        .map((result) => ( */}
                        {
                        (searchResults?.data && searchResults?.data.length > 0 ? searchResults?.data : result?.data)?.map((result) => (
                            <tr key={result?.empNo}>
                                <td>{result?.anEmployee[0]?.empName}</td>
                                <td>{result?.anEmployee[0]?.startDate}</td>
                                <td>{result?.anEmployee[0]?.job.name}</td>
                                <td>{result?.anEmployee[0]?.dt.name}</td>
                                <td>{result?.vacation?.type}</td>
                                <td>{result?.vacation?.amount}</td>
                                <td>{result?.vacation?.startDate}</td>
                                <td></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            
            <button className="pm-de-add">연차 신청 하기</button>
            
            {/* 페이징 처리를 위한 버튼  */}
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
            { Array.isArray(result) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            }
            {pageNumber && pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(result) && pageInfo != null &&
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div>
            </div>
        </div>
        </div>
            
        
    </section>
    <br></br>
    <br></br>
    </div>
	);
}

export default PmAnnual;
