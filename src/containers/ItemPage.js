import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ItemPage from '../ItemPage';
import {fetchPost, fetchFile} from '../actions';

const mapStateToProps = ({app}, {username, repo}) => {
  const barePost = {username, repo};
  const post = _.find(app.posts, {username, repo}) || barePost;
  const files = _.pick(app.files, _.map(post.files, 'url'));
  return {post, files};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchPost, fetchFile}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
