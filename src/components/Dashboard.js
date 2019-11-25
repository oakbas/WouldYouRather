import React, {Component} from 'react'
import { connect } from 'react-redux'


class Dashboard extends Component {
    render() {
        return(
            <div>
                Dahsboard
            </div>
        )
    }
}

//function mapStateToProps({tweets}) {
  //  return {
    //    tweetIds: Object.keys(tweets)
      //  .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)

  //  }
//}

//export default connect(mapStateToProps)(Dashboard)
export default Dashboard