import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../actions';
import { Row, Col, Card, Icon, CardTitle } from 'react-materialize';

class ProductShow extends React.Component {

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }

    renderCard() {
        if (!this.props.product) {
            return <div>Loading...</div>
        }
        console.log(this.props);
        const { id, name, description, prodCod, image } = this.props.product;
         //I'm feeding those imgs from a website so I made a little search if it's coming from
            //the backend or from the website and adding the correct link if it's coming from the backend
            var str = image;
            //search for the dir images
            var isImgWithin = str.search("images");
            //if theres any then add dir storage before it
            if (isImgWithin > 0) {
                var img = '/storage/' + image;
            } else {
            //if not just get the website url
                var img = image;
            }
        return (
            <Row>
                <Col
                    m={12}
                    s={12}
                >
                    <Card
                        actions={[
                            <p key={id}>#{prodCod}</p>
                        ]}
                        closeIcon={<Icon>close</Icon>}
                        header={<CardTitle image={img}>{name}</CardTitle>}
                        revealIcon={<Icon>more_vert</Icon>}
                    >
                        {description}.
                    </Card>
                </Col>
            </Row>
        );
    }
    render() {
        return (
            <div className="container">
                {this.renderCard()}
            </div>
        );

    }
}
const mapStateToProps = (state, ownProps) => {
    return { product: state.productsPagination[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchProduct })(ProductShow);
