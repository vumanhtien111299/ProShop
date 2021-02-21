import React from 'react'
import PropTypes from 'prop-types'


// const Rating = ({ value, text, color }) => {
//     return (
//         <div className="rating">
//             <span>
//                 <i style={{color}}
//                 className={
//                     value >= 1 ? 'fas fa-star' :
//                         value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
//                 }></i>
//             </span>

//             <span>
//                 <i style={{color}} className={
//                     value >= 2 ? 'fas fa-star' :
//                         value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'
//                 }></i>
//             </span>

//             <span>
//                 <i className={
//                     value >= 3 ? 'fas fa-star' :
//                         value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'
//                 }></i>
//             </span>

//             <span>
//                 <i className={
//                     value >= 4 ? 'fas fa-star' :
//                         value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'
//                 }></i>
//             </span>

//             <span>
//                 <i className={
//                     value >= 5 ? 'fas fa-star' :
//                         value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'
//                 }></i>
//             </span>

//             <span>{text && text}</span>
//         </div>
//     );
// };

const Star = ({ value, starNumber, color }) => {
    return (
        <span >
            <i width='16.75px' style={{ color }} className={
                value >= starNumber ? 'fas fa-star' :
                    value >= starNumber - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
            }></i>
        </span>
    )
};

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <Star value={value} starNumber={1} color={color} />
            <Star value={value} starNumber={2} color={color} />
            <Star value={value} starNumber={3} color={color} />
            <Star value={value} starNumber={4} color={color} />
            <Star value={value} starNumber={5} color={color} />

            <span>{text && text}</span>
        </div>
    );
};

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.protoType = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating
