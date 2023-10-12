import { Link } from "react-router-dom";
import PmNav from './pmNav';

function PmTest(){
    return(
        <section>
            <PmNav/>
            <div>
            <div className="pmtopline"><h1>인사 관리</h1></div>
            <div className="divpmbox">
            <div className="pmdisplay">
            <div className="pmdisplay">
            <div className="pmmainbox-first">
                <h1 className="pmmainbox-font"><Link to="/pm/search">사원 조회</Link></h1>
            <div className="pm-de"></div>
            </div>
            <div className="pmmainbox">
                <h1 className="pmmainbox-font"><Link to="/pm/pm-resist">사원상세조회</Link></h1>
            <div className="pm-de"></div>
            </div>
            <div className="pmmainbox">
                <h1 className="pmmainbox-font"><Link to="/pm/work">출 퇴근 관리</Link></h1>
            <div className="pm-de"></div>
            </div>
            </div>
            </div>
            <div></div>
            <div className="pmdisplay">
            <div className="pmmainbox-first">
                <h1 className="pmmainbox-font"><Link to="/pm/annual">연차 조회</Link></h1>
            <div className="pm-de"></div>
            </div>
            <div className="pmmainbox">
                <h1 className="pmmainbox-font"><Link to="/pm/member-annual">개인연차조회</Link></h1>
            <div className="pm-de"></div>
            </div>
            <div className="pmmainbox">
                <h1 className="pmmainbox-font"><Link to="/pm/secondTree">조직도</Link></h1>
            <div className="pm-de"></div>
            </div>
            </div>
            </div>
            </div>
        </section>
    )
}

export default PmTest;