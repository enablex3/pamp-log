import { Component } from 'react';
import BrandText from './BrandText.png';
import { FaPoo, FaCheck } from 'react-icons/fa';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { GiWaterDrop, GiBabyBottle } from 'react-icons/gi';
import { AiTwotoneCalendar, AiFillEdit } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import Modal from "react-modal";
import { retrieveLog, createBowelLog, createFeedLog, deleteFeedLog, deleteBowelLog } from './actions/pamp';
import { jsonToArray, constructTime, finalizeTimeArray } from './utils/utils';
import { connect } from 'react-redux';
import './App.css';

Modal.setAppElement("#root")

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bowelClicked: false,
      feedClicked: false,
      deleteClicked: false,
      excrement: "Yes",
      void_p: "Yes",
      ounces: null,
      hours: "1",
      minutes: "0",
      tod: "AM",
      rowid: null,
      type: null
    };

    this.hourOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    this.minuteOptions = finalizeTimeArray(Array.from({length: 60}, (_, n) => n.toString()));

  }

  componentDidMount() {
    this.props.retrieveLog();
  }

  openBowel(bowelClicked) {
    this.setState({ bowelClicked: bowelClicked });
  }

  openFeed(feedClicked) {
    this.setState({ feedClicked: feedClicked });
  }

  bowelCreate(bowelClicked) {
    const { void_p, excrement, hours, minutes, tod } = this.state;
    this.setState({ bowelClicked: bowelClicked });
    this.props.createBowelLog(void_p, excrement, constructTime(hours, minutes, tod));
    this.setState({ void_p: "Yes", excrement: "Yes", hours: "1", minutes: "0", tod: "AM" });
  }

  deleteBowel() {
    const { rowid, deleteClicked } = this.state;
    this.props.deleteBowelLog(rowid);
    this.setState({ deleteClicked: !deleteClicked, rowid: null, type: null });
  }

  feedCreate(feedClicked) {
    const { ounces, hours, minutes, tod } = this.state;
    this.setState({ feedClicked: feedClicked });
    this.props.createFeedLog(ounces, constructTime(hours, minutes, tod));
    this.setState({ ounces: null, hours: "1", minutes: "0", tod: "AM" });
  }

  deleteFeed() {
    const { rowid, deleteClicked } = this.state;
    this.props.deleteFeedLog(rowid);
    this.setState({ deleteClicked: !deleteClicked, rowid: null, type: null });
  }

  openDelete(rowid, deleteClicked, type) {
    this.setState({ deleteClicked: deleteClicked, rowid: rowid, type: type });
    this.renderDelete(rowid);
  }

  renderTimeElements() {
    return (
      <div className="row" style={{ "justifyContent": "center" }}>
        <div className="column" style={{ "float": "right" }}>
          <label>Hours
            <select id="hours-select" name="hours" onChange={(e) => this.setState({ hours: e.target.value })}>
              {this.hourOptions.map((hr, idx) => 
                <option key={idx}>{hr}</option>
              )};
            </select>
          </label>
        </div>
        <div className="column">
          <label>Minutes
            <select id="minutes-select" name="minutes" onChange={(e) => this.setState({ minutes: e.target.value })}>
              {this.minuteOptions.map((mn, idx) => 
                <option key={idx}>{mn}</option>
              )};
            </select>
          </label>
        </div>
        <div className="column">
          <label>AM/PM
          <select id="tod-select" name="tod" onChange={(e) => this.setState({ tod: e.target.value })}>
            <option>AM</option>
            <option>PM</option>
          </select>
          </label>
        </div>
      </div>
    )
  }

  renderBowelModal() {
    const { bowelClicked } = this.state;

    return(
      <div>
        <Modal className="modal"
          isOpen={bowelClicked}
          contentLabel="Record Bowel"
        >
          <div class="form-style-5">
            <form>
              <label>
                Excrement
                <select id="excrement-select" name="excrement" onChange={(e) => this.setState({ excrement: e.target.value})}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <label>
                Void
                <select id="void-select" name="void" onChange={(e) => this.setState({ void_p: e.target.value})}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              { this.renderTimeElements() }
            </form>
            <button id="cancel-button" onClick={() => this.openBowel(!bowelClicked)}>Cancel</button>
            <button onClick={() => this.bowelCreate(!bowelClicked)}>Save</button>
          </div>
        </Modal>
      </div>

    );
  }

  renderFeedModal() {
    const { feedClicked } = this.state;

    return(
      <div>
        <Modal className="modal"
          isOpen={feedClicked}
          contentLabel="Record Bowel"
        >
          <div class="form-style-5">
            <form>
              <label>
                Ounces:
                <input type="number" name="ounces" onChange={(e) => this.setState({ ounces: e.target.value })} />
              </label>
              { this.renderTimeElements() }
            </form>
            <button id="cancel-button" onClick={() => this.openFeed(!feedClicked)}>Cancel</button>
            <button onClick={() => this.feedCreate(!feedClicked)}>Save</button>
          </div>
        </Modal>
      </div>
    );
  }

  renderYesNo(selection) {
    if (selection === "No") {
      return ( <ImCross size="12" color="#CD001A" />);
    } else {
      return ( <FaCheck size="12" color="#8FDBD9" />)
    }
  }

  renderDelete(rowid) {
    const { deleteClicked, type } = this.state;
    return(
      <div>
        <Modal className="modal"
          isOpen={deleteClicked}
          contentLabel="Delete Modal"
        >
          <div class="form-style-5">
            <form>
              <label>Are you sure?</label>
            </form>
            { type === "BOWEL" ? 
              <button id="cancel-button" onClick={() => this.deleteBowel(rowid)}>Delete</button> 
                : 
              null
            }
            { type === "BOWEL" ? 
              <button id="cancel-button" onClick={() => this.deleteFeed(rowid)}>Delete</button>
                : 
              null
            }
            <button onClick={() => this.setState({deleteClicked: !deleteClicked})}>Keep</button>
          </div>
        </Modal>
      </div>
    );
  }

  render() {

    const { pamp } = this.props;
    const { bowelClicked, feedClicked, deleteClicked, rowid, type } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={BrandText} alt="logo" width="200" height="200" style={{"marginTop" : "-400px"}} onClick={() => window.location.reload()}/>
        </header>
          <div className="data-container" style={{ "marginTop" : "-450px"}}>
            <div className="row">
              <div className="column">
                <h2 style={{"marginBottom" : "-20px"}}>Bowels</h2>
              </div>
              <div className="column add-button" style={{"marginTop": "50px", "marginLeft": "5px"}}>
                <BsFillPlusCircleFill size="30" color="#85DBD9" onClick={() => this.openBowel(!bowelClicked)} />
                { bowelClicked ? this.renderBowelModal() : null }
              </div>
            </div>
            <table className='dataTable'>
              <thead>
                <tr>
                  <th><GiWaterDrop size="20" color="azure" /></th>
                  <th><FaPoo size="20" color="azure"/></th>
                  <th><AiTwotoneCalendar size="20" color="azure" /></th>
                  <th><BiTime size="20" color="azure" /></th>
                  <th><AiFillEdit size="20" color="azure" /></th>
                </tr>
              </thead>
              <tbody>
                { pamp.bowel !== undefined ? jsonToArray(pamp.bowel).reverse().map((obj, i) => 
                    <tr key={obj.name}>
                      <td>{this.renderYesNo(obj.value.void)}</td>
                      <td>{this.renderYesNo(obj.value.excrement)}</td>
                      <td>{obj.value.date}</td>
                      <td>{obj.value.time}</td>
                      <td><FiEdit2 size="20" color="black"/><FiTrash2 size="20" color="black" onClick={(e) => this.openDelete(obj.name, !deleteClicked, "BOWEL")}/></td>
                    </tr>
                ) : null }
              </tbody>
            </table>
            { deleteClicked ? this.openDelete() : null }
            <div className="row">
              <div className="column">
                <h2 style={{"marginBottom" : "-20px"}}>Feedings</h2>
              </div>
              <div className="column add-button" style={{"marginTop": "50px", "marginLeft": "5px"}}>
                <BsFillPlusCircleFill size="30" color="#85DBD9" onClick={() => this.openFeed(!feedClicked)} />
                { feedClicked ? this.renderFeedModal() : null }
              </div>
            </div>
            <table className='dataTable'>
              <thead>
                <tr>
                  <th><GiBabyBottle size="20" color="azure"/></th>
                  <th><AiTwotoneCalendar size="20" color="azure" /></th>
                  <th><BiTime size="20" color="azure" /></th>
                  <th><AiFillEdit size="20" color="azure" /></th>
                </tr>
              </thead>
              <tbody>
                { pamp.feed !== undefined ? jsonToArray(pamp.feed).reverse().map((obj, i) => 
                  <tr key={obj.name}>
                    <td>{obj.value.ounces}oz</td>
                    <td>{obj.value.date}</td>
                    <td>{obj.value.time}</td>
                    <td><FiEdit2 size="20" color="black"/><FiTrash2 size="20" color="black" onClick={(e) => this.openDelete(obj.name, !deleteClicked, "FEED")}/></td>
                  </tr>
                ) : null }
              </tbody>
            </table>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    pamp: state.pamp,
  };
};

export default connect(mapStateToProps, { retrieveLog, createBowelLog, createFeedLog, deleteFeedLog, deleteBowelLog })(App);
