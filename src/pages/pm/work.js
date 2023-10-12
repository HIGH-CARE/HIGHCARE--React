import React, { useEffect, useState } from 'react';
import './pm-member.css'
import PmNav from './pmNav';
import { useDispatch, useSelector } from 'react-redux';
import { callMgStartAPI } from '../../apis/PmAPICalls';
import { callManagementAPI } from '../../apis/PmAPICalls';
import { callMgEndAPI } from '../../apis/PmAPICalls';
import { useNavigate } from 'react-router-dom';
import { async } from '@dabeng/react-orgchart';


function PmWork() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const authes = useSelector(state => state.authes);
	// const empNo = authes.empNo;
	// const empName = authes.name;
    // const deptName = authes.dept;
    // const jobName = authes.job;
    
    const [test, setTest] = useState({});
	// console.log("empNo : ", empNo);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const result = useSelector(state => state.manage);
    console.log("------------------------}}>",result);

        
    const [pageEnd, setPageEnd] = useState(1);
    const pageInfo = result.pageInfo;

    const pageNumber = [];
    if(pageInfo) {
        for(let i = 1; i<= pageInfo.pageEnd; i++){
            pageNumber.push(i);
        }
    }

    const [type, setType] = useState('');
    const [formData, setFormData] = useState({

        empNo: '',
        empName: '',
        manDate: '',
        deptName: '',
        jobName: '',
        startTime: '',
        endTime: '',
        status: '',
        workTime: '',
        totalWorkTime: '',
    })

    useEffect(() => {
        // Redux action을 dispatch하여 API 호출 및 데이터 업데이트 수행
        dispatch(callManagementAPI({currentPage}));
        // 여기 result.data로 변경한것을 result로 다시변경
        console.log('--------------------------- authes >>',authes);
        // if (result.manage) {
        //     console.log("result >>>>>222: ", result.manage);
           
           
            
        //   }
          let status = type === 'start'? '출근' : '퇴근';
          setFormData(form => ({
            ...form, 
            empNo: authes.empNo,
            empName: authes.empName,
            manDate: '',
            deptName: authes.deptName,
            jobName:  authes.jobName,
            startTime: '',
            endTime: '',
            status: status,
            workTime: '',
            totalWorkTime: '',
          }));
          console.log("form ==============================: ", formData);

        
    }, [currentPage]);
    


    const pmSubmission = async () => {
        setType('start');
        if (authes.empNo !== undefined) {
			try {
				const response = await dispatch(callMgStartAPI({ formData }));
                console.log("-----------------------------------response", response.status);
				if (response.status === 200) {
                    if(response.data === 'stSuceess'){

                        window.alert("출근하였습니다");
                        window.location.reload();
                    } else {
                        window.alert("이미 출근이 완료되었습니다. ");
                        
                    }
                    window.location.reload();
				} else {
					window.alert("다시 시도해 주세요.");
				}
            
			} catch (error) {
				console.error("API error:", error);
				window.alert("API 요청 중 오류가 발생했습니다.");
			}
		} else {
            window.alert("재로그인 요청");
		}
	};

    const endSubmission = async() => {
        setType('end');

        
        if (authes.empNo !== undefined) {
			try {
				const response = await dispatch(callMgEndAPI({ formData }));
                console.log("-----------------------------------response", response);
				if (response.status === 200) {
                    if(response.data === 'success'){

                        window.alert("퇴근하였습니다");
                    
                    } else {
                        window.alert("이미 퇴근 완료 되었습니다. ");
                        
                    }
                    window.location.reload();
				} else {
					window.alert("다시 시도해 주세요.");
				}
                window.location.reload();
			} catch (error) {
				console.error("API error:", error);
				window.alert("API 요청 중 오류가 발생했습니다.");
			}
		} else {
            window.alert("재로그인 요청");
		}
    };

	return (
        <div>
<section>
<PmNav/>
<div className="apv-navibox">
        <div className="pm-de-top">
            <div className="pm-div-font">출퇴근 관리
            </div>
        </div>
z
                    <div className="pm-workbox">
                        <div className="pm-workin-box">
                            <input onClick={pmSubmission} type="button" value="출근" className="pm-work-button2"></input>
                            <input  onClick={endSubmission} type="button" value="퇴근" className="pm-work-button2"></input>
                            {/* <input type="button" value="자리 비움" className="pm-work-button"></input> */}
                            {/* <button className="pm-work-button">퇴근</button>
                            <button className="pm-work-button">자리 비움</button> */}
                        </div>
                        <div className="pm-workin-box2">
                            <h2>출근시간</h2>
                            <h2>{ result.user && result.user.startTime  }</h2>
                        </div>
                        <div className="pm-workin-box-last">
                            <h2>퇴근시간</h2>
                            <h2>{ result.user && result.user.endTime  }</h2>
                        </div>
                    </div>
                <table className="pm-job-table">
                    <tbody>
                    <tr>
                        <th className="columnpm1">번호</th>
                        <th className="columnpm1">사원명</th>
                        <th className="columnpm2">날짜</th>
                        <th className="columnpm0">부서명</th>
                        <th className="columnpm0">직급 </th>
                        <th className="columnpm0">출근시간 </th>
                        <th className="columnpm0">퇴근시간</th>
                        <th className="columnpm0">상태</th>
                        {/* <th className="columnpm0">근무시간</th>
                        <th className="columnpm0">총 근무시간</th> */}
                    </tr>{/* {Array.isArray(result) && result */}
                    { console.log('======1> ' ,result.data)}
                    {result?.manage !== undefined && Array.isArray(result?.manage) && result?.manage
                        .map((res) => (
                            <tr key={res?.manNo}>
                                <td>{res?.manNo}</td>
                                <td>{res?.empName}</td>
                                <td>{res?.manDate}</td>
                                <td>{res?.deptName}</td>
                                <td>{res?.jobName}</td>
                                <td>{res?.startTime}</td>
                                <td>{res?.endTime}</td>
                                <td>{res?.status}</td>
                                {/* <td>{res.workTime}</td>
                                <td>{res.totalWorkTime}</td> */}
                            </tr>
                        ))
                    }
                    { result.manage === undefined && <tr><td colSpan={10}>조회된 결과가 없습니다.</td></tr>}
                    </tbody>
                </table>
                <br></br>
            {/* 페이징 처리를 위한 버튼  */}
            {/* <div style={{ listStyleType: "none", display: "flex", justifyContent: "center"}}>
            { Array.isArray(result.manage) &&
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
            { Array.isArray(result.manage) && pageInfo != null &&
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total == 0}
            >
                &gt;
            </button>
            }
        </div> */}
                </div>
    </section>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
	);
}

export default PmWork;
