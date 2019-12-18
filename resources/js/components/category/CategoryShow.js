import React from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../../actions';
class CategoryShow extends React.Component {

    componentDidMount() {
        this.props.fetchCategory(this.props.match.params.id);
    }

    render() {
        if (!this.props.category) {
            return <div>Loading...</div>
        }
        const { id,name } = this.props.category;
        return (
            <div className="container">
                <h1>#{id} - {name}</h1>
            </div>
        );

    }
}
const mapStateToProps = (state, ownProps) => {
    return { category: state.categoriesPagination[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchCategory })(CategoryShow);
