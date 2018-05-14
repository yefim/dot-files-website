import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ListPage from '../ListPage';
import {fetchPosts} from '../actions';

const mapStateToProps = ({app}, ownProps) => {
  const ids = app[ownProps.name];
  return {ids};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchPosts}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
