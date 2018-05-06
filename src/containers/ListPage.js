import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ListPage from '../ListPage';
import {fetchPosts} from '../actions';

const mapStateToProps = ({app}, ownProps) => {
  const postIds = app[ownProps.name];
  const posts = _.map(postIds, (postId) => app.posts[postId]);
  return {posts};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchPosts}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
