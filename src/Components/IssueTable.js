import { React, useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendarAlt } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './IssueTable.css';

import Accordion from 'react-bootstrap/Accordion';
import { setSelectedFilters, setSelectedIssueId } from '../Features/SelectedFieldsSlice';
import {GetIssuesByTimePeriod} from "../Features/IssueSlice";

const IssueTable = ({ issuesList, tableName, noOfIssues, onItemClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProjectId } = useSelector((state) => state.selectedFields);
  const selectedFilters = useSelector((state) => state.selectedFields.selectedFilters);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  // const [fromDate, setFromDate] = useState(() => {
  //   const oneWeekAgo = new Date();
  //   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  //   return oneWeekAgo;
  // });
  
  // const [toDate, setToDate] = useState(() => new Date());
  
  const [isOpen, setIsOpen] = useState(false);
  const { dataByTimePeriod, loading, error} = useSelector((state) => state.issues);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleFromDateChange = (selectedDate) => {
    setFromDate(selectedDate);
  };

  const handleToDateChange = (selectedDate) => {
    setToDate(selectedDate);
  };

  const handleButtonClick = (item) => {
    if (tableName === 'Unassigned') {
      dispatch(
        setSelectedFilters({
          assignTo: 0,
          status: 'Any',
          identfiedemp: -1,
          priority: 'Any',
          severity: 'Any'
        })
      ); 
      onItemClick(item);
    } else{
      dispatch(
        setSelectedFilters({
          status: 'Close',
          assignTo: -1,
          identfiedemp: -1,
          priority: 'Any',
          severity: 'Any'
        })
      );
      onItemClick(item);
    }
  
  };

  const handleNavigateToIssue = (issueId) => {
    dispatch(setSelectedIssueId(issueId));
    navigate(`/projects/${selectedProjectId}/display-issue${issueId}`);
  };
  useEffect(() => {
    if (fromDate && toDate) {
      dispatch(GetIssuesByTimePeriod({selectedProjectId, fromDate, toDate}));
    }
   
  }, [fromDate, toDate]);

  // useEffect(() => {
  //   const lastWeekDate = new Date();
  //   lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  //   setFromDate(lastWeekDate.toISOString().split('T')[0]);
  //   setToDate(new Date().toISOString().split('T')[0]);
  // }, []);

  if(tableName=="TimePeriod"){
    issuesList=dataByTimePeriod;
    noOfIssues=dataByTimePeriod.length;
  }
 
 console.log( "issuesList",dataByTimePeriod);
  return (
    <div className='Main-Container'>
      <Accordion defaultActiveKey='0'>
        {/* <Accordion.Item eventKey='0'> */}
        <Accordion.Header style={{ outline: 'none', border: '1px solid rgb(199, 206, 207)', margin: "0px 10px 0px 10px", backgroundColor: 'rgb(199, 206, 207)', height: '40px', width: '100%', transition: 'background-color 0.3s ease' }} onFocus={(e) => { e.target.style.backgroundColor = 'rgb(199, 206, 207)'; e.target.style.boxShadow = 'none'; }}>
            {/* <div className='table-head'> */}
            {tableName != 'TimePeriod' ? (
                <>
                  <FaCalendarAlt className='icon-height' /> &nbsp;&nbsp;
                  {/* <FaCalendarAlt className='icon-height' onClick={handleOpenModal} /> &nbsp;&nbsp; */}
                </>
              ) : (
                <>
                <div className="date-wrapper">
                  <label htmlFor="fromDate">From Date:</label>
                  <input
                    type="date"
                    id="fromDate"
                    value={fromDate}
                    onChange={(e) => handleFromDateChange(e.target.value)}
                  />
                </div>
          
                <div className="date-wrapper">
                  <label htmlFor="toDate">To Date:</label>
                  <input
                    type="date"
                    id="toDate"
                    value={toDate}
                    onChange={(e) => handleToDateChange(e.target.value)}
                  />
                </div>
              </>
              )}
              {/* <Modal isOpen={isOpen} toggle={handleCloseModal}>
              <ModalBody>
                <div>
                  <label htmlFor="fromDate">From Date:</label>
                  <input
                    type="date"
                    id="fromDate"
                    value={fromDate}
                    onChange={(e) => handleFromDateChange(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="toDate">To Date:</label>
                  <input
                    type="date"
                    id="toDate"
                    value={toDate}
                    onChange={(e) => handleToDateChange(e.target.value)}
                  />
                </div>
                </ModalBody>
              </Modal> */}
              <div className='table-info-wrapper'>
              {tableName !== 'TimePeriod' && (
                <>
                <a onClick={() => handleButtonClick('ViewIssues')}>{tableName}</a>
                      {issuesList.length > 0 ? (
                        <span className='table-info'>
                          1 - {issuesList.length} / {noOfIssues}
                        </span>
                      ) : (
                        <span className='table-info'>0 - {issuesList.length} / {noOfIssues}</span>
                      )}

                      <a className='clickable- View-Button' onClick={() => handleButtonClick('ViewIssues')}>
                        View Issues
                      </a>
                    </>
                  )}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className='table-container'>
              <table className='table'>
                <tbody>
                  {issuesList.length > 0 ? (
                    issuesList.map((issue) => (
                      <tr key={issue.issueId}>
                        <td style={{padding:" 0px 0px 0px  34px"}}>
                          <div style={{ display: 'flex', gap: '40px' }}>
                            <div>
                              <p style={{margin:"0px"}}>{issue.issueId}</p>
                              <div style={{ display: 'flex', gap: '10px',margin:"0px" }}>
                                <div className={`square-icon ${issue.priority}`} >
                                    <span className="hover-icon">{issue.priority}</span>
                                </div>
                                <div className={`rectangle-icon ${issue.seviority}`} >
                                    &nbsp;<span className="hover-icon">{issue.seviority}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <a  className='clickable-' onClick={() => handleNavigateToIssue(issue.issueId)}>
                                {issue.shortDescription}
                              </a>
                              <p style={{margin:"0px", padding:'0px'}} className='info'>
                                {issue.category} -{' '}
                                {new Date(issue.dateidentified).toLocaleString('en-GB', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className='No-Issues'>
                      <p>No {tableName} issues</p>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </Accordion.Body>
        {/* </Accordion.Item> */}
      </Accordion>
    </div>
  );
};

export default IssueTable;
